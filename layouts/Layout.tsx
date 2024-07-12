import React, { useState } from "react";
import { YuqueFilled } from "@ant-design/icons";
import ThemeSelect from "@/components/ThemeSelect";

export type ThemeState = "system" | "dark" | "light";

export const ThemeContext = React.createContext<ThemeState>("light");

interface LayoutProps {
  children: React.ReactNode;
}

const isClientSide = () => typeof window !== "undefined";
const isServerSide = () => typeof window === "undefined";

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

  const getThemeClassName = () => {
    if (theme === "system") {
      const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
      return isDarkTheme.matches ? "dark" : "light";
    }
    return theme;
  };

  const navItems = [
    {
      key: "index",
      label: "网址导航",
      link: "/",
    },
  ];

  return (
    <ThemeContext.Provider value={theme}>
      <div className={getThemeClassName()}>
        <main className="bg-white dark:bg-slate-900 min-h-[calc(100vh-0.25rem)]">
          <nav className="sticky z-50 top-1 bg-white dark:bg-slate-900">
            <div className="container mx-auto py-2 px-2 bg-blue-50 text-sm rounded-2xl dark:bg-slate-800 space-x-3 mb-1">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.link}
                  className="group relative inline-flex justify-center items-center px-2 py-0.5 bg-white rounded-md m-w-9 h-9 cursor-pointer"
                >
                  {item.label}
                  <span className="hidden group-hover:inline-block animate-bounce absolute -bottom-0 hover:inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
                </a>
              ))}
              <div className="float-right grid grid-cols-2 cursor-pointer">
                <ThemeSelect value={theme} onChange={onThemeChange} />
                <a
                  href="https://www.yuque.com/wangyh-ocrqv"
                  target="_blank"
                  className="flex justify-center items-center"
                  title="语雀主页"
                >
                  <YuqueFilled className="text-green-300 bg-green-100/50 p-2 rounded-full" />
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
    </ThemeContext.Provider>
  );
};

export default Layout;
