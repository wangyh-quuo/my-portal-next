import assert from "node:assert";
import { convertToBase } from "./converter";

describe("进制转换 convertToBase 函数测试", () => {
  describe("进制转换2-64范围内", () => {
    it("不同进制下转换，输入符合from base的数字，结果应该正确转换", () => {
      // 0
      assert.equal(convertToBase("0", 2, 10), "0");
      assert.equal(convertToBase("0", 6, 4), "0");
      assert.equal(convertToBase("0", 8, 2), "0");
      // 整数
      assert.equal(convertToBase("88", 10, 16), "58");
      assert.equal(convertToBase("102312", 4, 32), "15m");
      assert.equal(convertToBase("1ad87", 32, 10), "1389831");

      assert.equal(convertToBase("-fa", 16, 8), "-372");
      assert.equal(convertToBase("-1010001010", 2, 32), "-ka");
      assert.equal(convertToBase("-5201314", 10, 2), "-10011110101110110100010");
      // 小数
      assert.equal(convertToBase('1.2345', 10, 2), '1.0011110000001000001100010010011011101001011110001101011')
      assert.equal(convertToBase('98.4bf7dfa00e28', 16, 8), '230.227737375000705')
      assert.equal(convertToBase('11.010110101011', 2, 8), '3.2653')

      assert.equal(convertToBase('-1010.11101110111', 2, 16), '-a.eee')
      assert.equal(convertToBase('-1234567.7654321', 8, 10), '-342391.979591846466064453125')
      assert.equal(convertToBase('-op.f', 32, 8), '-1431.36')

      // 超过精度
      assert.equal(convertToBase('0.99999999999999999', 10, 2), 1)

    });
    it("不同进制下转换，输入不符合from base的数字，结果应该抛出异常", () => {
      try {
        convertToBase("2", 2, 10)
      } catch (error: any) {
        assert.equal(error.message.includes('请检查输入的数字或者进制'), true);
      }
    });
  });
});
