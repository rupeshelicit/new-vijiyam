import React, { useState } from "react";
import { Table } from "antd";
import {
  TableContainer,
  Tabletitle,
} from "styles/components/common/TableComponent";

const TableComponent = ({
  title,
  columns,
  data,
  rowSelection,
  setCurrentPage,
}) => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination?.current);
    setTableParams({
      pagination,
      filters,
      sorter,
    });
  };
  return (
    <>
      <TableContainer>
        <Tabletitle className="mb-4">{title}</Tabletitle>
        {data.length >= 1 ? (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
          />
        ) : (
          <p className="text-center text-[30px] font-bold">
            No record available !
          </p>
        )}
      </TableContainer>
    </>
  );
};
export default TableComponent;
