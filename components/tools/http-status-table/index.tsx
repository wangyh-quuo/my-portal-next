import React, { useState } from "react";
import { Input, Table } from "antd";
import UtilsLayout from "../Layout";
import { httpStatusTableDataSource } from "./data";
import useStaticTable from "@/components/hooks/useStaticTable";

const HttpStatusTable = () => {
  const [searchData, setSearchData] = useState(httpStatusTableDataSource);
  const [tableProps] = useStaticTable(searchData);
  const onSearch = (value: string) => {
    setSearchData(
      httpStatusTableDataSource.filter(
        (item, index) => index === 0 || item.column0.includes(value)
      )
    );
  };
  return (
    <UtilsLayout
      title="HTTP状态码"
      description="所有HTTP状态的列表对其名称和含义解释。"
    >
      <Input.Search
        className="mb-4 mx-auto block sm:w-[50%]"
        onSearch={onSearch}
        placeholder="搜索状态码"
      />
      <Table {...tableProps} />
    </UtilsLayout>
  );
};

export default HttpStatusTable;
