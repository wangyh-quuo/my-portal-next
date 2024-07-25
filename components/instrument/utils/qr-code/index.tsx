import React, { useEffect, useRef, useState } from "react";
import UtilsLayout from "../Layout";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  ColorPicker,
  InputNumber,
  Select,
} from "antd";
import QRCode, { QRCodeToDataURLOptions } from "qrcode";
import { ColorFactory } from "antd/es/color-picker/color";

export interface IColorObj {
  r: number;
  g: number;
  b: number;
  a?: number;
}
/**
 * 255颜色值转16进制颜色值
 * @param n 255颜色值
 * @returns hex 16进制颜色值
 */
export const toHex = (n: number) => `${n > 15 ? "" : 0}${n.toString(16)}`;

/**
 * 颜色对象转化为16进制颜色字符串
 * @param colorObj 颜色对象
 */
export const toHexString = (colorObj: IColorObj) => {
  const { r, g, b, a = 1 } = colorObj;
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(Math.floor(a * 255))}`;
};

const ScanCode = () => {
  const [form] = Form.useForm();
  const [iconUrl, setIconUrl] = useState<string>("");
  const imageRef = useRef<HTMLCanvasElement>(null);

  const canvasImage = (src1: string, src2: string) => {
    const canvas = imageRef.current;
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      const img1 = new window.Image();
      img1.onload = () => {
        ctx.drawImage(img1, 0, 0, 200, 200);
        const img2 = new window.Image();
        img2.onload = () => {
          ctx.fillStyle = "#ffffffff";
          ctx.fillRect(78, 78, 44, 44);
          ctx.drawImage(img2, 80, 80, 40, 40);
        };
        img2.crossOrigin="anonymous";
        img2.src = src2;
      };
      img1.crossOrigin="anonymous";
      img1.src = src1;
    }
  };

  const createImage = () => {
    const { text, ...options } = form.getFieldsValue();
    setIconUrl(options.icon);
    const opts: QRCodeToDataURLOptions = {
      type: "image/png", // "image/png" | "image/jpeg" | "image/webp"
      errorCorrectionLevel: options.errorCorrectionLevel,
      margin: options.margin,
      width: 200,
      color: {
        dark: toHexString(options.color.toRgb()),
        light: toHexString(options.bgColor.toRgb()),
      },
    };
    QRCode.toDataURL(text, opts, function (err, url) {
      if (err) throw err;
      canvasImage(url, options.icon);
    });
  };

  const doDownload = (url: string, fileName: string) => {
    const a = document.createElement("a");
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const onDownloadClick = () => {
    const canvas = imageRef.current;
    if (canvas) {
      const url = canvas.toDataURL();
      doDownload(url, "QRCode.png");
    }
  };

  useEffect(() => {
    createImage();
  }, []);

  return (
    <UtilsLayout
      title="二维码生成器"
      description="生成并下载url或文本的QR二维码"
    >
      <Card className="md:mx-20">
        <Form
          form={form}
          layout="horizontal"
          labelWrap
          labelCol={{ span: 4 }}
          initialValues={{
            text: "https://wangyh-quuo.github.io/my-portal-next",
            errorCorrectionLevel: "M",
            color: new ColorFactory("#00000ff"),
            bgColor: new ColorFactory("#ffffffff"),
            margin: 2,
            icon: "https://avatars.githubusercontent.com/u/52026731?v=4",
          }}
          onValuesChange={createImage}
        >
          <Form.Item name="text" label="文本内容">
            <Input placeholder="输入文本" />
          </Form.Item>
          <Form.Item name="errorCorrectionLevel" label="抗错误能力">
            <Select
              options={[
                { label: "Low(表面损坏的最大程度~7%)", value: "L" },
                { label: "Medium(表面损坏的最大程度~15%)", value: "M" },
                { label: "Quartile(表面损坏的最大程度~25%)", value: "Q" },
                { label: "High(表面损坏的最大程度~30%)", value: "H" },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item name="color" label="颜色">
            <ColorPicker size="small" format="hex" />
          </Form.Item>
          <Form.Item name="bgColor" label="背景颜色">
            <ColorPicker size="small" format="hex" />
          </Form.Item>
          <Form.Item name="margin" label="留白间隙">
            <InputNumber />
          </Form.Item>
          <Form.Item name="icon" label="二维码中图片的地址">
            <Input
              placeholder="输入二维码中图片的地址"
              suffix={
                <Image
                  preview={false}
                  width={16}
                  height={16}
                  src={iconUrl}
                  alt="icon"
                />
              }
            />
          </Form.Item>
        </Form>

        <div className="flex gap-6 flex-col justify-center items-center">
          <canvas
            className="border"
            ref={imageRef}
            width={200}
            height={200}
          ></canvas>
          <Button type="primary" onClick={onDownloadClick}>
            下载
          </Button>
        </div>
      </Card>
    </UtilsLayout>
  );
};

export default ScanCode;
