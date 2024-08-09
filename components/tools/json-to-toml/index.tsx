import UtilsLayout from "../Layout";
import FormatTransform from "@/components/FormatTransform";
import { jsonToToml, tomlToJson } from "@/utils/converter";

const JSONToTOML = () => {
  return (
    <UtilsLayout title="JSON转换TOML" description="将JSON对象转换成TOML格式">
      <FormatTransform
        inputTitle="JSON"
        inputLanguage="json"
        inputPlaceholder="在这里复制或编辑你的JSON..."
        inputOutputPlaceholder="等待输出结果..."
        inputToOutput={jsonToToml}
        outputTitle="TOML"
        outputLanguage="toml"
        outputPlaceholder="等待输出结果..."
        outputInputPlaceholder="在这里复制或编辑你的TOML..."
        outputToInput={tomlToJson}
      />
    </UtilsLayout>
  );
};

export default JSONToTOML;
