import {
  BgColorsOutlined,
  DiffOutlined,
  FieldNumberOutlined,
  FieldStringOutlined,
  FieldTimeOutlined,
  FileImageOutlined,
  NumberOutlined,
  QrcodeOutlined,
  RetweetOutlined,
  SecurityScanOutlined,
  TableOutlined,
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
      {
        key: "json-to-toml",
        label: "JSON转换TOML",
        icon: <RetweetOutlined />,
      },
      {
        key: "json-to-yaml",
        label: "JSON转换YAML",
        icon: <RetweetOutlined />,
      },
      {
        key: "color-converter",
        label: "颜色转换器",
        icon: <BgColorsOutlined />,
      },
      {
        key: "base-converter",
        label: "进制转换器",
        icon: <NumberOutlined />,
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
  {
    key: "encryption",
    label: "加密",
    children: [
      {
        key: "uuid-generator",
        label: "UUID生成器",
        icon: <FieldNumberOutlined />,
      },
      {
        key: "nanoid-generator",
        label: "nanoid生成器",
        icon: <FieldNumberOutlined />,
      },
      {
        key: "encrypt",
        label: "加密/解密文本",
        icon: <SecurityScanOutlined />,
      },
    ],
  },
  {
    key: "web",
    label: "web",
    children: [
      {
        key: "html-table-json",
        label: "提取html表格中的数据",
        icon: <TableOutlined />,
      },
    ],
  },
];
export default instrumentMenus;
