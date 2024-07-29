/**
 * 链接数据
 */
import React from "react";
import Icon, {
  AndroidOutlined,
  BarChartOutlined,
  BlockOutlined,
  BuildOutlined,
  FolderOutlined,
  FontSizeOutlined,
  JavaScriptOutlined,
  PlaySquareOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { INavItems } from "../NavItemCard";

// 枚举 - 菜单栏一级类别
export enum ENUM_NAV_TYPE {
  JS_FRAMEWORK = "js-framework",
  JS_TOOLS = "js-tools",
}

export const rootNavMap: Record<
  string,
  { label: string; icon?: React.ReactNode }
> = {
  "js-framework": { label: "客户端框架", icon: <BlockOutlined /> },
  "js-tools": { label: "js工具" },
};

const linkItems: INavItems[] = [
  {
    key: "常用工具",
    label: "常用工具",
    icon: <ToolOutlined />,
    items: [
      {
        key: "mdn",
        label: "mdn",
        description: "Web开发者文档（包含 CSS, HTML, and JavaScript）",
        icon: "/favicon-48x48.png",
        link: "https://developer.mozilla.org",
      },
      {
        key: "regex101",
        label: "正则校验",
        description: "在线正则测试和调试工具",
        icon: "/favicon.ico",
        link: "https://regex101.com",
      },
      {
        key: "json",
        label: "JSON解析",
        description: "JSON在线解析及格式化验证 - JSON.cn",
        icon: "/favicon.ico",
        link: "https://www.json.cn",
      },
      {
        key: "tinypng",
        label: "图片压缩",
        description: "TinyPNG – 智能压缩 WebP、PNG 和 JPEG 图像",
        icon: "/images/favicon.ico",
        link: "https://tinypng.com",
      },
      {
        key: "jsbench",
        label: "js代码性能检测",
        description: "在线正则测试和调试工具",
        icon: "/assets/icons/favicon-32x32.png",
        link: "https://jsbench.me",
      },
    ],
    level: 1,
  },
  {
    key: "React",
    label: "React技术栈",
    icon: (
      <Icon
        component={() => (
          <img width={16} src="https://zh-hans.reactjs.org/favicon.ico" />
        )}
      />
    ),
    items: [
      {
        key: "React",
        label: "React",
        description: "用于构建 Web 和原生交互界面的库",
        icon: "/favicon.ico",
        link: "https://zh-hans.reactjs.org",
      },
      {
        key: "ReactRouter",
        label: "React Router",
        description: "React 声明式路由",
        icon: "/favicon-light.png",
        link: "https://reactrouter.com",
      },
      {
        key: "Redux",
        label: "Redux",
        description: "JS 应用程序的可预测状态容器",
        icon: "/img/favicon/favicon.ico",
        link: "https://redux.js.org",
      },
      {
        key: "redux-toolkit",
        label: "Redux Toolkit",
        description: "官方出的更有效的redux管理状态工具",
        icon: "/img/favicon/favicon.ico",
        link: "https://redux-toolkit.js.org",
      },
      {
        key: "gatsbyjs",
        label: "Gatsby",
        description: "基于React和Graph QL的静态站点生成器",
        icon: "/favicon-32x32.png",
        link: "https://www.gatsbyjs.com",
      },
      {
        key: "nextjs",
        label: "Next",
        description: "基于React通用Web应用框架",
        icon: "/static/favicon/favicon.ico",
        link: "https://nextjs.org",
      },
    ],
    parentKey: ENUM_NAV_TYPE.JS_FRAMEWORK,
    level: 2,
  },
  {
    key: "Vue",
    label: "Vue技术栈",
    icon: (
      <Icon
        component={() => (
          <img width={16} src="https://cn.vuejs.org/logo.svg" />
        )}
      />
    ),
    items: [
      {
        key: "Vue",
        label: "Vue",
        description:
          "渐进式 JavaScript 框架 易学易用，性能出色，适用场景丰富的 Web 前端框架。",
        icon: "/logo.svg",
        link: "https://cn.vuejs.org",
      },
      {
        key: "Vue Router",
        label: "Vue Router",
        description:
          "Vue.js 的官方路由 为 Vue.js 提供富有表现力、可配置的、方便的路由",
        icon: "/logo.svg",
        link: "https://router.vuejs.org",
      },
      {
        key: "Pinia",
        label: "Pinia",
        description:
          "符合直觉的  Vue.js 状态管理库 类型安全、可扩展性以及模块化设计。甚至让你忘记正在使用的是一个状态库。",
        icon: "/logo.svg",
        link: "https://pinia.vuejs.org",
      },
      {
        key: "Nuxt",
        label: "Nuxt",
        description: "一个基于 Vue.js 的通用应用框架。",
        icon: "/icon.png",
        link: "https://nuxt.com",
      },
      {
        key: "vueuse",
        label: "VueUse",
        description: "组合式api应用集合",
        icon: "/favicon.svg",
        link: "https://vueuse.org",
      },
    ],
    parentKey: ENUM_NAV_TYPE.JS_FRAMEWORK,
    level: 2,
  },
  {
    key: "javascript",
    label: "好用的工具",
    icon: <JavaScriptOutlined />,
    items: [
      {
        key: "Alpine.js",
        label: "Alpine.js",
        description: "新、轻量级 JavaScript 框架",
        icon: "/social.jpg",
        link: "https://alpinejs.dev",
      },
    ],
    level: 2,
    parentKey: ENUM_NAV_TYPE.JS_TOOLS,
  },
  {
    key: "video",
    label: "音视频",
    icon: <PlaySquareOutlined />,
    items: [
      {
        key: "Video.js",
        label: "Video.js",
        description: "一款专为 HTML5 世界打造的网络视频播放器。",
        icon: "/favicon.ico",
        link: "https://videojs.com",
      },
      {
        key: "xgplayer",
        label: "xgplayer",
        description: "一款带解析器、能节省流量的HTML5视频播放器",
        icon: "https://lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/favicon.ico",
        link: "https://h5player.bytedance.com",
      },
      {
        key: "Web RTC",
        label: "Web RTC",
        description:
          "为应用添加基于开放标准运行的实时通信功能。它支持在对等设备之间发送视频、语音和通用数据，使开发者能够构建强大的语音和视频通信解决方案。",
        icon: "https://www.gstatic.com/devrel-devsite/prod/v33c98f032862492e9ba9b5c082012b3acefe2c8157ae3b581c045ee1ec32bff0/webrtc/images/favicon.png",
        link: "https://webrtc.org/?hl=zh-cn",
      },
    ],
    level: 2,
    parentKey: ENUM_NAV_TYPE.JS_TOOLS,
  },
  {
    key: "editor",
    label: "编辑器",
    icon: <FontSizeOutlined />,
    items: [
      {
        key: "monaco-editor",
        label: "monaco-editor",
        description:
          "Monaco Editor 是VS Code的代码编辑器。这里有一个描述代码编辑器功能的页面。它根据 MIT 许可证获得许可，并支持 Edge、Chrome、Firefox、Safari 和 Opera。Monaco 编辑器不支持移动浏览器或移动 Web 框架。",
        icon: "/9a60a3b3c5fcf6a9d2de2c28e5eaa986.svg",
        link: "https://microsoft.github.io/monaco-editor",
      },
      {
        key: "ace",
        label: "ace",
        description:
          "Ace 是一个用 JavaScript 编写的嵌入式代码编辑器。它与 Sublime、Vim 和 TextMate 等本机编辑器的功能和性能相匹配。它可以轻松嵌入到任何网页和 JavaScript 应用程序中。 Ace 被保留为 Cloud9 IDE 的主要编辑器，并且是 Mozilla Skywriter (Bespin) 项目的继承者。",
        icon: "/doc/site/images/ace-tab.png",
        link: "https://ace.c9.io",
      },
      {
        key: "CodeMirror",
        label: "CodeMirror",
        description:
          "CodeMirror 是一款网页代码编辑器组件，可用于网站实现文本输入框，支持多种编辑功能，并具有丰富的编程接口，可进行进一步扩展。",
        icon: "/style/logo.svg",
        link: "https://codemirror.net",
      },
      {
        key: "Quill",
        label: "Quill",
        description: "您的强大的富文本编辑器",
        icon: "/assets/images/favicon.ico",
        link: "https://quilljs.com",
      },
    ],
    level: 2,
    parentKey: ENUM_NAV_TYPE.JS_TOOLS,
  },
  {
    key: "package",
    label: "包管理器",
    icon: <FolderOutlined />,
    items: [
      {
        key: "npm",
        label: "npm",
        description: "官方包管理工具",
        icon: "https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png",
        link: "https://www.npmjs.com/",
      },
      {
        key: "yarn",
        label: "yarn",
        description:
          "Yarn 是第一个专门围绕工作区构建的包管理器，它可以让您将项目拆分为子组件。",
        icon: "/img/yarn-favicon.svg",
        link: "https://yarnpkg.com/",
      },
      {
        key: "pnpm",
        label: "pnpm",
        description: "快速、节省磁盘空间的包管理器",
        icon: "/img/pnpm-no-name-with-frame.svg",
        link: "https://pnpm.io/",
      },
    ],
    level: 1,
  },
  {
    key: "build",
    label: "构建工具",
    icon: <BuildOutlined />,
    items: [
      {
        key: "webpack",
        label: "webpack",
        description: "一个用于现代 JavaScript 应用程序的 静态模块打包工具",
        icon: "/icon_192x192.png",
        link: "https://webpack.docschina.org",
      },
      {
        key: "vite",
        label: "vite",
        description: "下一代的前端工具链为开发提供极速响应",
        icon: "/logo.svg",
        link: "https://vitejs.dev",
      },
      {
        key: "rollup",
        label: "Rollup",
        description: "JavaScript模块打包器",
        icon: "/favicon.png",
        link: "https://rollupjs.org",
      },
      {
        key: "parcel",
        label: "Parcel",
        description: "零配置构建工具",
        icon: "/favicon.fe6f9d11.ico",
        link: "https://parceljs.org",
      },
    ],
    level: 1,
  },
  {
    key: "visualization",
    label: "可视化",
    icon: <BarChartOutlined />,
    items: [
      {
        key: "echarts",
        label: "ECharts",
        description: "一个基于 JavaScript 的开源可视化图表库",
        icon: "/images/favicon.png",
        link: "https://echarts.apache.org/zh",
      },
      {
        key: "d3",
        label: "D3",
        description: "是一个用于根据数据操作文档的 JavaScript 库",
        icon: "/logo.svg",
        link: "https://d3js.org",
      },
      {
        key: "AntV",
        label: "AntV",
        description: "蚂蚁集团全新一代数据可视化解决方案",
        icon: "https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*A-lcQbVTpjwAAAAAAAAAAAAADmJ7AQ/original",
        link: "https://antv.vision",
      },
      {
        key: "threejs",
        label: "Three.js",
        description: "JavaScript 3D Library",
        icon: "/files/favicon.ico",
        link: "https://threejs.org",
      },
    ],
    level: 1,
  },
  {
    key: "device",
    label: "跨端",
    icon: <AndroidOutlined />,
    items: [
      {
        key: "H5 hybrid 方案",
        label: "H5 hybrid",
        description:
          "渲染：WebView，逻辑：JS Engine，底层能力：JSBridge + 原生能力",
        icon: "#",
        link: "#",
      },
      {
        key: "RN",
        label: "React Native",
        description: "使用 React 为 Android、iOS 等创建原生应用",
        icon: "/img/favicon.ico",
        link: "https://reactnative.dev",
      },
      {
        key: "flutter",
        label: "Flutter",
        description: "自渲染引擎，构建Native应用",
        icon: "https://storage.googleapis.com/cms-storage-bucket/4fd0db61df0567c0f352.png",
        link: "https://flutter.dev",
      },
      {
        key: "taro",
        label: "Taro",
        description: "一个开放式跨端跨框架解决方案",
        icon: "/img/taro-logo_180.png",
        link: "https://docs.taro.zone",
      },
      {
        key: "uni-app",
        label: "uni-app",
        description: "一个使用 Vue.js 开发所有前端应用的框架",
        icon: "https://web-assets.dcloud.net.cn/unidoc/zh/icon.png",
        link: "https://uniapp.dcloud.net.cn",
      },
    ],
    level: 1,
  },
];

export default linkItems;
