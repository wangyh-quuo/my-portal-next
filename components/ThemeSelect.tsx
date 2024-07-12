import React, { MouseEventHandler, useEffect, useState } from "react";
import SystemSvg from "../images/svg/system.svg";
import SunSvg from "../images/svg/sun.svg";
import MoonSvg from "../images/svg/moon.svg";
import Icon from "@ant-design/icons";

import classNames from "classnames";
import type { ThemeState } from "@/layouts/Layout";

const ThemeSelect: React.FC<{
  value: string;
  onChange: (value: ThemeState) => void;
}> = ({ value, onChange }) => {
  const themeList: {
    key: string;
    value: ThemeState;
    icon: any;
    label: string;
  }[] = [
    { key: "light", value: "light", icon: SunSvg, label: "明亮主题" },
    { key: "dark", value: "dark", icon: MoonSvg, label: "黑暗主题" },
    { key: "system", value: "system", icon: SystemSvg, label: "跟随系统" },
  ];

  const [visible, setVisible] = useState(false);

  const hidden = () => {
    setVisible(false);
  };

  const onClick: MouseEventHandler = (e) => {
    setVisible(!visible);
    e.stopPropagation();
  };

  const getNavThemeIcon = () => {
    return themeList.find((item) => item.value === value)?.icon;
  };

  useEffect(() => {
    document.addEventListener("click", hidden);
    return () => {
      document.removeEventListener("click", hidden);
    };
  }, []);

  return (
    <div className="relative w-10 h-10">
      <button
        type="button"
        className="flex justify-center items-center relative w-full h-full rounded-full text-gray-900"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        onClick={onClick}
        title="切换主题"
      >
        <Icon
          component={getNavThemeIcon()}
          className="text-xl leading-none text-sky-500"
        />
        {MoonSvg.src}
      </button>

      <ul
        className={classNames(
          "absolute right-0 z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-slate-800",
          visible ? "block" : "hidden"
        )}
        tabIndex={-1}
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        {themeList.map((item) => (
          <li
            key={item.key}
            className={classNames(
              "relative cursor-pointer select-none py-1 pl-2 pr-9 text-gray-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600",
              {
                "text-sky-500 dark:text-sky-500": value === item.value,
              }
            )}
            id="listbox-option-0"
            role="option"
            onClick={() => onChange(item.value)}
          >
            <div className="inline-flex items-center whitespace-nowrap mr-2">
              <Icon component={item.icon} className="text-xl leading-none" />
              <span className="ml-2 leading-none">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ThemeSelect;
