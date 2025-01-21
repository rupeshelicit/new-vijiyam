import { render } from "@testing-library/react";
import Actions from "components/common/Action";
import DeleteComponet from "components/common/Action/Delete";
import EditComponent from "components/common/Action/Edit";
import ViewComponent from "components/common/Action/View";

export const columns = [
  {
    title: "S.NO",
    dataIndex: "serialNumber",
    key: "serialNumber",
    align: "center",
    render: (text, record, index) => {
      return index + 1;
    },
  },
  {
    title: "Voter Id",
    dataIndex: "voterId",
    key: "voterId",
    align: "center",
    sorter: (a, b) => a.voterId.localeCompare(b.voterId),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "नाम",
    dataIndex: "hiName",
    key: "hiName",
    align: "center",
    sorter: (a, b) => a.hiName.localeCompare(b.hiName),
  },
  {
    title: "Father Name",
    dataIndex: "fatherName",
    key: "fatherName",
    align: "center",
    sorter: (a, b) => a.fatherName.localeCompare(b.fatherName),
  },
  {
    title: "पिता का नाम",
    dataIndex: "hiFatherName",
    key: "hiFatherName",
    align: "center",
    sorter: (a, b) => a.hiFatherName.localeCompare(b.hiFatherName),
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    align: "center",
    sorter: (a, b) => a.gender.localeCompare(b.gender),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    align: "center",
    sorter: (a, b) => a.gender.localeCompare(b.gender),
  },
  {
    title: "Caste Name",
    dataIndex: "caste.name",
    key: "caste",
    align: "center",
    sorter: (a, b) => a.caste.name.localeCompare(b.caste.name),
    render: (text, record) => record?.caste?.name,
  },
  {
    title: "जाति",
    dataIndex: "caste.hiName",
    key: "hiCasteName",
    align: "center",
    sorter: (a, b) => a.caste.hiName.localeCompare(b.caste.hiName),
    render: (text, record) => record?.caste?.hiName,
  },
  {
    title: "Religion Name",
    dataIndex: "religionId",
    key: "religion",
    align: "center",
    sorter: (a, b) => a.religionId.localeCompare(b.religionId),
  },
  {
    title: "धर्म",
    dataIndex: "hiReligionName",
    key: "hiReligionName",
    align: "center",
    sorter: (a, b) => a.hiReligionName.localeCompare(b.hiReligionName),
  },
  {
    title: "Nigam ward",
    dataIndex: "section",
    key: "section",
    align: "center",
    sorter: (a, b) => a.section.localeCompare(b.section),
  },
  {
    title: "निगम वार्ड",
    dataIndex: "hiSection",
    key: "hiSection",
    align: "center",
    sorter: (a, b) => a.hiSection.localeCompare(b.hiSection),
  },
  {
    title: "Booth No",
    dataIndex: "boothNo",
    key: "boothNo",
    align: "boothNo",
    sorter: (a, b) => a.booth.localeCompare(b.booth),
  },
  {
    title: "Booth",
    dataIndex: "booth",
    key: "booth",
    align: "center",
    sorter: (a, b) => a.booth.localeCompare(b.booth),
  },
  {
    title: "मतदान केंद्र",
    dataIndex: "hiBooth",
    key: "hiBooth",
    align: "center",
    sorter: (a, b) => a.hiBooth.localeCompare(b.hiBooth),
  },
  {
    title: "House No",
    dataIndex: "houseNo",
    key: "houseNo",
    align: "center",
    sorter: (a, b) => parseInt(a.houseNo) - parseInt(b.houseNo),
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    align: "center",
    sorter: (a, b) => a.city.localeCompare(b.city),
  },
  {
    title: "Vidhansabha",
    dataIndex: "vidhansabha",
    key: "vidhansabha",
    align: "center",
    sorter: (a, b) => a.vidhansabha.localeCompare(b.vidhansabha),
  },
  {
    title: "LokSabha",
    dataIndex: "loksabha",
    key: "loksabha",
    align: "center",
    sorter: (a, b) => a.loksabha.localeCompare(b.loksabha),
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
    align: "center",
    sorter: (a, b) => a.mobileNumber.localeCompare(b.mobileNumber),
  },
  {
    title: "Alternate Mobile Number",
    dataIndex: "alternateNumber",
    key: "alternateNumber",
    align: "center",
    sorter: (a, b) => a.alternateNumber.localeCompare(b.alternateNumber),
  },
  {
    title: "District",
    dataIndex: "district",
    key: "district",
    align: "center",
    sorter: (a, b) => a.district.localeCompare(b.district),
  },
  {
    title: "Address",
    dataIndex: "newAddress",
    key: "newAddress",
    align: "center",
    sorter: (a, b) => a.newAddress.localeCompare(b.newAddress),
  },
  {
    title: "पता",
    dataIndex: "hiNewAddress",
    key: "hiNewAddress",
    align: "center",
    sorter: (a, b) => a.hiNewAddress.localeCompare(b.hiNewAddress),
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
    render: (record) => new Date(record ? record : "NA").toLocaleDateString(),
    align: "center",
    sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    render: (text, record) => (
      <div className="flex gap-[10px]">
        <EditComponent record={record} roleType={"voter"} />
        <DeleteComponet record={record} roleType={"voter"} />
        <ViewComponent record={record} roleType={"voter"} />
      </div>
    ),
  },
];
