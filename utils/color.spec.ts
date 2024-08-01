import assert from "node:assert";

import * as Color from "./color";
import _ from "lodash";


describe("颜色转换测试用例", function () {
  describe("参数为hex", function () {
    it("#f00", function () {
      const colorObj = Color.getColorInfo("#f00");
      assert.equal(colorObj.hex, "#ff0000");
      assert.equal(colorObj.rgba, "rgb(255,0,0)");
      assert.equal(colorObj.hsla, "hsl(0,100%,50%)");
    });

    it("#f00c", function () {
      const colorObj = Color.getColorInfo("#f00c");
      assert.equal(colorObj.hex, "#ff0000cc");
      assert.equal(colorObj.rgba, "rgba(255,0,0,0.8)");
      assert.equal(colorObj.hsla, "hsla(0,100%,50%,0.8)");
    });

    it("#c8c832", function () {
      const colorObj = Color.getColorInfo("#c8c832");
      assert.equal(colorObj.hex, "#c8c832");
      assert.equal(colorObj.rgba, "rgb(200,200,50)");
      assert.equal(colorObj.hsla, "hsl(60,60%,49%)");
    });
    it("#ff00007f", function () {
      const colorObj = Color.getColorInfo("#ff00007f");
      assert.equal(colorObj.hex, "#ff00007f");
      assert.equal(colorObj.rgba, "rgba(255,0,0,0.5)");
      assert.equal(colorObj.hsla, "hsla(0,100%,50%,0.5)");
    });
  });
  describe("参数为rgba", function () {
    it("rgba(255,0,0)", function () {
      const colorObj = Color.getColorInfo("rgba(255,0,0)");
      assert.equal(colorObj.hex, "#ff0000");
      assert.equal(colorObj.rgba, "rgb(255,0,0)");
      assert.equal(colorObj.hsla, "hsl(0,100%,50%)");
    });

    it("rgba(255,0,0,0.8)", function () {
      const colorObj = Color.getColorInfo("#f00c");
      assert.equal(colorObj.hex, "#ff0000cc");
      assert.equal(colorObj.rgba, "rgba(255,0,0,0.8)");
      assert.equal(colorObj.hsla, "hsla(0,100%,50%,0.8)");
    });

    it("rgba(200,200,50)", function () {
      const colorObj = Color.getColorInfo("#c8c832");
      assert.equal(colorObj.hex, "#c8c832");
      assert.equal(colorObj.rgba, "rgb(200,200,50)");
      assert.equal(colorObj.hsla, "hsl(60,60%,49%)");
    });
    it("rgba(255,0,0,0.5)", function () {
      const colorObj = Color.getColorInfo("#ff00007f");
      assert.equal(colorObj.hex, "#ff00007f");
      assert.equal(colorObj.rgba, "rgba(255,0,0,0.5)");
      assert.equal(colorObj.hsla, "hsla(0,100%,50%,0.5)");
    });
  });
  describe("参数为hsla", function () {
    it("hsla(0,100%,50%)", function () {
      const colorObj = Color.getColorInfo("rgba(255,0,0)");
      assert.equal(colorObj.hex, "#ff0000");
      assert.equal(colorObj.rgba, "rgb(255,0,0)");
      assert.equal(colorObj.hsla, "hsl(0,100%,50%)");
    });

    it("hsla(0,100%,50%,0.8)", function () {
      const colorObj = Color.getColorInfo("#f00c");
      assert.equal(colorObj.hex, "#ff0000cc");
      assert.equal(colorObj.rgba, "rgba(255,0,0,0.8)");
      assert.equal(colorObj.hsla, "hsla(0,100%,50%,0.8)");
    });

    it("hsla(60,60%,49%)", function () {
      const colorObj = Color.getColorInfo("#c8c832");
      assert.equal(colorObj.hex, "#c8c832");
      assert.equal(colorObj.rgba, "rgb(200,200,50)");
      assert.equal(colorObj.hsla, "hsl(60,60%,49%)");
    });
    it("hsla(0,100%,50%,0.5)", function () {
      const colorObj = Color.getColorInfo("#ff00007f");
      assert.equal(colorObj.hex, "#ff00007f");
      assert.equal(colorObj.rgba, "rgba(255,0,0,0.5)");
      assert.equal(colorObj.hsla, "hsla(0,100%,50%,0.5)");
    });
  });
});
