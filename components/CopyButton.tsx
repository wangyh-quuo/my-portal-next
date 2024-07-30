import { Button, ButtonProps, message } from "antd";
import React, { useRef } from "react";
import Clipboard from "clipboard";

interface CopyButtonProps {
  value: string;
  buttonProps?: ButtonProps;
}

const CopyButton: React.FC<CopyButtonProps> = (props) => {
  const copyBtn = useRef<HTMLButtonElement>(null);

  const copyResult = () => {
    const clipboard = new Clipboard(copyBtn.current!);
    clipboard.on("success", () => {
      message.success("复制成功");
      clipboard.destroy();
    });
  };
  return (
    <Button
      ref={copyBtn}
      type="primary"
      data-clipboard-text={props.value}
      onClick={copyResult}
      disabled={!props.value}
      {...props.buttonProps}
    >
      复制结果
    </Button>
  );
};

export default CopyButton;
