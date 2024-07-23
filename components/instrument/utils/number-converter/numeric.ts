interface IFormatterConfig {
  /** 正负 */
  sign: undefined | string;
  /** 整数位数 */
  seg: undefined | string;
  /** 整数位数 */
  round: undefined | number;
  /** 小数位数 */
  decimal: undefined | number;
  /** 单位 */
  unit: undefined | string;
}

const hundredMillion = 100000000;
const tenThousand = 10000;

class NumberConverter {
  private v: number;

  constructor(v: number) {
    this.v = v;
  }

  value(): number {
    return this.v;
  }

  format(formatter: string): string {
    const fn = this.createFormatter(formatter);
    return fn(this.v);
  }

  private createFormatter(formatter: string): Function {
    const config: IFormatterConfig = {
      sign: undefined,
      seg: undefined,
      round: undefined,
      decimal: undefined,
      unit: undefined,
    };
    // +0000,0.0000 %
    const [, $1, $2, $3, , , $6, $7] =
      formatter.match(/(\+?)(0+)?(,?)(0?)(\.?)(0+)?([%|a|]?)/) ?? [];
    config.sign = $1;
    config.seg = $3;
    config.round = $2?.length;
    config.decimal = $6?.length;
    config.unit = $7;

    return (v: number) => this.formatNumber(config, v);
  }

  private formatNumber(config: IFormatterConfig, v: number) {
    let str = "";

    if (config.sign && v > 0) {
      str += "+";
    } else if (v < 0) {
      str += "-";
    }

    const { unit, value: val } = this.computeUnit(config.unit ?? "", v);
    let abs = Math.abs(val);

    // 计算小数
    let vDecimal = 0;
    let decimalStr = "";
    if (/^(\d+\.)(\d+)/.test(String(abs))) {
      vDecimal = Number(String(abs).replace(/^(\d+)(\.)(\d+)/, "0$2$3"));
    }

    const hasDecimalConfig = config.decimal != undefined;

    // 保留的小数位
    if (hasDecimalConfig && vDecimal > 0) {
      const d = vDecimal.toFixed(Number(config.decimal));
      if (Number(d) >= 1) {
        abs += 1;
      }
      if ((config.decimal as number) > 0) {
        decimalStr += d.replace(/^(\d)(\.)(\d+)/, "$2$3");
      }
    } else if (hasDecimalConfig && vDecimal == 0) {
      decimalStr += "." + "".padEnd(config.decimal as number, "0");
    } else if (!hasDecimalConfig && vDecimal > 0) {
      decimalStr += String(vDecimal).replace(/^(0)(\.)(\d+)/, "$2$3");
    }

    // 计算整数
    const vRound = Math.floor(abs);
    let r = String(vRound);

    // 整数位不足个数补齐0
    if (config.round && config.round > r.length) {
      r = r.padStart(config.round, "0");
    }

    let round = "";
    while (r.length > 3) {
      r = r.replace(/(\d{3})$/, (val) => {
        round = round !== "" ? val + config.seg + round : val;
        return "";
      });
    }
    round = round !== "" ? r + config.seg + round : r;

    str += `${round}${decimalStr}${unit}`;

    return str;
  }

  private computeUnit(
    unit: string,
    v: number
  ): { value: number; unit: string } {
    // TODO: 后面用户自定义打插件的方式设置
    if (unit === "%") {
      return {
        value: v * 100,
        unit: "%",
      };
    }
    if (unit === "a") {
      if (Math.abs(v / hundredMillion) >= 1) {
        return {
          value: v / hundredMillion,
          unit: "亿",
        };
      }
      if (Math.abs(v / tenThousand) >= 1) {
        return {
          value: v / tenThousand,
          unit: "万",
        };
      }
      return {
        value: v,
        unit: "",
      };
    }
    return {
      value: v,
      unit,
    };
  }
}

const numeric = (v: number) => new NumberConverter(v);

export default numeric;
