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
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(v), function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
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