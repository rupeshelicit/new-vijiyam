import React, { useState, memo } from "react";
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
  tableParams,
  handleTableChange,
  loading
}) => {
  return (
    <>
      <TableContainer>
        <Tabletitle className="mb-4">{title}</Tabletitle>
        {data.length >= 1 ? (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={{
              current: tableParams?.current,
              pageSize: tableParams?.pageSize,
              total: tableParams?.total,
            }}
            onChange={handleTableChange}
            loading={loading}
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
export default memo(TableComponent);
