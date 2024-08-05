import React, { useRef, useState } from "react";
import UtilsLayout from "../Layout";
import { Card, Input } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { TextAreaRef } from "antd/es/input/TextArea";
import { base64ToString, stringToBase64 } from "@/utils/converter";
import CopyButton from "@/components/CopyButton";

const Base64CodeConverter = () => {
  const [config, setConfig] = useState([
    {
      title: "string",
      value: "",
      leftPlaceholder: "输入字符串...",
      rightPlaceholder: "等待输出解码后的字符串",
    },
    {
      title: "base64",
      value: "",
      leftPlaceholder: "输入base64字符串",
      rightPlaceholder: "等待输出编码后的字符串",
    },
  ]);
  const [left, right] = config;
  const [error, setError] = useState<boolean>();
  const leftRef = useRef<TextAreaRef>(null);

  const onLeftChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const leftValue = e.target.value;
    try {
      const rightValue =
        left.title === "string"
          ? stringToBase64(leftValue)
          : base64ToString(leftValue);

      setConfig([
        { ...left, value: leftValue },
        { ...right, value: rightValue },
      ]);
      setError(false);
    } catch (error) {
      setError(true);
      if (left.title === "base64") {
        setConfig([
          { ...left, value: leftValue },
          { ...right, value: "" },
        ]);
        return;
      }
    }
  };

  const onExchange = () => {
    if (error) {
      setConfig([
        { ...right, value: "" },
        { ...left, value: "" },
      ]);
    } else {
      setConfig([right, left]);
    }
    setError(false);
    leftRef.current?.focus();
  };

  return (
    <UtilsLayout
      title="Base64 字符串编码/解码"
      description="将字符串编码和解码为其 Base64 格式表示形式即可。"
    >
      <div className="grid sm:grid-cols-12 gap-3 grid-cols-1">
        <Card className="col-span-5" title={left.title} bordered={false}>
          <Input.TextArea
            ref={leftRef}
            style={{ height: 240, resize: "none" }}
            value={left.value}
            placeholder={left.leftPlaceholder}
            status={error ? "error" : ""}
            onChange={onLeftChange}
          />
          {error && <div className="text-red-600">无效的base64字符串</div>}
        </Card>
        <div
          className="text-center text-black dark:text-white"
          onClick={onExchange}
        >
          <SwapOutlined className="sm:mt-4 text-xl cursor-pointer hover:text-gray-500" />
        </div>
        <Card
          className="col-span-5"
          title={right.title}
          bordered={false}
          extra={<CopyButton value={right.value} />}
        >
          <Input.TextArea
            style={{ height: 240, resize: "none" }}
            value={right.value}
            placeholder={right.rightPlaceholder}
            disabled
          />
        </Card>
      </div>
    </UtilsLayout>
  );
};

export default Base64CodeConverter;
