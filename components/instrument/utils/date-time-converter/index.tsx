import React, { useEffect, useState } from "react";
import { Form, Input, Select, Table, TableColumnType, message } from "antd";
import dayjs from "dayjs";
import Clipboard from "clipboard";

type DateTime = string | number | dayjs.Dayjs | Date | null | undefined;

const datetimeHandler = {
  JS_locale: {
    label: "JS locale date string",
    handler: (time: DateTime) => {
      return dayjs(time).format("ddd MMM DD YYYY HH:mm:ss [GMT] ZZ");
    },
  },
  ISO8601: {
    label: "ISO8601",
    handler: (time: DateTime) => dayjs(time).format(),
  },
  UTC_format: {
    label: "UTC format(世界标准时间格式)",
    handler: (time: DateTime) => dayjs(time).toString(),
  },
  timestamp: {
    label: "Unix 时间戳",
    handler: (time: DateTime) => dayjs(time).unix(),
  },
  timestamp_ms: {
    label: "Unix 时间戳 (毫秒)",
    handler: (time: DateTime) => dayjs(time).valueOf(),
  },
  format: {
    label: "YYYY-MM-DD HH:mm:ss",
    handler: (time: DateTime) => dayjs(time).format("YYYY-MM-DD HH:mm:ss"),
  },
};

const useOptions = () => {
  const selectOptions = [
    {
      label: "JS locale date string",
      value: "JS_locale",
    },
    {
      label: "ISO8601",
      value: "ISO8601",
    },
    {
      label: "timestamp",
      value: "timestamp",
    },
  ];

  const [datetimeType, setDatetimeType] = useState(selectOptions[0].value);

  return {
    selectOptions,
    datetimeType,
    setDatetimeType,
  };
};

const useResultTable = () => {
  const [dataSource, setDataSource] = useState<
    {
      datetimeType: string;
      value: string | number;
    }[]
  >();
  const columns: TableColumnType<any>[] = [
    {
      key: "datetimeType",
      dataIndex: "datetimeType",
      title: "日期类型",
      width: "100",
      align: "right",
      className: "font-bold",
    },
    {
      key: "value",
      dataIndex: "value",
      title: "值",
      width: "200",
      align: "left",
      className: "cursor-pointer",
      onCell(data, index) {
        return {
          onClick() {
            const clipboard = new Clipboard("td");
            clipboard.on("success", () => {
              message.success("复制成功");
              clipboard.destroy();
            });
          },
          "data-clipboard-text": data.value,
          title: "复制",
        };
      },
    },
  ];
  return {
    columns,
    dataSource,
    setDataSource,
  };
};

/**
 * date time converter
 * @returns
 */
const DateTimeConverter: React.FC = () => {
  const [form] = Form.useForm();

  const { selectOptions, datetimeType, setDatetimeType } = useOptions();

  const { columns, dataSource, setDataSource } = useResultTable();

  const onSelectChange = (value: string) => {
    setDatetimeType(value);
  };

  const updateDataSource = (datetime: DateTime) => {
    const res = Object.entries(datetimeHandler).map(([, value]) => {
      return {
        datetimeType: value.label,
        value: value.handler(datetime),
      };
    });

    setDataSource(res);
  };

  const onFormChange = () => {
    const { datetime } = form.getFieldsValue();
    // TODO: 校验 ...

    updateDataSource(datetime);
  };

  useEffect(() => {
    let timer = null;
    if (!form.getFieldValue("datetime")) {
      timer = setTimeout(() => {
        updateDataSource(dayjs());
      }, 1);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [dataSource]);

  return (
    <>
      <Form form={form} layout="inline" onChange={onFormChange}>
        <Form.Item label="日期时间" name="datetime">
          <Input
            placeholder="输入一个时间格式"
            addonAfter={
              <Select
                options={selectOptions}
                value={datetimeType}
                onChange={onSelectChange}
              ></Select>
            }
          />
        </Form.Item>
      </Form>
      {/* 结果 */}
      <Table
        showHeader={false}
        tableLayout="fixed"
        className="mt-4"
        columns={columns}
        dataSource={dataSource}
        rowKey="datetimeType"
        pagination={false}
      ></Table>
    </>
  );
};

export default DateTimeConverter;
