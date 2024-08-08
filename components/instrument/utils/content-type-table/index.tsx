import React, { useState } from "react";
import { Input, Table } from "antd";
import UtilsLayout from "../Layout";
import { contentTypeTableDataSource } from "./data";
import useStaticTable from "@/components/hooks/useStaticTable";

const HttpStatusTable = () => {
  const [searchData, setSearchData] = useState(contentTypeTableDataSource);
  const [tableProps] = useStaticTable(searchData);
  const onSearch = (value: string) => {
    setSearchData(
      contentTypeTableDataSource.filter(
        (item, index) =>
          index === 0 ||
          item.column0.includes(value) ||
          item.column1.includes(value) ||
          item.column2.includes(value) ||
          item.column3.includes(value)
      )
    );
  };
  return (
    <UtilsLayout
      title="HTTP Content-Type"
      description="Content-Type(Mime-Type)列表，包含名称、扩展名。"
    >
      <Input.Search
        className="mb-4 mx-auto block sm:w-[50%]"
        onSearch={onSearch}
        placeholder="搜索Content-Type(Mime-Type)"
      />
      <Table {...tableProps} />
    </UtilsLayout>
  );
};

export default HttpStatusTable;
