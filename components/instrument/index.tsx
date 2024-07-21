import React from "react";

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
      return null;
    } finally {
      console.log("render component", componentName);
    }
  };

  return <div className="flex-1 p-4 bg-slate-50">{renderComponent()}</div>;
};

export default Instrument;
