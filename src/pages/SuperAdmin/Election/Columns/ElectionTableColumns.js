import React from "react";
import EditComponent from "components/common/Action/Edit";
import DeleteComponent from "components/common/Action/Delete";
import ViewComponent from "components/common/Action/View";

const ElectionTableColumns = [
  {
    title: "S.NO",
    dataIndex: "serialNumber",
    key: "serialNumber",
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Election Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => text || "NA",
  },
  {
    title: "Election Type",
    dataIndex: "electionType",
    key: "electionType",
    align: "center",
    sorter: (a, b) => a.electionType.localeCompare(b.electionType),
    render: (text) => text || "NA",
  },
  {
    title: "State Name",
    dataIndex: "state",
    key: "state",
    align: "center",
    sorter: (a, b) => a.state?.name.localeCompare(b.state?.name),
    render: (_, record) => record?.state?.name || "NA",
  },
  {
    title: "District",
    dataIndex: "district",
    key: "district",
    align: "center",
    sorter: (a, b) => a.district?.name.localeCompare(b.district?.name),
    render: (_, record) => record?.district?.name || "NA",
  },
  {
    title: "Vidhansabha",
    dataIndex: "vidhansabha",
    key: "vidhansabha",
    align: "center",
    sorter: (a, b) => a.vidhansabha?.localeCompare(b.vidhansabha),
    render: (_, record) => record?.vidhansabha?.name || "NA",
  },
  {
    title: "Achar Sanhita Date",
    dataIndex: "acharSanhitaDate",
    key: "acharSanhitaDate",
    align: "center",
    sorter: (a, b) => a.acharSanhitaDate.localeCompare(b.acharSanhitaDate),
    render: (date) => (date ? new Date(date).toLocaleDateString() : "NA"),
  },
  {
    title: "Election Date",
    dataIndex: "electionDate",
    key: "electionDate",
    align: "center",
    sorter: (a, b) => a.electionDate.localeCompare(b.electionDate),
    render: (date) => (date ? new Date(date).toLocaleDateString() : "NA"),
  },
  {
    title: "Create Date",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    render: (date) => (date ? new Date(date).toLocaleDateString() : "NA"),
  },
  {
    title: "Update Date",
    dataIndex: "updatedAt",
    key: "updatedAt",
    align: "center",
    sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
    render: (date) => (date ? new Date(date).toLocaleDateString() : "NA"),
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (_, record) => (
      <div className="flex gap-2">
        <EditComponent record={record} roleType={"election"} />
        <DeleteComponent
          record={record}
          roleType={"election"}
        />
        <ViewComponent record={record} roleType={"election"} />
      </div>
    ),
  },
];

export default ElectionTableColumns;
