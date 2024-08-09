import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
} from "antd";
import { bufferToHex, hexToBuffer } from "@/utils/converter";

const AES = () => {
  const [encryptForm] = Form.useForm();
  const [cipherText, setCipherText] = useState("");

  const [decryptForm] = Form.useForm();
  const [plaintext, setPlaintext] = useState("");

  const generateKey = async (form: FormInstance) => {
    const { mode, len } = form.getFieldsValue();
    const genKey = await window.crypto.subtle.generateKey(
      {
        name: `AES-${mode}`,
        length: len,
      },
      true,
      ["encrypt", "decrypt"]
    );
    const raw = await window.crypto.subtle.exportKey("raw", genKey);

    form.setFieldValue("key", bufferToHex(new Uint8Array(raw)));
  };

  const generateIV = async (form: FormInstance) => {
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    form.setFieldValue("iv", bufferToHex(iv));
  };

  const onEncryptValuesChange = async () => {
    encrypt();
  };

  // 不足补齐0 超过长度省略
  const transformStr = (s: string = "", len: number) => {
    if (s.length > len) {
      return s.slice(0, len);
    }
    if (s.length < len) {
      return s.padEnd(len, "0");
    }
    return s;
  };

  const encrypt = async () => {
    const { mode, plaintext, iv, len, key: k } = encryptForm.getFieldsValue();
    const encode = new TextEncoder();

    const key = await window.crypto.subtle.importKey(
      "raw",
      hexToBuffer(transformStr(k, len / 4)),
      {
        name: `AES-${mode}`,
        length: len,
      },
      true,
      ["encrypt", "decrypt"]
    );
    const algorithmParams =
      mode === "CTR"
        ? {
            counter: hexToBuffer(transformStr(iv, 32)),
            length: 64,
          }
        : {
            iv: hexToBuffer(transformStr(iv, 32)),
          };
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: `AES-${mode}`,
        ...algorithmParams,
      },
      key,
      encode.encode(plaintext)
    );
    setCipherText(bufferToHex(encrypted));
  };

  const onDecryptValuesChange = async () => {
    decrypt();
  };

  const decrypt = async () => {
    const { mode, cipherText, iv, len, key: k } = decryptForm.getFieldsValue();
    const key = await window.crypto.subtle.importKey(
      "raw",
      hexToBuffer(transformStr(k, len / 4)),
      {
        name: `AES-${mode}`,
        length: len,
      },
      true,
      ["encrypt", "decrypt"]
    );
    const algorithmParams =
      mode === "CTR"
        ? {
            counter: hexToBuffer(transformStr(iv, 32)),
            length: 64,
          }
        : {
            iv: hexToBuffer(transformStr(iv, 32)),
          };

    try {
      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: `AES-${mode}`,
          ...algorithmParams,
        },
        key,
        hexToBuffer(cipherText)
      );
      const dec = new TextDecoder();
      setPlaintext(dec.decode(decrypted));
    } catch (error) {
      console.log(error);
      setPlaintext("解密失败～");
    }
  };

  const isCTR = (form: FormInstance) => form.getFieldValue("mode") === "CTR";

  return (
    <>
      <Alert
        className="mb-4"
        message="说明：AES数据块长度为128位，所以IV长度需要为16个字符；密钥根据指定密钥位数分别为16、32个字符，IV与密钥超过长度则截取，不足则在末尾填充'\0'补足"
        type="info"
      />
      <Card title="加密">
        <Form
          form={encryptForm}
          layout="vertical"
          variant="filled"
          initialValues={{ mode: "CBC", len: 256 }}
          onValuesChange={onEncryptValuesChange}
        >
          <Form.Item name="mode" label="模式">
            <Radio.Group
              optionType="button"
              buttonStyle="solid"
              options={["CTR", "CBC", "GCM"]}
            ></Radio.Group>
          </Form.Item>
          <div className="grid sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6">
            <Form.Item
              name="plaintext"
              label="明文"
              className="sm:col-span-1 sm:row-span-2"
            >
              <Input.TextArea placeholder="明文" style={{ height: 120 }} />
            </Form.Item>

            <Form.Item name="key" label="密钥">
              <Input
                placeholder="输入或者生成十六进制表示的密钥"
                addonBefore={
                  <Form.Item name="len" className="mb-0 w-24">
                    <Select
                      options={[
                        {
                          label: "128位",
                          value: 128,
                        },
                        {
                          label: "256位",
                          value: 256,
                        },
                      ]}
                    />
                  </Form.Item>
                }
                suffix={
                  <Button size="small" onClick={() => generateKey(encryptForm)}>
                    生成密钥
                  </Button>
                }
              />
            </Form.Item>
            <Form.Item
              name="iv"
              label={isCTR(encryptForm) ? "计数器" : "偏移量IV"}
            >
              <Input
                placeholder={
                  isCTR(encryptForm)
                    ? "输入或者生成十六进制表示的计数器"
                    : "输入或者生成十六进制表示的偏移量IV"
                }
                suffix={
                  <Button size="small" onClick={() => generateIV(encryptForm)}>
                    随机生成128位
                  </Button>
                }
              />
            </Form.Item>
          </div>

          <Form.Item label="密文">
            <Input.TextArea
              placeholder="密文"
              value={cipherText}
              style={{ height: 120 }}
            />
          </Form.Item>
        </Form>
      </Card>
      <Card className="mt-4" title="解密">
        <Form
          form={decryptForm}
          layout="vertical"
          variant="filled"
          initialValues={{ mode: "CBC", len: 256 }}
          onValuesChange={onDecryptValuesChange}
        >
          <Form.Item name="mode" label="模式">
            <Radio.Group
              optionType="button"
              buttonStyle="solid"
              options={["CTR", "CBC", "GCM"]}
            ></Radio.Group>
          </Form.Item>
          <div className="grid sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6">
            <Form.Item
              name="cipherText"
              label="密文"
              className="sm:col-span-1 sm:row-span-2"
            >
              <Input.TextArea placeholder="密文" style={{ height: 120 }} />
            </Form.Item>

            <Form.Item name="key" label="密钥">
              <Input
                placeholder="输入或者生成十六进制表示的密钥"
                addonBefore={
                  <Form.Item name="len" className="mb-0 w-24">
                    <Select
                      options={[
                        {
                          label: "128位",
                          value: 128,
                        },
                        {
                          label: "256位",
                          value: 256,
                        },
                      ]}
                    />
                  </Form.Item>
                }
                suffix={
                  <Button size="small" onClick={() => generateKey(decryptForm)}>
                    生成密钥
                  </Button>
                }
              />
            </Form.Item>
            <Form.Item
              name="iv"
              label={isCTR(decryptForm) ? "计数器" : "偏移量IV"}
            >
              <Input
                placeholder={
                  isCTR(decryptForm)
                    ? "输入或者生成十六进制表示的计数器"
                    : "输入或者生成十六进制表示的偏移量IV"
                }
                suffix={
                  <Button size="small" onClick={() => generateIV(decryptForm)}>
                    随机生成128位
                  </Button>
                }
              />
            </Form.Item>
          </div>

          <Form.Item label="明文">
            <Input.TextArea
              placeholder="明文"
              value={plaintext}
              style={{ height: 120 }}
            />
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AES;
