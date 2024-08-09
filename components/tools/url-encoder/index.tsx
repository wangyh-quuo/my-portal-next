import React from "react";
import UtilsLayout from "../Layout";
import BaseTransform from "@/components/BaseTransform";

const UrlEncoder = () => {
  return (
    <UtilsLayout
      title="编码/解码url"
      description="特定字符的每个实例替换成代表字符的 UTF-8 编码的一个、两个、三个或四个转义序列来编码 URI，或者解码"
    >
      <div className="grid gap-4">
        <BaseTransform
          title="编码"
          inputTitle="字符串"
          inputPlaceholder="字符串..."
          inputValue="您好～"
          outputTitle="编码后的字符串"
          outputPlaceholder="等待编码结果..."
          transform={encodeURIComponent}
        />
        <BaseTransform
          title="解码"
          inputTitle="编码后的字符串"
          inputPlaceholder="编码后的字符串..."
          inputValue="%E6%82%A8%E5%A5%BD%EF%BD%9E"
          outputTitle="解码后的字符串"
          outputPlaceholder="等待解码结果..."
          transform={decodeURIComponent}
        />
      </div>
    </UtilsLayout>
  );
};

export default UrlEncoder;
