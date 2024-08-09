import React, { useEffect } from "react";
import { Button, Card, Form, Input, message, Select } from "antd";
import CopyButton from "@/components/CopyButton";
import {
  base64ToString,
  stringToBase64,
  ab2str,
  str2ab,
} from "@/utils/converter";
import EncryptAndDecryptForm from "../EncryptAndDecryptForm";

const getPublicKey = async (key: CryptoKey) => {
  const publicKey = await window.crypto.subtle.exportKey("spki", key);
  const exportedAsBase64 = stringToBase64(ab2str(publicKey));
  return `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
};

const getPrivateKey = async (key: CryptoKey) => {
  const privateKey = await window.crypto.subtle.exportKey("pkcs8", key);
  const exportedAsBase64 = stringToBase64(ab2str(privateKey));
  return `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
};

const RSA = () => {
  const [keyPairForm] = Form.useForm<{
    modulusLength: number;
    hash: string;
    publicKey: string;
    privateKey: string;
  }>();

  const generateKey = async () => {
    const { modulusLength, hash } = keyPairForm.getFieldsValue();
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash,
      },
      true,
      ["encrypt", "decrypt"]
    );
    const [publicKey, privateKey] = await Promise.all([
      await getPublicKey(keyPair.publicKey),
      await getPrivateKey(keyPair.privateKey),
    ]);

    keyPairForm.setFieldsValue({
      publicKey,
      privateKey,
    });
  };

  const encryptTransform = async (input: string, key: string) => {
    try {
      const textEncoded = new TextEncoder();
      const encoded = textEncoded.encode(input);
      const pk = str2ab(
        base64ToString(
          key
            .replace(/^-----BEGIN PUBLIC KEY-----\n/, "")
            .replace(/\n-----END PUBLIC KEY-----$/, "")
        )
      );

      const publicKey = await window.crypto.subtle.importKey(
        "spki",
        pk,
        {
          name: "RSA-OAEP",
          hash: { name: keyPairForm.getFieldValue("hash") },
        },
        false,
        ["encrypt"]
      );

      const cipherText = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP",
        },
        publicKey,
        encoded
      );

      return stringToBase64(ab2str(cipherText));
    } catch (error) {
      message.error("加密失败～");
      return "";
    }
  };

  const decryptTransform = async (input: string, key: string) => {
    try {
      const encoded = str2ab(base64ToString(input));
      const pk = str2ab(
        base64ToString(
          key
            .replace(/^-----BEGIN PRIVATE KEY-----\n/, "")
            .replace(/\n-----END PRIVATE KEY-----$/, "")
        )
      );

      const privateKey = await window.crypto.subtle.importKey(
        "pkcs8",
        pk,
        {
          name: "RSA-OAEP",
          hash: { name: keyPairForm.getFieldValue("hash") },
        },
        false,
        ["decrypt"]
      );

      const plainText = await window.crypto.subtle.decrypt(
        {
          name: "RSA-OAEP",
        },
        privateKey,
        encoded
      );
      const dec = new TextDecoder();
      return dec.decode(plainText);
    } catch (error) {
      message.error("解密失败～");
      return "";
    }
  };

  useEffect(() => {
    generateKey();
  }, []);

  return (
    <>
      <Card
        title="公私钥"
        extra={
          <Button type="primary" onClick={generateKey}>
            刷新密钥对
          </Button>
        }
      >
        <Form
          form={keyPairForm}
          initialValues={{
            modulusLength: 2048,
            hash: "SHA-256",
          }}
          variant="filled"
          layout="vertical"
          labelAlign="right"
          className="sm:grid sm:grid-cols-2 sm:gap-x-6"
        >
          <Form.Item name="modulusLength" label="密钥长度">
            <Select
              className="!w-24"
              options={[
                {
                  label: "1024bit",
                  value: 1024,
                },
                {
                  label: "2048bit",
                  value: 2048,
                },
                {
                  label: "4096bit",
                  value: 4096,
                },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item name="hash" label="哈希算法">
            <Select
              className="!w-32"
              options={[
                {
                  label: "SHA-1",
                  value: "SHA-1",
                },
                {
                  label: "SHA-256",
                  value: "SHA-256",
                },
                {
                  label: "SHA-384",
                  value: "SHA-384",
                },
                {
                  label: "SHA-512",
                  value: "SHA-512",
                },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item name="publicKey" label="公钥">
            <Input.TextArea placeholder="公钥" style={{ minHeight: 240 }} />
          </Form.Item>
          <Form.Item name="privateKey" label="私钥">
            <Input.TextArea placeholder="私钥" style={{ minHeight: 240 }} />
          </Form.Item>

          <CopyButton
            options={{ text: () => keyPairForm.getFieldValue("publicKey") }}
            buttonProps={{ disabled: false }}
          >
            复制公钥
          </CopyButton>
          <CopyButton
            options={{
              text: () => keyPairForm.getFieldValue("privateKey"),
            }}
            buttonProps={{ disabled: false }}
          >
            复制私钥
          </CopyButton>
        </Form>
      </Card>
      <Card title="加密" className="mt-4">
        <EncryptAndDecryptForm
          inputLabel="明文"
          inputPlaceholder="输入你的明文..."
          keyLabel="公钥"
          keyPlaceholder="复制你的公钥到这里..."
          outputLabel="密文"
          outputPlaceholder="等待生成密文..."
          transform={encryptTransform}
        />
      </Card>
      <Card title="解密" className="mt-4">
        <EncryptAndDecryptForm
          inputLabel="密文"
          inputPlaceholder="输入你的密文..."
          keyLabel="私钥"
          keyPlaceholder="复制你的私钥到这里..."
          outputLabel="明文"
          outputPlaceholder="等待生成明文..."
          transform={decryptTransform}
        />
      </Card>
    </>
  );
};

export default RSA;
