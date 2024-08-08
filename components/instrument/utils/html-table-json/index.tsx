import React, { useLayoutEffect, useRef, useState } from "react";
import UtilsLayout from "../Layout";
import { Card, message } from "antd";
import Editor from "@/components/editor";
import styles from "./index.module.scss";
import CopyButton from "@/components/CopyButton";

const HtmlTableJson = () => {
  const defaultValue = `<table>
  <tr>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
  </tr>
  <tr>
    <td>John Brown</td>
    <td>32</td>
    <td>New York No. 1 Lake Park</td>
    <td>NICE,DEVELOPER</td>
  </tr>
  <tr>
    <td>Jim Green</td>
    <td>42</td>
    <td>London No. 1 Lake Park</td>
    <td>LOSER</td>
  </tr>
  <tr>
    <td>Joe Black</td>
    <td>32</td>
    <td>Sydney No. 1 Lake Park</td>
    <td>COOL,TEACHER</td>
  </tr>
</table>
  `;
  const [innerHtml, setInnerHtml] = useState(defaultValue);
  const [data, setData] = useState<Array<Record<string, any>>>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  const onValueChange = (v: string) => {
    setInnerHtml(v);
  };

  const parseTableData = () => {
    const table = tableRef.current?.querySelector("table");
    if (!table) {
      message.error('未检测到表格!')
      return;
    }
    const tableData: Record<string, any>[] = [];
    for (let i = 0; i < table.rows.length; i++) {
      const rowData = table.rows[i];
      for (let j = 0; j < rowData.cells.length; j++) {
        const cellData = rowData.cells[j];
        if (!tableData[i]) {
          tableData[i] = {};
        }
        tableData[i][`column${j}`] = cellData.innerHTML;
      }
    }
    setData(tableData);
  };

  useLayoutEffect(() => {
    parseTableData();
  }, [innerHtml]);

  return (
    <UtilsLayout
      title="提取html表格中的数据"
      description="从HTML中读取表格单元格的数据，数据转换成JSON格式"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card title="html">
          <Editor
            value={defaultValue}
            onValueChange={onValueChange}
            language="html"
            placeholder="输入table html ..."
          />
        </Card>
        <Card
          title="表格数据"
          extra={<CopyButton value={JSON.stringify(data, null, 2)} />}
        >
          <Editor
            language="json"
            placeholder="等待输出结果..."
            value={JSON.stringify(data, null, 2)}
            options={{ readOnly: true }}
          />
        </Card>
      </div>
      <Card title="表格预览" className="mt-4">
        <div
          ref={tableRef}
          className={styles.table}
          dangerouslySetInnerHTML={{ __html: innerHtml }}
        ></div>
      </Card>
    </UtilsLayout>
  );
};

export default HtmlTableJson;
