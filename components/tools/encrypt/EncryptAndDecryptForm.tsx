import React, { useState } from "react";

import { Button, Form, Input } from "antd";
import CopyButton from "@/components/CopyButton";

interface EncryptAndDecryptFormProps {
  outputLabel: React.ReactNode;
  keyPlaceholder?: string;
  keyLabel: React.ReactNode;
  inputPlaceholder?: string;
  inputLabel: React.ReactNode;
  outputPlaceholder?: string;
  transform: (v: string, key: string) => Promise<string>;
}

const EncryptAndDecryptForm: React.FC<EncryptAndDecryptFormProps> = (props) => {
  const [form] = Form.useForm();
  const [output, setOutput] = useState<string>();
  const onValuesChange = async () => {
    transform();
  };
  const transform = async () => {
    const { input, key } = form.getFieldsValue();
    const result = await props.transform(input, key);
    setOutput(result);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      variant="filled"
      className="sm:grid grid-cols-2 gap-x-6"
      onValuesChange={onValuesChange}
    >
      <Form.Item name="input" label={props.inputLabel}>
        <Input.TextArea
          placeholder={props.inputPlaceholder}
          style={{ minHeight: 240 }}
        />
      </Form.Item>
      <Form.Item name="key" label={props.keyLabel}>
        <Input.TextArea
          placeholder={props.keyPlaceholder}
          style={{ minHeight: 240 }}
        />
      </Form.Item>
      <Form.Item className="col-span-2 text-center">
        <Button.Group>
          <Button onClick={transform}>重新执行</Button>
          <CopyButton value={output}/>
        </Button.Group>
      </Form.Item>
      <Form.Item label={props.outputLabel} className="col-span-2">
        <Input.TextArea
          placeholder={props.outputPlaceholder}
          value={output}
          style={{ minHeight: 120 }}
        />
      </Form.Item>
    </Form>
  );
};

export default EncryptAndDecryptForm;
