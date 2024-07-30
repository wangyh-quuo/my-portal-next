import React, { useEffect, useState } from "react";
import NavMenu from "@/components/NavMenu";
import Instrument from "@/components/instrument";
import instrumentMenus from "@/components/data/instrumentMenu";

const Page: React.FC<any> = () => {
  const [componentName, setComponent] = useState<string>("");

  const onSelect = (info: any) => {
    setComponent(info.key);
  };

  const defaultComponentName = instrumentMenus[0].children[0].key;

  useEffect(() => {
    if (!componentName) {
      setComponent(defaultComponentName);
    }
  }, []);

  return (
    <div className="flex">
      <NavMenu
        items={instrumentMenus}
        onSelect={onSelect}
        defaultSelectKeys={[defaultComponentName]}
      ></NavMenu>
      <Instrument componentName={componentName} />
    </div>
  );
};

export default Page;
