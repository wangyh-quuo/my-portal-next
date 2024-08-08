import TOML from "smol-toml";
import YAML from "yaml";

export const jsonToToml = (v: string) => {
  if (!v) {
    return "";
  }
  try {
    const json = JSON.parse(v);
    const toml = TOML.stringify(json);
    return toml;
  } catch (error) {
    return "";
  }
};

export const tomlToJson = (v: string) => {
  if (!v) {
    return "";
  }
  try {
    const toml = TOML.parse(v);
    const json = JSON.stringify(toml, null, 2);
    return json;
  } catch (error) {
    return "";
  }
};

export const jsonToYaml = (v: string) => {
  if (!v) {
    return "";
  }
  try {
    const json = JSON.parse(v);
    const yaml = YAML.stringify(json);
    return yaml;
  } catch (error) {
    return "";
  }
};

export const yamlToJson = (v: string) => {
  if (!v) {
    return "";
  }
  try {
    const yaml = YAML.parse(v);
    const json = JSON.stringify(yaml, null, 2);
    return json;
  } catch (error) {
    return "";
  }
};

export const stringToBase64 = (v: string) => {
  return btoa(
    encodeURIComponent(v).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(Number("0x" + p1));
    })
  );
};

export const base64ToString = (v: string) => {
  const str = Array.prototype.map
    .call(atob(v), function (c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    })
    .join("");
  try {
    return decodeURIComponent(str);
  } catch (error) {
    return unescape(str);
  }
};

export const bufferToHex = (buf: ArrayBuffer) => {
  return Array.prototype.map
    .call(new Uint8Array(buf), (item) => {
      return item.toString(16).padStart(2, "0");
    })
    .join("");
};

export const hexToBuffer = (hex: string) => {
  const matches = hex.match(/([0-9a-fA-F]{2})/g);
  const buf = Array.from(matches ?? []).map((item) => Number("0x" + item));
  return new Uint8Array(buf);
};

export function ab2str(buf: ArrayBuffer) {
  return String.fromCharCode.apply(null, Array.from(new Uint8Array(buf)));
}
export function str2ab(str: string) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export function convertToBase(value: string, fromBase: number, toBase: number) {
  // 定义
  const digits =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split(
      ""
    );
  const fromDigits = digits.slice(0, fromBase);
  const toDigits = digits.slice(0, toBase);
  // 匹配数字
  const validStr = fromDigits
    .map((item) => (item === "+" || item === "/" ? `\\${item}` : item))
    .join("");
  const reg = new RegExp(`^(\\-)?([${validStr}]+)?(\\.)?([${validStr}]+)?$`);
  const [_, $1, $2, $3, $4] = value.match(reg) ?? [];
  // 校验通过的数字
  if (
    $2 !== void 0 &&
    (($3 !== void 0 && $4 !== void 0) || ($3 === void 0 && $4 === void 0))
  ) {
    // 整数部分 $2
    let d = $2
      .split("")
      .reverse()
      .reduce((prev, cur, index) => {
        return (
          prev +
          BigInt(fromDigits.indexOf(cur)) * BigInt(fromBase) ** BigInt(index)
        );
      }, 0n);

    // 小数部分 $4
    let decimalValue = "";
    if ($3 !== void 0 && $4 !== void 0) {
      let decimal = $4.split("").reduce((prev, cur, index) => {
        return prev + fromDigits.indexOf(cur) * Math.pow(fromBase, -index - 1);
      }, 0);

      // 0.9999999999999999999 精度超过需要进1
      if (Number.isInteger(decimal)) {
        d = d + BigInt(decimal);
      } else {
        while (decimal > 0) {
          decimalValue += toDigits[Math.floor(decimal * toBase)];
          decimal = decimal * toBase - Math.floor(decimal * toBase);
        }
      }
    }

    // 整数部分 $2
    let dValue = "";
    while (d > 0) {
      dValue = toDigits[Number(BigInt(d) % BigInt(toBase))] + dValue;
      d = (BigInt(d) - (BigInt(d) % BigInt(toBase))) / BigInt(toBase);
    }

    if (decimalValue) {
      return `${$1 ?? ""}${dValue || 0}.${decimalValue || 0}`;
    }

    return `${$1 ?? ""}${dValue || 0}`;
  }

  if (value.length) {
    throw new Error(
      `无效的base ${fromBase}数字 "${value}" , 请检查输入的数字或者进制`
    );
  }
  return "";
}
