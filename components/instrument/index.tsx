import React from "react";

import { Empty } from "antd";

interface InstrumentProps {
  componentName: string;
}

const Instrument: React.FC<InstrumentProps> = (props) => {
  const { componentName } = props;
  const renderComponent = () => {
    try {
      const Comp = require(`./utils/${componentName}/index.tsx`).default;
      return <Comp />;
    } catch (error) {
      return (
        <Empty
          className="h-full flex flex-col justify-center"
          description="404"
        />
      );
    } finally {
      console.log("render component", componentName);
    }
  };

  return <div className="flex-1 p-4 bg-slate-50">{renderComponent()}</div>;
};

export default Instrument;
