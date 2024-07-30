import React, { useState } from "react";
import { Card } from "antd";
import Editor from "./editor";
import CopyButton from "./CopyButton";
import { SwapOutlined } from "@ant-design/icons";

interface FormatTransformProps {
  inputValue?: string;
  inputTitle: string;
  inputLanguage: string;
  inputPlaceholder: string;
  inputOutputPlaceholder: string;
  inputToOutput: (v: string) => string;

  outputTitle: string;
  outputLanguage: string;
  outputPlaceholder: string;
  outputInputPlaceholder: string;
  outputToInput: (v: string) => string;
}

const FormatTransform: React.FC<FormatTransformProps> = (props) => {
  const {
    inputValue = "",
    inputTitle,
    inputLanguage,
    inputPlaceholder,
    inputOutputPlaceholder,
    inputToOutput,
    outputTitle,
    outputLanguage,
    outputPlaceholder,
    outputInputPlaceholder,
    outputToInput,
  } = props;

  const [input, setInput] = useState({
    value: inputValue,
    title: inputTitle,
    language: inputLanguage,
    inputPlaceholder: inputPlaceholder,
    outputPlaceholder: inputOutputPlaceholder,
    transform: inputToOutput,
  });

  const [output, setOutput] = useState({
    value: "",
    title: outputTitle,
    language: outputLanguage,
    inputPlaceholder: outputInputPlaceholder,
    outputPlaceholder: outputPlaceholder,
    transform: outputToInput,
  });

  const transform = (v: string) => {
    const result = input.transform(v);
    setOutput((outputValue) => ({ ...outputValue, value: result }));
  };

  const onExchange = () => {
    setInput(output);
    setOutput({ ...input, value: output.transform(output.value) });
  };

  return (
    <div className="grid sm:grid-cols-12 gap-3 grid-cols-1">
      <Card className="col-span-5" title={input.title}>
        <Editor
          value={input.value}
          language={input.language}
          onValueChange={transform}
          placeholder={input.inputPlaceholder}
        />
      </Card>
      <div className="text-center text-black dark:text-white">
        <SwapOutlined
          onClick={onExchange}
          title="交换"
          className="p-1 sm:mt-4 text-xl cursor-pointer hover:text-gray-500"
        />
      </div>
      <Card
        className="col-span-5"
        title={output.title}
        extra={<CopyButton value={output.value} />}
      >
        <Editor
          language={output.language}
          value={output.value}
          placeholder={output.outputPlaceholder}
          options={{ readOnly: true }}
        />
      </Card>
    </div>
  );
};

export default FormatTransform;
