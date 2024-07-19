import Head from "next/head";
import NavItemCard, { INavItems } from "@/components/NavItemCard";
import NavMenu from "@/components/NavMenu";
import { AppstoreOutlined } from "@ant-design/icons";
import { MutableRefObject, useRef } from "react";

// 枚举 - 菜单栏一级类别
enum ENUM_NAV_TYPE {
  JS_FRAMEWORK = "js-framework",
  JS_TOOLS = "js-tools",
}

const rootNavMap: Record<string, { label: string }> = {
  "js-framework": { label: "客户端框架" },
  "js-tools": { label: "js工具" },
};

const navItems: INavItems[] = [
  {
    key: "常用工具",
    label: "常用工具",
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
    key: "package",
    label: "包管理器",
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
        icon: "/favicon.png",
        link: "https://d3js.org",
      },
      {
        key: "AntV",
        label: "AntV",
        description: "蚂蚁集团全新一代数据可视化解决方案",
        icon: "/favicon-32x32.png",
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
        icon: "/img/taroLogo180.png",
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

const useMenuProps = (
  list: INavItems[],
  target: MutableRefObject<Record<string, HTMLDivElement | null>>
) => {
  const menuObj = list.reduce<Record<string, any>>((prev, cur) => {
    if (!cur.level) {
      return prev;
    }
    // 第一层级
    if (cur.level === 1) {
      prev[cur.key] = {
        key: cur.key,
        icon: <AppstoreOutlined />,
        label: cur.label,
      };
      return prev;
    }
    if (cur.parentKey) {
      // 第二层级
      if (!Object.hasOwn(prev, cur.parentKey)) {
        prev[cur.parentKey] = {
          key: cur.parentKey,
          icon: <AppstoreOutlined />,
          label: rootNavMap?.[cur.parentKey]?.label,
          children: [],
        };
      }
      prev[cur.parentKey].children.push({
        key: cur.key,
        icon: <AppstoreOutlined />,
        label: cur.label,
      });
    }
    return prev;
  }, {});

  const items = Object.values(menuObj);

  const onSelect = (info: any) => {
    const key = info.key;
    console.log(key);
    document.documentElement.scrollTo({
      top: (target.current[key]?.offsetTop as number) - 56,
      behavior: "smooth",
    });
  };

  return {
    items,
    onSelect,
  };
};

export default function Home() {
  const ref = useRef<Record<string, HTMLDivElement | null>>({});
  const menuProps = useMenuProps(navItems, ref);

  return (
    <div className="flex">
      <Head>
        <title>前端开发工具与资源导航站</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="og:title" content="前端开发工具与资源导航站" />
        <meta
          name="description"
          content="探索最全面的前端开发工具与资源导航站！我们精心搜集并分类整理了最新的前端框架、库、插件、设计工具、代码片段以及教程指南，助力每一位前端开发者高效学习、快速开发。无论您是初学者还是资深专家，都能在这里找到提升技能的宝藏。立即访问，开启您的高效前端开发之旅！"
        />
        <meta
          property="og:description"
          content="探索最全面的前端开发工具与资源导航站！我们精心搜集并分类整理了最新的前端框架、库、插件、设计工具、代码片段以及教程指南，助力每一位前端开发者高效学习、快速开发。无论您是初学者还是资深专家，都能在这里找到提升技能的宝藏。立即访问，开启您的高效前端开发之旅！"
        />
      </Head>
      <NavMenu {...menuProps}></NavMenu>
      <div className="px-1 flex-1">
        {navItems.map((menu) => (
          <div
            key={menu.key}
            ref={(e) => {
              ref.current[menu.key] = e;
            }}
          >
            <h2 className="p-2 border-b font-bold text-lg dark:text-slate-200 dark:border-b-slate-50/30">
              {menu.label}
            </h2>
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3 xl:grid-cols-4 mt-3">
              {menu.items.map((item) => (
                <NavItemCard navItem={item} key={item.key} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
