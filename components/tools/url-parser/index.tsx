import React, { useCallback, useEffect, useState } from "react";
import UtilsLayout from "../Layout";
import { Card, Divider, Form, Input } from "antd";
import { InputCopy } from "@/components/CopyButton";
import { Rule } from "antd/es/form";

const UrlParser = () => {
  const [form] = Form.useForm();
  const [parsedUrl, setParsedUrl] = useState<URL>();
  const properties: {
    label: string;
    property: keyof URL;
  }[] = [
    { label: "href", property: "href" },
    { label: "origin", property: "origin" },
    { label: "protocol", property: "protocol" },
    { label: "host", property: "host" },
    { label: "username", property: "username" },
    { label: "password", property: "password" },
    { label: "hostname", property: "hostname" },
    { label: "port", property: "port" },
    { label: "pathname", property: "pathname" },
    { label: "hash", property: "hash" },
    { label: "search", property: "search" },
  ];

  const urlValidator: Rule[] = [
    {
      validator(rule, value) {
        return new Promise((resolve, reject) => {
          try {
            resolve(new URL(value));
          } catch (error) {
            reject("无效的url");
          }
        });
      },
    },
  ];

  const onValuesChange = () => {
    parserLocation();
  };

  const parserLocation = () => {
    try {
      const url = new URL(form.getFieldValue("url"));
      setParsedUrl(url);
      getSearchParams();
    } catch (error) {
      setParsedUrl(void 0);
    }
  };

  const getSearchParams = useCallback(() => {
    const searchParams = new URLSearchParams(parsedUrl?.search);
    const params = [];
    for (const [key, value] of searchParams) {
      params.push({ key, value });
    }
    return params;
  }, [parsedUrl]);

  useEffect(() => {
    parserLocation();
  }, []);

  return (
    <UtilsLayout
      title="URL 解析器"
      description="解析url字符串以获取所有不同的部分（协议、来源、参数、端口、用户名密码…）"
    >
      <Card>
        <Form
          form={form}
          initialValues={{
            url: "https://user:pwd@mate-it-tools.tech:8080/tools?a=1&b=2#hash",
          }}
          variant="filled"
          labelCol={{ span: 4 }}
          onValuesChange={onValuesChange}
        >
          <Form.Item name="url" label="url" rules={urlValidator}>
            <Input placeholder="输入url地址" />
          </Form.Item>
        </Form>
        <Divider />
        <Form variant="filled" labelCol={{ span: 4 }}>
          {properties.map((item) => (
            <Form.Item className="mb-0" label={item.label} key={item.label}>
              <Form.Item>
                <Input
                  value={parsedUrl?.[item.property] as string}
                  placeholder="等待输出..."
                  addonAfter={
                    <InputCopy value={parsedUrl?.[item.property] as string} />
                  }
                />
              </Form.Item>
              {item.property === "search"
                ? getSearchParams().map((p, index) => (
                    <Form.Item
                      key={"param" + index}
                      label={"param" + index}
                      className="mb-0"
                    >
                      <div className="grid grid-cols-2 gap-x-6">
                        <Form.Item>
                          <Input
                            value={p.key}
                            addonAfter={<InputCopy value={p.key} />}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Input
                            value={p.value}
                            addonAfter={<InputCopy value={p.value} />}
                          />
                        </Form.Item>
                      </div>
                    </Form.Item>
                  ))
                : null}
            </Form.Item>
          ))}
        </Form>
      </Card>
    </UtilsLayout>
  );
};

export default UrlParser;
