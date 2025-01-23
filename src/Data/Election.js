import { render } from "@testing-library/react";

const ElectionExcelColum = [
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    align: "center",
    render: (record) => record?.state?.name,
  },
  {
    title: "District",
    dataIndex: "district",
    key: "district",
    align: "center",
    render: (record) => record?.state?.name,
  },

  {
    title: "Assembly Name",
    dataIndex: "vidhansabha",
    key: "vidhansabha",
    align: "center",
    render: (record) => record?.state?.name,
  },
  {
    title: "Election Type",
    dataIndex: "electionType",
    key: "electionType",
    align: "center",
  },

  {
    title: "Election Date	",
    dataIndex: "electionDate",
    key: "electionDate",
    align: "center",
  },
  {
    title: "AcharSanhita Date",
    dataIndex: "acharSanhitaDate",
    key: "acharSanhitaDate",
    align: "center",
  },
  {
    title: "Created Date",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
  },
  {
    title: "Updated Date",
    dataIndex: "updatedAt",
    key: "updatedAt",
    align: "center",
  },
];
export default ElectionExcelColum;
