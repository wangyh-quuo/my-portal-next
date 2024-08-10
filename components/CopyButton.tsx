import { Button, ButtonProps, message } from "antd";
import React, { useEffect, useRef } from "react";
import Clipboard from "clipboard";
import { CopyOutlined } from "@ant-design/icons";

interface CopyButtonProps {
  value?: string;
  buttonProps?: ButtonProps;
  options?: ClipboardJS.Options;
  children?: React.ReactNode;
}

const CopyButton: React.FC<CopyButtonProps> = (props) => {
  const copyBtn = useRef<HTMLButtonElement>(null);
  const clipboard = useRef<ClipboardJS>();
  const isDisabled = props.options?.text ? false : !props.value;

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
      title="复制"
      type="primary"
      data-clipboard-text={props.value}
      disabled={isDisabled}
      {...props.buttonProps}
    >
      {props.children ?? "复制结果"}
    </Button>
  );
};

// input 复制
export const InputCopy = (props: CopyButtonProps) => (
  <CopyButton
    buttonProps={{
      type: "text",
      size: "small",
      icon: <CopyOutlined />,
      ...props?.buttonProps,
    }}
    value={props.value}
    options={props.options}
  >
    {''}
  </CopyButton>
);

export default CopyButton;
