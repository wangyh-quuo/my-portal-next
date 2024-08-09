import React, { ChangeEventHandler, useEffect } from "react";
import { Card, ColorPicker, Form, Input } from "antd";
import UtilsLayout from "../Layout";
import CopyButton from "@/components/CopyButton";
import { CopyOutlined } from "@ant-design/icons";
import { getColorInfo } from "@/utils/color";
import { Color } from "antd/es/color-picker";

const ColorConverter = () => {
  const [form] = Form.useForm<{
    color: string;
    hex: string;
    rgb: string;
    hsl: string;
  }>();

  const onColorPickerChange = (_value: Color, hex: string) => {
    const colorInfo = getColorInfo(hex);
    form.setFieldsValue({
      hex: colorInfo.hex,
      rgb: colorInfo.rgba,
      hsl: colorInfo.hsla,
    });
  };
  const onHexChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    form.validateFields().then(() => {
      const value = e.target.value;
      const colorInfo = getColorInfo(value);
      form.setFieldsValue({
        color: colorInfo.hex,
        rgb: colorInfo.rgba,
        hsl: colorInfo.hsla,
      });
    });
  };
  const onRgbaChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    form.validateFields().then(() => {
      const value = e.target.value;
      const colorInfo = getColorInfo(value);
      form.setFieldsValue({
        color: colorInfo.hex,
        hex: colorInfo.hex,
        hsl: colorInfo.hsla,
      });
    });
  };
  const onHslaChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    form.validateFields().then(() => {
      const value = e.target.value;
      const colorInfo = getColorInfo(value);
      form.setFieldsValue({
        color: colorInfo.hex,
        hex: colorInfo.hex,
        rgb: colorInfo.rgba,
      });
    });
  };

  useEffect(() => {
    const colorInfo = getColorInfo("#1677ff");
    form.setFieldsValue({
      color: colorInfo.hex,
      hex: colorInfo.hex,
      rgb: colorInfo.rgba,
      hsl: colorInfo.hsla,
    });
  }, []);

  return (
    <UtilsLayout
      title="颜色转换器"
      description="在不同格式（十六进制、rgb、hsl和css名称）之间转换颜色"
    >
      <Card>
        <Form
          form={form}
          layout="horizontal"
          labelAlign="right"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          <Form.Item name="color" label="颜色选择器">
            <ColorPicker onChange={onColorPickerChange} showText />
          </Form.Item>
          <Form.Item
            name="hex"
            label="hex"
            rules={[
              {
                type: "string",
                message: "无效的hex",
                pattern:
                  /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{3})$/,
              },
            ]}
          >
            <Input
              onChange={onHexChange}
              placeholder="例:#ffffff"
              suffix={
                <CopyButton
                  options={{
                    text: () => form.getFieldValue("hex"),
                  }}
                  buttonProps={{
                    size: "small",
                    icon: <CopyOutlined />,
                    disabled: false,
                  }}
                />
              }
            />
          </Form.Item>
          <Form.Item
            name="rgb"
            label="rgb"
            rules={[
              {
                type: "string",
                message: "无效的rgb(a)",
                pattern:
                  /^rgb(a?)\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(1|0|0?\.\d+)\s*)?\)$/,
              },
            ]}
          >
            <Input
              placeholder="例:rgb(255,255,255)"
              onChange={onRgbaChange}
              suffix={
                <CopyButton
                  options={{
                    text: () => form.getFieldValue("rgb"),
                  }}
                  buttonProps={{
                    size: "small",
                    icon: <CopyOutlined />,
                    disabled: false,
                  }}
                />
              }
            />
          </Form.Item>
          <Form.Item
            name="hsl"
            label="hsl"
            rules={[
              {
                type: "string",
                message: "无效的hsl(a)",
                pattern:
                  /^hsl(a?)\(\s*([0-9]+(\.\d+)?)\s*,\s*((\d{1,2}(\.\d+)?)|100)%\s*,\s*((\d{1,2}(\.\d+)?)|100)%\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/,
              },
            ]}
          >
            <Input
              placeholder="例:hsl(0,0%,100%)"
              onChange={onHslaChange}
              suffix={
                <CopyButton
                  options={{
                    text: () => form.getFieldValue("hsl"),
                  }}
                  buttonProps={{
                    size: "small",
                    icon: <CopyOutlined />,
                    disabled: false,
                  }}
                />
              }
            />
          </Form.Item>
        </Form>
      </Card>
    </UtilsLayout>
  );
};

export default ColorConverter;
