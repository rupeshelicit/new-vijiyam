export const KarykartaExcelColumns = [
  {
    title: "name",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
    align: "center",
  },
];

export const KarykartaExcelDataColumns = [

  {
    title: "Active User",
    dataIndex: "isPermission",
    key: "isPermission",
    align: "center",
    render: (text, record) => (
      <SwitchComponent
        switchStates={accountStatus}
        setSwitchStates={setAccountStatus}
        record={record}
      />
    ),
  },

  {
    title: "User Permissions",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (text, record) =>
      record.status === true ? (
        <Button
          disabled={true}
          className="items-center px-[30px] text-[11px] py-[15px] rounded-[40px] text-[#54408C] text-[12px] font-medium bg-[#54408C66] border-[none]"
        >
          <b className="h-[8px] w-[8px] bg-[#14BA6D] rounded-[50px]"></b> Active
        </Button>
      ) : (
        <Button
          disabled={true}
          className="font-medium text-[11px] bg-[#F2F4F7] border-[#F2F4F7] text-[#364254] rounded-[40px]"
        >
          <b className="h-[8px] w-[8px] bg-[#6C778B] rounded-[50px]"></b>{" "}
          Inactive
        </Button>
      ),
    width: 120,
  },
  {
    title: "Voter Id",
    dataIndex: "voterId",
    key: "voterId",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.voterId.localeCompare(b.voterId),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Father Name",
    dataIndex: "fatherName",
    key: "fatherName",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.fatherName.localeCompare(b.fatherName),
  },
  {
    title: "Date Of Birth",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.dateOfBirth.localeCompare(b.dateOfBirth),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.mobileNumber.localeCompare(b.mobileNumber),
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.gender.localeCompare(b.gender),
  },
  {
    title: "Caste",
    dataIndex: "caste",
    key: "caste",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.caste.localeCompare(b.caste),
  },
  {
    title: "State Name",
    dataIndex: "state",
    key: "state",
    align: "center",
    render: (_, record) => record?.state?.name || "NA",
    sorter: (a, b) => a.state.localeCompare(b.state),
  },
  {
    title: "District",
    dataIndex: "district",
    key: "district",
    align: "center",
    render: (_, record) => record?.district?.name || "NA",
    sorter: (a, b) => a.district.localeCompare(b.district),
  },
  {
    title: "Nigam Ward Number",
    dataIndex: "nigamWardNumber",
    key: "nigamWardNumber",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.nigamWardNumber.localeCompare(b.nigamWardNumber),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.age.localeCompare(b.age),
  },
  {
    title: "Nigam ward",
    dataIndex: "section",
    key: "section",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.section.localeCompare(b.section),
  },
  {
    title: "designation",
    dataIndex: "designation",
    key: "designation",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.designation.localeCompare(b.designation),
  },
  {
    title: "Party",
    dataIndex: "party",
    key: "party",
    align: "center",
    render: (_, record) => record?.party?.name || "NA",
    sorter: (a, b) => a.party.localeCompare(b.party),
    },
    {
        title: "Client Name",
        dataIndex: "createdBy",
        key: "createdBy",
        align: "center",
        render: (_, record) => record?.createdBy?.name || "NA",
        sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
      },
  {
    title: "Vidhansabha",
    dataIndex: "vidhansabha",
    key: "vidhansabha",
    align: "center",
    render: (_, record) => record?.vidhansabha?.name || "NA",
    sorter: (a, b) => a.vidhansabha.localeCompare(b.vidhansabha),
  },
  {
    title: "Loksabha",
    dataIndex: "loksabha",
    key: "loksabha",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.loksabha.localeCompare(b.loksabha),
  },

  {
    title: "House No",
    dataIndex: "houseNo",
    key: "houseNo",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => parseInt(a.houseNo) - parseInt(b.houseNo),
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    align: "center",
    render: (record) => (record ? record : "NA"),

    sorter: (a, b) => a.city.localeCompare(b.city),
  },

  {
    title: "Address",
    dataIndex: "newAddress",
    key: "newAddress",
    align: "center",
    render: (record) => (record ? record : "NA"),
    sorter: (a, b) => a.newAddress.localeCompare(b.newAddress),
  },

  {
    title: "Create Date",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    render: (record) => new Date(record ? record : "NA").toLocaleDateString(),
    sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
  },
  {
    title: "Update Date",
    dataIndex: "updatedAt",
    key: "updatedAt",
    align: "center",
    render: (record) => new Date(record ? record : "NA").toLocaleDateString(),
    sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
  },
 
];
