export interface IEmoji {
  unicode: string;
  codePoints: string;
  decimal: string;
  hex: string;
  buffer: string;
}

class Emoji {
  unicode: string = "";

  constructor(value: string) {
    this.unicode = value;
  }

  // &#x31;&#x31;&#x31;
  static hexToUnicode = (hex: string) => {
    const results = Array.from(hex.matchAll(/(&#x)([0-9a-fA-F]{1,6})(;)/g)).map(
      ([, , v]) => Number(`0x${v}`)
    );
    return String.fromCodePoint(...results);
  };
  // &#97;
  static decimalToUnicode = (decimal: string) => {
    const results = Array.from(decimal.matchAll(/(&#)([0-9]{1,7})(;)/g)).map(
      ([, , v]) => Number(v)
    );
    return String.fromCodePoint(...results);
  };

  // \ud83d\ude00
  static codePointsToUnicode = (codePoints: string) => {
    return JSON.parse(`"${codePoints}"`);
  };

  // F0 9F 98 80
  static bufferToUnicode = (buffer: string[]) => {
    const arr = buffer.map((item) => parseInt("0x" + item, 16));
    const textDecoded = new TextDecoder();
    return textDecoded.decode(new Uint8Array(arr));
  };

  formatEmoji = (): IEmoji => {
    let hex = "";
    let decimal = "";
    for (let i = 0; i < this.unicode.length; i = i + 2) {
      decimal += "&#" + this.unicode.codePointAt(i) + ";";
      hex += "&#x" + this.unicode.codePointAt(i)?.toString(16) + ";";
    }

    const codePoints = this.unicode
      .split("")
      .map((r) => JSON.stringify(r))
      .join("")
      .replaceAll(/"/g, "");

    const textEncoded = new TextEncoder();
    const buffer = Array.from(textEncoded.encode(this.unicode))
      .map((item) => item.toString(16))
      .join(" ");

    return {
      unicode: this.unicode,
      codePoints,
      decimal,
      hex,
      buffer,
    };
  };
}

export default Emoji;
