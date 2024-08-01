import { useEffect } from "react";

const useResizeObserver = (
  el: Element | null,
  callback: ResizeObserverCallback
) => {
  const observer = new ResizeObserver(callback);
  useEffect(() => {
    observer.observe(el!);
    return () => {
      observer.disconnect();
    };
  }, [el]);
};

export default useResizeObserver;
