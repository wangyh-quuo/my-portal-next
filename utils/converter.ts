import TOML from "smol-toml";

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
    const json = JSON.stringify(toml);
    return json;
  } catch (error) {
    return "";
  }
};
