import React from "react";
import UtilsLayout from "../Layout";
import { Tabs } from "antd";
import AES from "./aes";
import RSA from "./rsa";

const Encrypt = () => {
  const tabsList = [
    {
      label: "AES",
      key: "AES",
      children: <AES />,
    },
    {
      label: "RSA",
      key: "RSA",
      children: <RSA />,
    },
  ];

  return (
    <UtilsLayout title="加密/解密文本" description="使用加密算法加密解密文本">
      <Tabs type="card" items={tabsList} />
    </UtilsLayout>
  );
};

export default Encrypt;
