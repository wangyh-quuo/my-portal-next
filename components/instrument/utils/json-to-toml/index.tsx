import UtilsLayout from "../Layout";
import FormatTransform from "@/components/FormatTransform";
import { jsonToToml, tomlToJson } from "@/utils/converter";

const JSONToTOML = () => {
  return (
    <UtilsLayout title="JSON转换TOML" description="将JSON对象转换成TOML格式">
      <FormatTransform
        inputTitle="JSON"
        inputLanguage="json"
        inputPlaceholder="开始在这里复制或书写一个JSON字符串..."
        inputOutputPlaceholder="等待输出结果"
        inputToOutput={jsonToToml}
        outputTitle="TOML"
        outputLanguage="toml"
        outputPlaceholder="等待输出结果"
        outputInputPlaceholder="开始在这里复制或书写一个TOML字符串..."
        outputToInput={tomlToJson}
      />
    </UtilsLayout>
  );
};

export default JSONToTOML;
