import { Alert, Card, Divider, Form, Input, InputNumber, message } from "antd";
import React, { useEffect, useState } from "react";
import UtilsLayout from "../Layout";
import { convertToBase } from "@/utils/converter";
import { InputCopy } from "@/components/CopyButton";

const BaseConverter = () => {
  const [form] = Form.useForm<{ text: string; fromBase: number }>();
  const [result, setResult] = useState({
    binary: "",
    octal: "",
    decimal: "",
    hexadecimal: "",
    base64: "",
    custom: "",
  });
  const [customBase, setCustomBase] = useState<number>(60);
  const [error, setError] = useState<string>();

  const onCustomBaseChange = (value: number | null) => {
    if (value) {
      setCustomBase(value);
    }
  };

  const onValuesChange = () => {
    transform();
  };

  const transform = () => {
    setError("");
    const { text, fromBase } = form.getFieldsValue();
    const [
      binary = "",
      octal = "",
      decimal = "",
      hexadecimal = "",
      base64 = "",
      custom = "",
    ] = [2, 8, 10, 16, 64, customBase].map((toBase) => {
      try {
        return convertToBase(text, fromBase, toBase);
      } catch (error: any) {
        setError(error?.message ?? "");
        return "";
      }
    });
    setResult({
      binary,
      octal,
      decimal,
      hexadecimal,
      base64,
      custom,
    });
  };

  useEffect(() => {
    transform();
  }, [customBase]);

  return (
    <UtilsLayout
      title="进制转换器"
      description="在不同的基数（十进制、十六进制、二进制、八进制、base64…）之间转换数字"
    >
      <Card>
        <Alert
          className="mb-6"
          message="注意:浮点数在计算机中的表示基于IEEE 754标准，这种表示方式不可避免地会导致精度问题。"
          showIcon
        />
        <Form
          form={form}
          variant="filled"
          labelCol={{ span: 4 }}
          onValuesChange={onValuesChange}
          initialValues={{ text: "60", fromBase: 10 }}
        >
          <Form.Item name="text" label="数字" required>
            <Input placeholder="在这里输入数字（例如: 60" />
          </Form.Item>
          <Form.Item name="fromBase" label="进制" required>
            <InputNumber
              className="!w-full"
              placeholder="在这里输入base（例如：10）"
              min={2}
              max={64}
            />
          </Form.Item>
        </Form>
        {error && <Alert type="error" message={error} showIcon />}
        <Divider />
        <Form variant="filled" labelCol={{ span: 4 }}>
          <Form.Item label="二进制">
            <Input
              placeholder="等待二进制结果"
              value={result.binary}
              addonAfter={<InputCopy value={result.binary} />}
            />
          </Form.Item>
          <Form.Item label="八进制">
            <Input
              placeholder="等待八进制结果"
              value={result.octal}
              addonAfter={<InputCopy value={result.octal} />}
            />
          </Form.Item>
          <Form.Item label="十进制">
            <Input
              placeholder="等待十进制结果"
              value={result.decimal}
              addonAfter={<InputCopy value={result.decimal} />}
            />
          </Form.Item>
          <Form.Item label="十六进制">
            <Input
              placeholder="等待十六进制结果"
              value={result.hexadecimal}
              addonAfter={<InputCopy value={result.hexadecimal} />}
            />
          </Form.Item>
          <Form.Item label="Base64">
            <Input
              placeholder="等待Base64结果"
              value={result.base64}
              addonAfter={<InputCopy value={result.base64} />}
            />
          </Form.Item>
          <Form.Item
            label={
              <InputNumber
                addonBefore="自定义"
                className="!w-32"
                placeholder="在这里输入base（例如：10）"
                min={2}
                max={64}
                value={customBase}
                onChange={onCustomBaseChange}
              />
            }
          >
            <Input
              placeholder="等待Base64结果"
              value={result.custom}
              addonAfter={<InputCopy value={result.custom} />}
            />
          </Form.Item>
        </Form>
      </Card>
    </UtilsLayout>
  );
};

export default BaseConverter;
