import UtilsLayout from "../Layout";
import FormatTransform from "@/components/FormatTransform";
import { jsonToYaml, yamlToJson } from "@/utils/converter";

const JSONToYAML = () => {
  return (
    <UtilsLayout title="JSON转换YAML" description="将JSON对象转换成YAML格式">
      <FormatTransform
        inputTitle="JSON"
        inputLanguage="json"
        inputPlaceholder="在这里复制或编辑你的JSON..."
        inputOutputPlaceholder="等待输出结果..."
        inputToOutput={jsonToYaml}
        outputTitle="YAML"
        outputLanguage="yaml"
        outputPlaceholder="等待输出结果..."
        outputInputPlaceholder="在这里复制或编辑你的YAML..."
        outputToInput={yamlToJson}
      />
    </UtilsLayout>
  );
};

export default JSONToYAML;
