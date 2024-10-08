import React, { useState } from "react";
import { GithubFilled, YuqueFilled } from "@ant-design/icons";
import ThemeSelect from "@/components/ThemeSelect";
import Link from "next/link";
import { ConfigProvider } from "antd";
import { darkThemeConfig } from "@/themes/antd-theme-config";
import ThemeContext, {
  type ThemeState,
  getThemeClassName,
} from "@/components/context/ThemeContext";
import { isClientSide } from "@/utils/env";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const defaultTheme = isClientSide()
    ? (localStorage.getItem("theme") as ThemeState) ?? "light"
    : "light";
  const [theme, setTheme] = useState<ThemeState>(
    ["light", "dark", "system"].includes(defaultTheme) ? defaultTheme : "light"
  );

  const onThemeChange = (value: ThemeState) => {
    localStorage.setItem("theme", value);
    setTheme(value);
  };

  const navItems = [
    {
      key: "index",
      label: "网址导航",
      link: "/",
    },
    {
      key: "tools",
      label: "IT工具",
      link: "/tools",
    },
  ];

  return (
    <ThemeContext.Provider value={theme}>
      <ConfigProvider
        theme={getThemeClassName(theme) == "dark" ? darkThemeConfig : {}}
      >
        <div className={getThemeClassName(theme)}>
          <main className="bg-white dark:bg-slate-900 min-h-screen">
            <nav className="sticky z-50 top-1 bg-white dark:bg-slate-900">
              <div className="container mx-auto py-2 px-2 bg-blue-50 text-sm rounded-2xl dark:bg-slate-800 space-x-3 mb-1">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.link}
                    className="group relative inline-flex justify-center items-center px-2 py-0.5 bg-white rounded-md m-w-9 h-9 cursor-pointer text-black dark:bg-slate-600 dark:text-slate-50"
                  >
                    {item.label}
                    <span className="hidden group-hover:inline-block animate-bounce absolute -bottom-0 hover:inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
                  </Link>
                ))}
                <div className="float-right grid grid-cols-3 cursor-pointer">
                  <ThemeSelect value={theme} onChange={onThemeChange} />
                  <a
                    href="https://www.yuque.com/wangyh-ocrqv"
                    target="_blank"
                    className="flex justify-center items-center"
                    title="语雀主页"
                  >
                    <YuqueFilled className="text-green-300 bg-green-100/50 p-2 rounded-full" />
                  </a>
                  <a
                    href="https://github.com/wangyh-quuo/my-portal-next"
                    target="_blank"
                    className="flex justify-center items-center"
                    title="github"
                  >
                    <GithubFilled className="bg-slate-200 p-2 rounded-full" />
                  </a>
                </div>
              </div>
            </nav>
            {props.children}
            <footer className="flex p-2 justify-center items-center text-slate-400 dark:text-slate-50/30">
              Copyright © {new Date().getFullYear()} WangYH.
            </footer>
          </main>
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default Layout;
