import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Menu, type MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import useWindowSize from "./hooks/useWindowSize";

type MenuItem = Required<MenuProps>["items"][number];

interface INavMenuProp {
  onSelect: (info: any) => void;
  items: MenuItem[];
  defaultSelectKeys?: string[];
}

const NavMenu: React.FC<INavMenuProp> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const [selectedKeys, setSelectedKeys] = useState<string[]>();

  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    setStateOpenKeys(openKeys);
  };

  const findDefaultOpenKeys = (keys: string[]) => {
    const result: string[] = [];

    const find = (
      list: MenuItem[],
      val: string,
      parent: string[],
      res: string[]
    ) => {
      list.forEach((item: any) => {
        if (item && item.key === val) {
          res.push(...parent);
          return;
        }
        if (item && item.children?.length > 0) {
          find(item.children, val, [...parent, item.key as string], res);
        }
      });
    };

    find(props.items, keys[0], [], result);
    return result;
  };

  useEffect(() => {
    if (props.defaultSelectKeys && props.defaultSelectKeys.length) {
      setSelectedKeys(props.defaultSelectKeys);

      const keys = findDefaultOpenKeys(props.defaultSelectKeys);
      setStateOpenKeys(
        stateOpenKeys
          .filter((key) => keys.find((item) => item !== key))
          .concat(keys)
      );
    }
  }, [props.defaultSelectKeys]);

  const onSelect = (info: any) => {
    setSelectedKeys(info.selectedKeys);
    props?.onSelect?.(info);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useWindowSize(({ width }) => {
    if (width < 750) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  });

  return (
    <>
      <div className="hidden sm:inline-flex flex-col sticky top-14 -bottom-14 h-[calc(100vh-4rem)] z-[10]">
        <Menu
          mode="inline"
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          selectedKeys={selectedKeys}
          className="overflow-y-auto !border-e-0 bg-transparent"
          inlineCollapsed={collapsed}
          items={props.items}
          onSelect={onSelect}
        />
        <Button
          type="primary"
          onClick={toggleCollapsed}
          size="small"
          className="absolute bottom-0 left-4 hidden sm:inline-block"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      {/* mobile menu*/}
      <Menu
        mode="horizontal"
        selectedKeys={selectedKeys}
        className="sm:hidden"
        items={props.items}
        onSelect={onSelect}
      />
    </>
  );
};

export default NavMenu;
