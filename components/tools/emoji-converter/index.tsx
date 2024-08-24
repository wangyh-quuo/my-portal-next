import React from "react";
import UtilsLayout from "../Layout";
import { Card, Form, Input } from "antd";
import { omit } from "lodash";
import Emoji, { type IEmoji } from "@/utils/emoji";
import { InputCopy } from "@/components/CopyButton";

const hexValidator = (rule: any, value: any) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(value?.length ? Emoji.hexToUnicode(value) : "");
    } catch (error) {
      reject(error);
    }
  });
};
const decimalValidator = (rule: any, value: any) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(value?.length ? Emoji.decimalToUnicode(value) : "");
    } catch (error) {
      reject(error);
    }
  });
};

const EmojiConverter = () => {
  const [form] = Form.useForm<IEmoji>();
  const initialValues = new Emoji("😀😂😐😙").formatEmoji();

  const onValuesChange = (changeValue: Partial<IEmoji>) => {
    const { unicode, codePoints, decimal, hex, buffer } = changeValue;
    if (unicode !== void 0) {
      const emojiData = new Emoji(unicode).formatEmoji();
      form.setFieldsValue(omit(emojiData, "unicode"));
      return;
    }

    if (codePoints) {
      const emojiData = new Emoji(
        Emoji.codePointsToUnicode(codePoints)
      ).formatEmoji();
      form.setFieldsValue(omit(emojiData, "codePoints"));
      return;
    }

    if (decimal !== void 0) {
      try {
        const emojiData = new Emoji(
          Emoji.decimalToUnicode(decimal)
        ).formatEmoji();
        form.setFieldsValue(omit(emojiData, "decimal"));
      } catch (error) {}
      return;
    }
    if (hex !== void 0) {
      try {
        const emojiData = new Emoji(Emoji.hexToUnicode(hex)).formatEmoji();
        form.setFieldsValue(omit(emojiData, "hex"));
      } catch (error) {}
      return;
    }

    if (buffer !== void 0) {
      const emojiData = new Emoji(
        Emoji.bufferToUnicode(buffer.split(" "))
      ).formatEmoji();
      form.setFieldsValue(omit(emojiData, "buffer"));
      return;
    }
  };

  const properties = [
    { name: "unicode", label: "表情符号", placeholder: "eg: 😊" },
    { name: "codePoints", label: "转义字符", placeholder: `eg: \uD83D\uDE33` },
    {
      name: "decimal",
      label: "十进制表示",
      placeholder: "eg: &#128512;",
      rules: [
        {
          validator: decimalValidator,
        },
      ],
    },
    {
      name: "hex",
      label: "十六进制表示",
      placeholder: `eg: &#x1F600;`,
      rules: [
        {
          validator: hexValidator,
        },
      ],
    },
    {
      name: "buffer",
      label: "Bytes (UTF-8)",
      placeholder: "eg: \xF0 \x9F \x98 \x81",
    },
  ];

  return (
    <UtilsLayout
      title="emoji 转换器"
      description="表情符号各种表示方式之间转换，支持统一码、十进制表示、十六进制表示、字节数组"
    >
      <Card>
        <Form
          form={form}
          variant="filled"
          labelCol={{ span: 4 }}
          onValuesChange={onValuesChange}
          initialValues={initialValues}
        >
          {properties.map((item) => (
            <Form.Item
              key={item.name}
              name={item.name}
              label={item.label}
              rules={item.rules}
            >
              <div className="grid grid-cols-12 gap-2">
                <Form.Item name={item.name} className="col-span-11 mb-0">
                  <Input.TextArea
                    placeholder={item.placeholder}
                    style={{ minHeight: 80 }}
                  />
                </Form.Item>
                <Form.Item className="mb-0">
                  <InputCopy
                    options={{
                      text: () => form.getFieldValue(item.name),
                    }}
                  />
                </Form.Item>
              </div>
            </Form.Item>
          ))}
        </Form>
      </Card>
    </UtilsLayout>
  );
};

export default EmojiConverter;
