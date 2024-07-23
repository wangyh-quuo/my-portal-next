import { useEffect, useRef } from "react";

const useWindowSize = (
  callback: (size: { width: number; height: number }) => void
) => {
  const ref = useRef({
    width: Number.MAX_SAFE_INTEGER,
    height: Number.MAX_SAFE_INTEGER,
  });

  const update = () => {
    ref.current = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
    callback(ref.current);
  };

  useEffect(() => {
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  });
  return ref;
};

export default useWindowSize;
