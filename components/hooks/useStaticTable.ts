import { ColumnProps, TableProps } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";

const useStaticTable = <T extends Record<string, any>>(
  data: T[],
  defaultProps?: TableProps<T>
) => {
  const getColumn = useCallback<() => ColumnProps<T>[]>(() => {
    if (!data[0]) {
      return [];
    }
    return Object.entries(data[0]).map<ColumnProps<T>>(([key, value]) => ({
      title: value,
      dataIndex: key,
      onHeaderCell: () => ({
        style: {
          textWrap: "nowrap",
        },
      }),
    }));
  }, [data]);

  const getDataSource = useCallback(() => {
    return data.slice(1);
  }, [data]);

  const [tableProps, setTableProps] = useState<TableProps<T>>({
    rowKey: "column0",
    bordered: true,
    pagination: false,
    tableLayout: "auto",
    ...(defaultProps ?? {}),
  });

  useEffect(() => {
    setTableProps((v) => ({
      ...v,
      columns: getColumn(),
      dataSource: getDataSource(),
    }));
  }, [data]);

  return [tableProps, setTableProps];
};

export default useStaticTable;
