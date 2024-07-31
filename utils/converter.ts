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
