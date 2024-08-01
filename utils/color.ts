export interface IColorObj {
  r: number;
  g: number;
  b: number;
  a?: number;
}

/**
 * 255颜色值转16进制颜色值
 * @param n 255颜色值
 * @returns hex 16进制颜色值
 */
export const toHex = (n: number) => `${n > 15 ? "" : 0}${n.toString(16)}`;

/**
 * 颜色对象转化为16进制颜色字符串
 * @param colorObj 颜色对象
 */
export const toHexString = (colorObj: IColorObj) => {
  const { r, g, b, a = 1 } = colorObj;
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${
    a >= 1 ? "" : toHex(Math.floor(a * 255))
  }`;
};

/**
 * 颜色对象转化为rgb颜色字符串
 * @param colorObj 颜色对象
 */
export const toRgbString = (colorObj: IColorObj) => {
  const { r, g, b } = colorObj;
  return `rgb(${r},${g},${b})`;
};

/**
 * 颜色对象转化为rgba颜色字符串
 * @param colorObj 颜色对象
 */
export const toRgbaString = (colorObj: IColorObj, n = 100) => {
  const { r, g, b, a = 1 } = colorObj;
  if (a >= 1) {
    return `rgb(${r},${g},${b})`;
  }
  return `rgba(${r},${g},${b},${a >= 1 ? 1 : Math.round(a * n) / n})`;
};

/**
 * 颜色对象转化为hsl颜色字符串
 * @param colorObj 颜色对象
 */
export const toHslaString = (colorObj: IColorObj, n = 100) => {
  let { r, g, b, a = 1 } = colorObj;
  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = (max + min) / 2;
  let s = (max + min) / 2;
  let l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  [h, s, l] = [h * 360, s * 100, l * 100].map(Math.round);
  if (a !== 1) {
    return `hsla(${h},${s}%,${l}%,${a >= 1 ? 1 : Math.round(a * n) / n})`;
  }
  return `hsl(${h},${s}%,${l}%)`;
};

/**
 * 16进制颜色字符串解析为颜色对象
 * @param color 颜色字符串
 * @returns IColorObj
 */
export const parseHexColor = (color: string) => {
  let hex = color.slice(1);
  let a = 1;
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  if (hex.length === 4) {
    a = parseInt(`${hex[3]}${hex[3]}`, 16) / 255;
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  if (hex.length === 8) {
    a = parseInt(hex.slice(6), 16) / 255;
    hex = hex.slice(0, 6);
  }
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
    a,
  } as IColorObj;
};

/**
 * rgba颜色字符串解析为颜色对象
 * @param color 颜色字符串
 * @returns IColorObj
 */
export const parseRgbaColor = (color: string) => {
  const arr = color.match(/(\d(\.\d+)?)+/g) || [];
  const res = arr.map((s: string) => parseInt(s, 10));
  return {
    r: res[0],
    g: res[1],
    b: res[2],
    a: parseFloat(arr[3] ?? 1),
  } as IColorObj;
};

/**
 * hsla颜色字符串解析为颜色对象
 * @param color 颜色字符串
 * @returns IColorObj
 */
export const parseHslaColor = (color: string) => {
  const arr = color.match(/(\d(\.\d+)?)+/g) || [];
  const res = arr.map((s: string) => parseInt(s, 10));
  let [h, s, l] = res;

  let r = 0;
  let g = 0;
  let b = 0;

  (h /= 360), (s /= 100), (l /= 100);

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;

  h = Math.round(h);

  if (h < 60) {
    (r = c), (g = x), (b = 0);
  } else if (h < 120) {
    (r = x), (g = c), (b = 0);
  } else if (h < 180) {
    (r = 0), (g = c), (b = x);
  } else if (h < 240) {
    (r = 0), (g = x), (b = c);
  } else if (h < 300) {
    (r = x), (g = 0), (b = c);
  } else if (h < 360) {
    (r = c), (g = 0), (b = x);
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return {
    r,
    g,
    b,
    a: parseFloat(arr[3] ?? 1),
  };
};

/**
 * 颜色字符串解析为颜色对象
 * @param color 颜色字符串
 * @returns IColorObj
 */
export const parseColorString = (color: string) => {
  if (color.startsWith("#")) {
    return parseHexColor(color);
  }
  if (color.startsWith("rgb")) {
    return parseRgbaColor(color);
  }
  if (color.startsWith("hsl")) {
    return parseHslaColor(color);
  }
  if (color === "transparent") {
    return parseHexColor("#00000000");
  }
  throw new Error(`color string error: ${color}`);
};

/**
 * 颜色字符串解析为各种颜色表达方式
 * @param color 颜色字符串
 * @returns IColorObj
 */
export const getColorInfo = (color: string) => {
  try {
    const colorObj = parseColorString(color);
    const hex = toHexString(colorObj);
    const rgba = toRgbaString(colorObj);
    const rgb = toRgbString(colorObj);
    const hsla = toHslaString(colorObj);
    return {
      hex,
      rgba,
      rgb,
      hsla,
      rgbaObj: colorObj,
    };
  } catch (error) {
    return {
      hex: "",
      rgba: "",
      rgb: "",
      hsla: "",
      rgbaObj: null,
    };
  }
};

/**
 * 16进制颜色字符串转化为rgba颜色字符串
 * @param hex 16进制颜色字符串
 * @returns rgba颜色字符串
 */
export const hexToRgba = (hex: string) => {
  const colorObj = parseColorString(hex);
  return toRgbaString(colorObj);
};

/**
 * rgba颜色字符串转化为16进制颜色字符串
 * @param rgba rgba颜色字符串
 * @returns 16进制颜色字符串
 */
export const rgbaToHex = (rgba: string) => {
  const colorObj = parseColorString(rgba);
  return toHexString(colorObj);
};
