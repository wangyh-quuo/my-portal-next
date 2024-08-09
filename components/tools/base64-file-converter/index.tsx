import React, { useState } from "react";
import UtilsLayout from "../Layout";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Upload,
  UploadProps,
} from "antd";
import { Rule } from "antd/es/form";
import { InboxOutlined } from "@ant-design/icons";
import Clipboard from "clipboard";

type Base64Form = {
  name: string;
  extension: string;
  base64: string;
};

function getMimeTypeFromBase64(base64String: string) {
  const match = base64String.match(/^data:([A-Za-z-+\/]+);base64,/);
  if (match) {
    return match[1];
  }
  return null;
}

// base64 to file
const Base64ToFile: React.FC<any> = () => {
  const [base64Form] = Form.useForm<Base64Form>();

  const base64Rules: Rule[] = [
    {
      type: "string",
      validator(rule, value) {
        return new Promise((resolve, rejected) => {
          const reg1 =
            /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([A-Za-z0-9+\/]{4})*([A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}==)?$/;
          const reg2 =
            /^([A-Za-z0-9+\/]{4})*([A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}==)?$/;
          if (reg1.test(value) || reg2.test(value)) {
            resolve(true);
          } else {
            rejected("无效的base64字符串");
          }
        });
      },
    },
  ];

  const onBase64FormValuesChange = (
    changedValues: Partial<Base64Form>,
    allValues: Base64Form
  ) => {
    const { base64 } = allValues;
    const ext = getMimeTypeFromBase64(base64)?.replace(/[a-z]+\//, "");
    if (!changedValues.extension && ext) {
      base64Form.setFieldValue("extension", ext);
    }
  };

  const doDownload = (url: string, fileName: string) => {
    const a = document.createElement("a");
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const download = () => {
    base64Form.validateFields().then((res) => {
      const { base64, name, extension } = base64Form.getFieldsValue();
      if (!base64) {
        return;
      }
      const ext = getMimeTypeFromBase64(base64);
      doDownload(
        ext ? base64 : `data:plain/${extension ?? "text"};base64,${base64}`,
        (name ?? "download") + (extension ? `.${extension}` : ".txt")
      );
    });
  };
  return (
    <Card title="base64转文件">
      <Form
        form={base64Form}
        onValuesChange={onBase64FormValuesChange}
        initialValues={{ name: "file", extension: "", base64: "" }}
      >
        <Row gutter={[12, 12]}>
          <Col>
            <Form.Item name="name" label="文件名">
              <Input placeholder="下载文件名" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="extension" label="扩展名">
              <Input placeholder="文件扩展名" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="base64" rules={base64Rules}>
          <Input.TextArea
            className="!min-h-32"
            placeholder="输入base64字符串"
          />
        </Form.Item>

        <Form.Item className="text-center">
          <Button type="primary" onClick={download}>
            下载
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

// file to base64
const FileToBase64: React.FC<any> = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState("");
  const props: UploadProps = {
    name: "file",
    multiple: false,
    action: (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
          const base64String = e.target?.result;
          resolve(base64String as string);
        };
        reader.onerror = (e) => {
          reject(e);
        };

        reader.readAsDataURL(file);
      });
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        form.setFieldValue("base64", info.file.xhr.responseURL);
        setResult(info.file.xhr.responseURL);
        message.success(`${info.file.name} 解析成功`);
      } else if (status === "error") {
        message.error(`${info.file.name} 解析失败`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const copy: React.MouseEventHandler<HTMLElement> = (e) => {
    const clipboard = new Clipboard(e.currentTarget);
    clipboard.on("success", () => {
      message.success("复制成功");
      clipboard.destroy();
    });
  };

  return (
    <Card title="文件转base64">
      <Upload.Dragger {...props} showUploadList={false}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件至此区域即可上传</p>
        <p className="ant-upload-hint"></p>
      </Upload.Dragger>

      <Form form={form} className="mt-6">
        <Form.Item name="base64">
          <Input.TextArea
            className="!min-h-32"
            placeholder="等待输出base64字符串"
            disabled
          />
        </Form.Item>
        <Form.Item className="text-center">
          <Button
            data-clipboard-text={result}
            onClick={copy}
            type="primary"
            disabled={result === ""}
          >
            复制
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const Base64FileConverter = () => {
  return (
    <UtilsLayout
      title="Base64 文件转换器"
      description="将字符串、文件或图像转换为其 Base64 表示形式。"
    >
      <div className="grid gap-4">
        <Base64ToFile />
        <FileToBase64 />
      </div>
    </UtilsLayout>
  );
};

export default Base64FileConverter;
