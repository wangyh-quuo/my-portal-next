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
      },
      {
        key: "number-converter",
        label: "数字转化器",
      },
      {
        key: "base64-code-converter",
        label: "base64字符串编码转换",
      },
      {
        key: "base64-file-converter",
        label: "base64文件转换",
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
      },
    ],
  },
];
export default instrumentMenus;