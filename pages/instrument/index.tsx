import React, { useEffect, useState } from "react";
import NavMenu from "@/components/NavMenu";
import Instrument from "@/components/instrument";

const Page: React.FC<any> = () => {
  const items = [
    {
      key: "converter",
      label: "转化器",
      children: [
        {
          key: "date-time-converter",
          label: "日期时间转化器",
        },
      ],
    },
  ];

  const [componentName, setComponent] = useState<string>("");

  const onSelect = (info: any) => {
    setComponent(info.key);
  };

  const defaultComponentName = items[0].children[0].key;

  useEffect(() => {
    if (!componentName) {
      setComponent(defaultComponentName);
    }
  }, []);

  return (
    <div className="flex">
      <NavMenu
        items={items}
        onSelect={onSelect}
        defaultSelectKeys={[defaultComponentName]}
      ></NavMenu>
      <Instrument componentName={componentName} />
    </div>
  );
};

export default Page;
