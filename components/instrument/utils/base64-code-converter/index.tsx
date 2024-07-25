import React, { useRef, useState } from "react";
import UtilsLayout from "../Layout";
import { Button, Card, Input, message } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { TextAreaRef } from "antd/es/input/TextArea";
import Clipboard from "clipboard";

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
          ? btoa(
              encodeURIComponent(leftValue).replace(
                /%([0-9A-F]{2})/g,
                function (match, p1) {
                  return String.fromCharCode(Number("0x" + p1));
                }
              )
            )
          : decodeURIComponent(
              Array.prototype.map
                .call(atob(leftValue), function (c) {
                  return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
            );

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

  const copyResult = () => {
    const clipboard = new Clipboard("#result_btn");
    clipboard.on("success", () => {
      message.success("复制成功");
      clipboard.destroy();
    });
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
        <div className="text-center text-black dark:text-white" onClick={onExchange}>
          <SwapOutlined className="mt-4 text-xl cursor-pointer hover:text-gray-500" />
        </div>
        <Card
          className="col-span-5"
          title={right.title}
          bordered={false}
          extra={
            <Button
              id="result_btn"
              type="primary"
              data-clipboard-text={right.value}
              onClick={copyResult}
              disabled={right.value === ""}
            >
              复制结果
            </Button>
          }
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
