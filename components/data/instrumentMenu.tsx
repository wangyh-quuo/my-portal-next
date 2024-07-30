import {
  DiffOutlined,
  FieldNumberOutlined,
  FieldStringOutlined,
  FieldTimeOutlined,
  FileImageOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";

/**
 * 工具菜单
 */
const instrumentMenus = [
  {
    key: "converter",
    label: "转化器",
    children: [
      {
        key: "date-time-converter",
        label: "日期时间转化器",
        icon: <FieldTimeOutlined />,
      },
      {
        key: "number-converter",
        label: "数字转化器",
        icon: <FieldNumberOutlined />,
      },
      {
        key: "base64-code-converter",
        label: "base64字符串编码转换",
        icon: <FieldStringOutlined />,
      },
      {
        key: "base64-file-converter",
        label: "base64文件转换",
        icon: <FileImageOutlined />,
      },
    ],
  },
  {
    key: "media",
    label: "图片/视频",
    children: [
      {
        key: "qr-code",
        label: "二维码生成器",
        icon: <QrcodeOutlined />,
      },
    ],
  },
  {
    key: "text",
    label: "文本",
    children: [
      {
        key: "text-diff",
        label: "文本对比",
        icon: <DiffOutlined />,
      },
    ],
  },
];
export default instrumentMenus;
