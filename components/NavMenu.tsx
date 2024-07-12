import { ThemeContext } from "@/layouts/Layout";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Menu, type MenuProps } from "antd";
import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

interface INavMenuProp {
  onSelect: (info: any) => void;
  items: MenuItem[];
}

const NavMenu: React.FC<INavMenuProp> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const [selectedKeys, setSelectedKeys] = useState([]);

  const onSelect = (info: any) => {
    setSelectedKeys(info.selectedKeys);
    props?.onSelect?.(info);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const theme = useContext(ThemeContext);

  const getTheme = () => {
    if (theme === "system") {
      const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
      return isDarkTheme.matches ? "dark" : "light";
    }
    return theme;
  };

  return (
    <>
      <div className="flex flex-col fixed top-14 h-[calc(100vh-4rem)] z-[10]">
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          theme={getTheme()}
          className="h-[calc(100%-2rem)] overflow-y-auto !border-e-0"
          inlineCollapsed={collapsed}
          items={props.items}
          onSelect={onSelect}
        />
        <Button
          type="primary"
          onClick={toggleCollapsed}
          size="small"
          className="absolute bottom-0 left-4"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div
        className={classNames(
          " h-full border-r border-r-slate-100",
          collapsed ? "w-20" : "w-40"
        )}
      ></div>
    </>
  );
};

export default NavMenu;
