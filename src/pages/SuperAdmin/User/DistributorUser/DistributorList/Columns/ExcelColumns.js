 const ExcelColumns = [
  {
    title: "Active User",
    dataIndex: "isPermission",
    key: "isPermission",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },

  {
    title: "User Permissions",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (text, record) => (record.status === true ? "Active" : "InActive"),
  },
  {
    title: "Voter Id",
    dataIndex: "voterId",
    key: "voterId",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },
  {
    title: "Father Name",
    dataIndex: "fatherName",
    key: "fatherName",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },
  {
    title: "Date Of Birth",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
    align: "center",
    render: (record) => new Date(record ? record : "NA").toLocaleDateString(),
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },

  {
    title: "State Name",
    dataIndex: "state",
    key: "state",
    align: "center",
    render: (record) => (record ? record?.name : "NA"),
  },

  {
    title: "District",
    dataIndex: "district",
    key: "district",
    align: "center",
    render: (record) => (record ? record?.name : "NA"),
  },
  {
    title: "Vidhansabha",
    dataIndex: "vidhansabha",
    key: "vidhansabha",
    align: "center",
    render: (record) => (record ? record?.name : "NA"),
  },
  {
    title: "Loksabha",
    dataIndex: "loksabha",
    key: "loksabha",
    align: "center",
    render: (record) => (record ? record?.name : "NA"),
  },

  {
    title: "Nigam Ward Number",
    dataIndex: "nigamWardNumber",
    key: "nigamWardNumber",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },

  {
    title: "Caste",
    dataIndex: "caste",
    key: "caste",
    align: "center",
    render: (record) => (record ? record?.name : "NA"),
  },

  {
    title: "House No",
    dataIndex: "houseNo",
    key: "houseNo",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },

  {
    title: "LokSabha",
    dataIndex: "loksabha",
    key: "loksabha",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },

  {
    title: "Address",
    dataIndex: "newAddress",
    key: "newAddress",
    align: "center",
    render: (record) => (record ? record : "NA"),
  },

  {
    title: "Create Date",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    render: (record) => new Date(record ? record : "NA").toLocaleDateString(),
  },
  {
    title: "Update Date",
    dataIndex: "updatedAt",
    key: "updatedAt",
    align: "center",
    render: (record) => new Date(record ? record : "NA").toLocaleDateString(),
  },
];

export default ExcelColumns