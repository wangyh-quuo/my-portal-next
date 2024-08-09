import React, { useEffect, useState } from "react";
import { Card, Form, Input } from "antd";
import CopyButton from "./CopyButton";

interface BaseTransformProps {
  title: string;
  inputValue: string;
  inputTitle: string;
  inputPlaceholder: string;
  inputValidator?: any;
  outputTitle: string;
  outputPlaceholder: string;
  transform: (v: string) => string;
}

const BaseTransform: React.FC<BaseTransformProps> = (props) => {
  const {
    title,
    inputValue,
    inputTitle,
    inputPlaceholder,
    outputTitle,
    outputPlaceholder,
  } = props;
  const [outputValue, setOutputValue] = useState<string>("");
  const [form] = Form.useForm();

  const transform = () => {
    const result = props.transform?.(form.getFieldValue("value")) ?? "";
    setOutputValue(result);
  };

  const onValuesChange = () => {
    transform();
  };

  useEffect(() => {
    transform();
  }, []);
  return (
    <Card title={title}>
      <Form
        form={form}
        initialValues={{ value: inputValue }}
        variant="filled"
        labelCol={{ span: 4 }}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          name="value"
          label={inputTitle}
          rules={[{ validator: props.inputValidator }]}
        >
          <Input.TextArea placeholder={inputPlaceholder} />
        </Form.Item>
        <Form.Item label={outputTitle}>
          <Input.TextArea value={outputValue} placeholder={outputPlaceholder} />
        </Form.Item>
        <Form.Item className="text-center">
          <CopyButton value={outputValue} />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BaseTransform;
