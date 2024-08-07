import { Button, ButtonProps, message } from "antd";
import React, { useEffect, useRef } from "react";
import Clipboard from "clipboard";

interface CopyButtonProps {
  value?: string;
  buttonProps?: ButtonProps;
  options?: ClipboardJS.Options;
  children?: React.ReactNode;
}

const CopyButton: React.FC<CopyButtonProps> = (props) => {
  const copyBtn = useRef<HTMLButtonElement>(null);
  const clipboard = useRef<ClipboardJS>();

  useEffect(() => {
    if (copyBtn.current) {
      clipboard.current = new Clipboard(copyBtn.current, props.options);
      clipboard.current?.on("success", () => {
        message.success("复制成功");
      });
    }
    return () => {
      clipboard.current?.destroy();
    };
  }, [props.value]);
  return (
    <Button
      ref={copyBtn}
      type="primary"
      data-clipboard-text={props.value}
      disabled={!props.value}
      {...props.buttonProps}
    >
      {props.children ?? "复制结果"}
    </Button>
  );
};

export default CopyButton;
