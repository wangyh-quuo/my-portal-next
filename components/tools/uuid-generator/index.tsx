import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Radio,
  Tooltip,
  type RadioChangeEvent,
} from "antd";
import * as uuid from "uuid";
import UtilsLayout from "../Layout";
import CopyButton from "@/components/CopyButton";
import { InfoCircleFilled } from "@ant-design/icons";

const versions: ["NIL", "v1", "v3", "v4", "v5", "v7"] = [
  "NIL",
  "v1",
  "v3",
  "v4",
  "v5",
  "v7",
];
const v3OrV5Namespaces = [
  {
    label: "DNS",
    value: uuid.v5.DNS,
  },
  {
    label: "URL",
    value: uuid.v5.URL,
  },
];
const UUIDGenerator = () => {
  const [form] = Form.useForm<{
    version: (typeof versions)[number];
    count: number;
  }>();

  const [version, setVersion] = useState<(typeof versions)[number]>("v1");

  const onVersionChange = (e: RadioChangeEvent) => {
    setVersion(e.target.value);
  };

  const isV3OrV5 = (v: string) => v === "v3" || v === "v5";

  const [results, setResults] = useState<string[]>([]);

  const generateUuid = () => {
    const { version, count } = form.getFieldsValue();
    const namespace = form.getFieldValue("namespace");
    const name = form.getFieldValue("name");
    const res: string[] = [];
    try {
      for (let i = 0; i < count; i++) {
        if (isV3OrV5(version)) {
          res.push(uuid[version](name, namespace));
        } else {
          res.push(
            typeof uuid[version] === "string"
              ? uuid[version]
              : (uuid[version] as any)()
          );
        }
      }
    } catch (error) {
      console.log("生成uuid失败");
    } finally {
      setResults(res);
    }
  };

  const onValuesChange = () => {
    generateUuid();
  };

  const onRetry = () => {
    generateUuid();
  };

  useEffect(() => {
    generateUuid();
  }, []);

  return (
    <UtilsLayout
      title="UUID 生成器"
      description="生成随机的通用唯一词典可排序标识符（ULID）。"
    >
      <Card title="">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          variant="filled"
          onValuesChange={onValuesChange}
          initialValues={{
            version: "v1",
            count: 1,
            namespace: uuid.v5.URL,
            name: "",
          }}
        >
          <Form.Item name="version" label="版本">
            <Radio.Group
              buttonStyle="solid"
              value={version}
              onChange={onVersionChange}
              optionType="button"
              options={versions.map((v) => ({ label: v, value: v }))}
            ></Radio.Group>
          </Form.Item>
          <Form.Item name="count" label="数量">
            <InputNumber min={1} max={20} />
          </Form.Item>
          {isV3OrV5(version) ? (
            <>
              <Form.Item name="name" label="名称">
                <Input placeholder="名称" />
              </Form.Item>
              <Form.Item label="命名空间">
                <Form.Item name="namespace">
                  <Radio.Group
                    buttonStyle="solid"
                    optionType="button"
                    options={v3OrV5Namespaces}
                  ></Radio.Group>
                </Form.Item>
                <Form.Item
                  name="namespace"
                  rules={[
                    {
                      type: "string",
                      pattern: /^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i,
                      message: "无效的命名空间",
                    },
                  ]}
                >
                  <Input
                    placeholder="自定义命名空间"
                    suffix={
                      <Tooltip title="自定义命名空间">
                        <InfoCircleFilled />
                      </Tooltip>
                    }
                  />
                </Form.Item>
              </Form.Item>
            </>
          ) : null}

          <Form.Item className="text-center">
            <Button.Group>
              <CopyButton value={results.join("\n")} />
              <Button onClick={onRetry}>重新生成</Button>
            </Button.Group>
          </Form.Item>
          <Form.Item label="uuid">
            <Input.TextArea placeholder="等待生成结果" value={results.join("\n")} autoSize />
          </Form.Item>
        </Form>
      </Card>
    </UtilsLayout>
  );
};

export default UUIDGenerator;
