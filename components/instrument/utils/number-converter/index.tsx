import React, { useEffect, useState } from "react";
import { Card, Form, Input, InputNumber, Select, Switch } from "antd";
import UtilsLayout from "../Layout";
import numeric from "./numeric";

type FormField = {
  sign: boolean;
  value: number;
  seg: boolean;
  round: number;
  decimal: number;
  unit: string;
};

/**
 * number-converter
 * @returns
 */
const NumberConverter = () => {
  const [form] = Form.useForm<FormField>();

  const [format, setFormat] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const onValuesChange = () => {
    const { sign, value, seg, round, decimal, unit } = form.getFieldsValue();
    const formatter =
      (sign ? "+" : "") +
      "".padEnd(round, "0") +
      (seg ? ",0" : "") +
      (decimal ? ".".padEnd(decimal + 1, "0") : "") +
      unit;
    console.log(formatter);
    setFormat(formatter);
    const v = numeric(value).format(formatter);

    setResult(v);
  };

  useEffect(() => {
    onValuesChange();
  }, []);

  return (
    <UtilsLayout
      title="数字转换器"
      description="用于将数字转换为具有特定格式的字符串。这种格式化可以包括数字的前缀、后缀、小数点位数、千位分隔符、百分比表示等多种形式。"
    >
      <Card className="md:mx-20 p-5">
        <Form
          layout="horizontal"
          form={form}
          onValuesChange={onValuesChange}
          initialValues={{
            sign: true,
            value: 99999.123456,
            seg: true,
            round: 1,
            decimal: 1,
            unit: "",
          }}
          labelWrap
        >
          <Form.Item
            name="value"
            label="数字"
            className="w-full !mb-5"
          >
            <Input />
          </Form.Item>
          <Form.Item name="sign" valuePropName="checked" label="正负符号">
            <Switch />
          </Form.Item>
          <Form.Item name="seg" valuePropName="checked" label="千分位分隔符">
            <Switch />
          </Form.Item>
          <Form.Item name="round" label="整数保留位数">
            <InputNumber min={0} max={12} />
          </Form.Item>
          <Form.Item name="decimal" label="小数保留位数">
            <InputNumber min={0} max={12} />
          </Form.Item>
          <Form.Item name="unit" label="单位" className="w-32">
            <Select
              options={[
                {
                  label: "无",
                  value: "",
                },
                {
                  label: "%",
                  value: "%",
                },
                {
                  label: "亿/万",
                  value: "a",
                },
              ]}
            ></Select>
          </Form.Item>
        </Form>
        <div className="border-t text-right text-gray-500">
          <p className="my-4">formatter: {format}</p>
          <p className="my-4">结果: {result}</p>
        </div>
      </Card>
    </UtilsLayout>
  );
};

export default NumberConverter;
