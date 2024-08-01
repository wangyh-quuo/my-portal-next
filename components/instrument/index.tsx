import React, { lazy, Suspense } from "react";

import { Empty, Spin } from "antd";

interface InstrumentProps {
  componentName: string;
}

const Instrument: React.FC<InstrumentProps> = (props) => {
  const { componentName } = props;

  const Comp = lazy(() =>
    import(`./utils/${componentName}/index.tsx`).catch((reason) => {
      return {
        default: () => (
          <Empty
            className="sm:h-full h-[calc(100vh-180px)] flex flex-col justify-center"
            description="404"
          />
        ),
      };
    })
  );

  return (
    <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Suspense
        fallback={
          <div className="flex flex-col w-full h-[calc(100vh-180px)] justify-center items-center">
            <Spin />
            <div className="text-sm pt-1 text-blue-400">加载中</div>
          </div>
        }
      >
        <Comp />
      </Suspense>
    </div>
  );
};

export default Instrument;
