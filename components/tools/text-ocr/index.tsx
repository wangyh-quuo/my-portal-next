import React, { useCallback, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Select,
  Spin,
  Tooltip,
  Upload,
  UploadProps,
} from "antd";
import { InboxOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { createWorker } from "tesseract.js";

import UtilsLayout from "../Layout";
import CopyButton from "@/components/CopyButton";

const useRecognize = (lang: string[]) => {
  const [result, setResult] = useState<Tesseract.RecognizeResult["data"]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [loadingText, setLoadingText] = useState<string>();
  const recognize = useCallback(
    async (image: Tesseract.ImageLike) => {
      try {
        setLoading(true);
        setLoadingText("初始化API...");
        const worker = await createWorker(lang);
        setLoadingText("正在识别文本...");
        const ret = await worker.recognize(image);
        setResult(ret.data);
        await worker.terminate();
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [lang]
  );
  return {
    result,
    recognize,
    loading,
    loadingText,
    error,
  };
};

const TextOcr: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [lang, setLang] = useState<string[]>(["eng"]);
  const [file, setFile] = useState<File>();

  const { loading, loadingText, recognize, result } = useRecognize(lang);
  const props: UploadProps = {
    name: "file",
    accept: "image/png, image/jpg, application/x-bmp, image/webp",
    multiple: false,
    maxCount: 1,
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
        setImageUrl(info.file.xhr.responseURL);
        const worker = new Worker(new URL("worker.ts", import.meta.url));
        worker.postMessage(info.file.originFileObj);
        worker.onmessage = function (e: MessageEvent<File>) {
          setFile(e.data);
          recognize(e.data);
        };
      } else if (status === "error") {
        message.error(`${info.file.name} 解析失败`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const runRecognize = () => {
    recognize(file!);
  };

  return (
    <UtilsLayout title="文字识别" description="从图像中获取文本">
      <Card title="文本识别">
        <div className="grid gap-y-6">
          <Form variant="filled">
            <Form.Item>
              <Select
                onChange={(v) => {
                  setLang(v);
                }}
                value={lang}
                options={[
                  { label: "中文(简体)", value: "chi_sim" },
                  { label: "English", value: "eng" },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item className="mb-0">
              <Upload.Dragger {...props} showUploadList={false}>
                {imageUrl ? (
                  <img src={imageUrl} alt="img" className="max-h-64 mx-auto" />
                ) : (
                  <>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      点击或拖拽文件至此区域即可上传
                    </p>
                    <p className="ant-upload-hint"></p>
                  </>
                )}
              </Upload.Dragger>
            </Form.Item>
          </Form>

          {result?.confidence && (
            <Tooltip
              placement="left"
              title="指对一个字符或单词识别的置信度,数值越高表示模型越有信心该字符或单词是正确的"
            >
              <InfoCircleOutlined /> 置信度：{result?.confidence}
            </Tooltip>
          )}

          <Form variant="filled">
            <Form.Item>
              <Spin spinning={loading} tip={loadingText} size="small">
                <Input.TextArea
                  className="!min-h-32"
                  placeholder="等待输出结果..."
                  value={result?.text}
                  autoSize
                />
              </Spin>
            </Form.Item>
            <Form.Item className="text-center">
              <Button.Group>
                <Button disabled={!file} onClick={runRecognize}>
                  重新执行
                </Button>
                <CopyButton value={result?.text} />
              </Button.Group>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </UtilsLayout>
  );
};

export default TextOcr;
