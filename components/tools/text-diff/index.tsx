import { Card } from "antd";

import EditorDiff from "@/components/editor/editor-diff";
import UtilsLayout from "../Layout";

const TextDiff = () => {
  return (
    <UtilsLayout
      title="文本对比"
      description="比较两个文本并查看它们之间的差异"
    >
      <Card>
        <EditorDiff
          original="原文本内容"
          modified="修改后的文本内容"
          language="txt"
        />
      </Card>
    </UtilsLayout>
  );
};

export default TextDiff;
