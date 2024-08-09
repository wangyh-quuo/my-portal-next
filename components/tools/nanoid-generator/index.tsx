import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  type RadioChangeEvent,
} from "antd";
import { nanoid, customAlphabet } from "nanoid";
import { nanoid as nanoidNonSecure } from "nanoid/non-secure";
import * as NanoidDictionary from "nanoid-dictionary";
import UtilsLayout from "../Layout";
import CopyButton from "@/components/CopyButton";

const apiMap = {
  blocking: {
    label: "正常(阻塞)",
    value: "blocking",
    generator: () => nanoid,
  },
  "non-secure": {
    label: "不安全",
    value: "non-secure",
    generator: () => nanoidNonSecure,
  },
  customAlphabet: {
    label: "自定义字母表",
    value: "customAlphabet",
    generator: (alphabet: string, defaultSize: number) => {
      // customRandom这个函数没做size 和 alphabet传入检测，空的会死循环
      const nanoid = customAlphabet(alphabet, defaultSize);
      return (size?: number) => {
        if (!alphabet.length || !size || size <= 0) {
          return "";
        }
        return nanoid(size);
      };
    },
  },
};

type ApiKey = keyof typeof apiMap;

const apiList = Object.entries(apiMap).map(([_, value]) => ({
  label: value.label,
  value: value.value,
}));

const NanoidGenerator = () => {
  const [form] = Form.useForm<{
    apiKey: ApiKey;
    count: number;
    alphabet?: string;
    defaultSize?: string;
    size: number;
  }>();

  const [apiKey, setApiKey] = useState<ApiKey>("blocking");

  const onApiKeyChange = (e: RadioChangeEvent) => {
    setApiKey(e.target.value);
  };

  const [results, setResults] = useState<string[]>([]);

  const generateNanoid = () => {
    const { apiKey, count, size } = form.getFieldsValue();
    const alphabet = form.getFieldValue("alphabet");
    const defaultSize = form.getFieldValue("defaultSize");
    const res: string[] = [];
    try {
      const generator = apiMap[apiKey].generator(alphabet, defaultSize);
      for (let i = 0; i < count; i++) {
        res.push(generator(size!));
      }
    } catch (error) {
      console.log("生成nanoid失败");
    } finally {
      setResults(res);
    }
  };

  const onValuesChange = () => {
    generateNanoid();
  };

  const onRetry = () => {
    generateNanoid();
  };

  useEffect(() => {
    generateNanoid();
  }, []);

  return (
    <UtilsLayout
      title="Nano ID生成器"
      description="小巧、安全、URL友好、唯一的 字符串ID生成器。"
    >
      <Card title="">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          variant="filled"
          onValuesChange={onValuesChange}
          initialValues={{
            apiKey: "blocking",
            count: 1,
            size: 32,
            alphabet: NanoidDictionary.alphanumeric,
            defaultSize: 21,
          }}
        >
          <Form.Item name="apiKey" label="API">
            <Radio.Group
              buttonStyle="solid"
              value={apiKey}
              onChange={onApiKeyChange}
              optionType="button"
              options={apiList}
            ></Radio.Group>
          </Form.Item>
          <Form.Item name="count" label="数量">
            <InputNumber min={1} max={20} placeholder="数量" />
          </Form.Item>

          {apiKey === "customAlphabet" ? (
            <>
              <Form.Item label="字母表">
                <Form.Item name="alphabet">
                  <Select
                    options={Object.entries(NanoidDictionary).map(
                      ([key, value]) => ({
                        value: value,
                        label: key,
                      })
                    )}
                    placeholder="选择字母表"
                  ></Select>
                </Form.Item>
                <Form.Item name="alphabet" className="mb-0">
                  <Input placeholder="自定义字母表" maxLength={256} />
                </Form.Item>
              </Form.Item>
              <Form.Item name="defaultSize" label="默认大小">
                <InputNumber min={1} max={36} placeholder="默认大小" />
              </Form.Item>
            </>
          ) : null}

          <Form.Item name="size" label="大小">
            <InputNumber min={1} max={36} placeholder="大小" />
          </Form.Item>

          <Form.Item className="text-center">
            <Button.Group>
              <CopyButton value={results.join("\n")} />
              <Button onClick={onRetry}>重新生成</Button>
            </Button.Group>
          </Form.Item>
          <Form.Item label="uuid">
            <Input.TextArea
              placeholder="等待生成结果"
              value={results.join("\n")}
              autoSize
            />
          </Form.Item>
        </Form>
      </Card>
    </UtilsLayout>
  );
};

export default NanoidGenerator;
