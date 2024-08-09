import React, { useEffect, useState } from "react";
import NavMenu from "@/components/NavMenu";
import Tools from "@/components/tools";
import toolsMenus from "@/components/data/toolsMenu";
import Head from "next/head";

const Page: React.FC<any> = () => {
  const [componentName, setComponent] = useState<string>("");

  const onSelect = (info: any) => {
    setComponent(info.key);
  };

  const defaultComponentName = toolsMenus[0].children[0].key;

  useEffect(() => {
    if (!componentName) {
      setComponent(defaultComponentName);
    }
  }, []);

  return (
    <div className="flex sm:flex-row flex-col">
      <Head>
        <title>前端开发工具与资源导航站</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="og:title" content="前端开发工具与资源导航站" />
        <meta
          name="description"
          content="为开发人员提供的方便的在线工具集合，具有出色的用户体验。 在线工具 是一个免费开源的方便在线工具集合，供开发人员和 IT 工作人员使用"
        />
        <meta
          property="og:description"
          content="为开发人员提供的方便的在线工具集合，具有出色的用户体验。 在线工具 是一个免费开源的方便在线工具集合，供开发人员和 IT 工作人员使用"
        />
      </Head>
      <NavMenu
        items={toolsMenus}
        onSelect={onSelect}
        defaultSelectKeys={[defaultComponentName]}
      ></NavMenu>
      <Tools componentName={componentName} />
    </div>
  );
};

export default Page;
