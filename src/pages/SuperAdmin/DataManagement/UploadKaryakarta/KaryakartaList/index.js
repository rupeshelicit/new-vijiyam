import React, { useEffect, useMemo, useState } from "react";
import { Container } from "styles/components/common/Layout";
import { ManageDataContainer } from "styles/pages/ClientAdmin/ManageKaryakarta";
import VoterFilter from "components/common/FiltersComponent";
import PlusIcons from "assets/svg/plusIcons";
import SwitchComponent from "components/common/SwitchComponent";
import TableComponent from "components/common/Table";
import { Button } from "antd";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import ExportTable from "components/common/ExportDemoTablesDrawer";
import deleteIcon from "assets/svg/trans-icon.svg";
import useGet from "hooks/useGet";
import { GET_KARYKARTA_AUTHORIZED_USER_LIST } from "constants/api";
import EditComponent from "components/common/Action/Edit";
import DeleteComponet from "components/common/Action/Delete";
import ViewComponent from "components/common/Action/View";
import ExportToExcel from "components/common/ExportToExcel";
import AddNewKaryaKarta from "../AddNewKarykartaModal";
import ExcelIcons from "assets/svg/excelIcons";
const KaryaKartaList = () => {
  const [accountStatus, setAccountStatus] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [openExportDrawer, setOpeExportDrawer] = useState(false);
  const [kayrkartaData, setKayrkartaData] = useState([]);

  const { mutateAsync: GetKarykarta } = useGet();
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const handleSwitchChange = (checked, recordKey) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === recordKey ? { ...item, activeClient: checked } : item
      )
    );
  };

  console.log(accountStatus, "");
  const columns = [
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
            <b className="h-[8px] w-[8px] bg-[#14BA6D] rounded-[50px]"></b>{" "}
            Active
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
      dataIndex: "casteId",
      key: "casteId",
      align: "center",
      render: (record) => (record ? record : "NA"),
      sorter: (a, b) => a.casteId.localeCompare(b.casteId),
    },
    {
      title: "State Name",
      dataIndex: "stateId",
      key: "stateId",
      align: "center",
      render: (record) => (record ? record : "NA"),
      sorter: (a, b) => a.stateId.localeCompare(b.stateId),
    },
    {
      title: "District",
      dataIndex: "districtId",
      key: "districtId",
      align: "center",
      render: (record) => (record ? record : "NA"),
      sorter: (a, b) => a.districtId.localeCompare(b.districtId),
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
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      align: "center",
      render: (record) => (record ? record : "NA"),
      sorter: (a, b) => a.designation.localeCompare(b.designation),
    },
    {
      title: "Vidhansabha",
      dataIndex: "vidhansabhaId",
      key: "vidhansabhaId",
      align: "center",
      render: (record) => (record ? record : "NA"),
      sorter: (a, b) => a.vidhansabhaId.localeCompare(b.vidhansabhaId),
    },
    {
      title: "Loksabha",
      dataIndex: "loksabhaId",
      key: "loksabhaId",
      align: "center",
      render: (record) => (record ? record : "NA"),
      sorter: (a, b) => a.loksabhaId.localeCompare(b.loksabhaId),
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
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      title: "Vidhansabha",
      dataIndex: "vidhansabha",
      key: "vidhansabha",
      align: "center",
      render: (record) => (record ? record : "NA"),
      sorter: (a, b) => a.vidhansabha.localeCompare(b.vidhansabha),
    },
    {
      title: "LokSabha",
      dataIndex: "loksabha",
      key: "loksabha",
      align: "center",
      render: (record) => (record ? record : "NA"),
      sorter: (a, b) => a.loksabha.localeCompare(b.loksabha),
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
      title: "District",
      dataIndex: "district",
      key: "district",
      align: "center",
      render: (record) => (record ? record : "NA"),
      sorter: (a, b) => a.district.localeCompare(b.district),
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div className="flex gap-[10px]">
          <EditComponent record={record} roleType={"karyakarta"} />
          <DeleteComponet record={record} roleType={"karyakarta"} />
          <ViewComponent record={record} roleType={"karyakarta"} />
        </div>
      ),
    },
  ];

  const Democolumns = [
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

  useEffect(() => {
    GetKarykartaList();
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("Selected Row Keys:", selectedRowKeys);
      console.log("Selected Rows:", selectedRows);
    },
  };
  const handleAddNewKaryakarta = () => {
    setAddNew(true);
  };

  const handleExportDemoTable = () => {
    setOpeExportDrawer(true);
  };

  const GetKarykartaList = async (page, limit) => {
    const id = loginUsers.role;
    await GetKarykarta({
      url: `${
        GET_KARYKARTA_AUTHORIZED_USER_LIST + id
      }?page=${page}&limit=${limit}`,
      type: "details",
      token: true,
    })
      .then((res) => {
        if (res) {
          let newRes = [...kayrkartaData];
          newRes = newRes.concat(res?.items);
          setKayrkartaData(newRes);
        }
      })
      .catch((error) => console.log(error));
  };
  useMemo(() => {
    if (currentPage > prevPage) {
      GetKarykartaList(currentPage, 10);
      setPrevPage((prev) => prev + 1);
    }
  }, [currentPage]);
  return (
    <ManageDataContainer>
      <Container>
        <h3 className="text-[22px] font-semibold py-[20px]">Karyakarta List</h3>
        <div>
          <div className="votter-list-fillter">
            <VoterFilter />
          </div>
          <div className="manage-authorized-user-dashboard flex justify-between items-center px-[22px] py-[20px] flex-wrap bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[4px]">
            <div>
              <h3 className="text-[17px] font-bold mb-[10px]">
                Karyakarta List
              </h3>
              <p className="text-[13px] font-medium text-[#667085]">
                Search list
              </p>
            </div>
            <div className="voter-search-list-buttons flex gap-[20px]">
              <div
                className="delete-button flex items-center
"
              >
                <button className="flex gap-[5px] items-center">
                  <img src={deleteIcon} alt="Delete Icon" />
                  <span className="text-[13px] font-medium text-[#344054]">
                    Delete
                  </span>
                </button>
              </div>
              <div className="demo-excel-voter">
                <div className="export-file">
                  <ExportToExcel
                    buttonText={" Export Demo Excel"}
                    Icons={<ExcelIcons />}
                    columns={Democolumns}
                    excelName="KarykartaDemo"
                    // subText={" for Demo add Member list"}
                  />
                </div>
              </div>
              <div className="add-new-voter">
                <ButtonComponent
                  Icons={<PlusIcons />}
                  text={"Add new Karyakarta"}
                  onClick={handleAddNewKaryakarta}
                />
              </div>
            </div>

            <TableComponent
              rowSelection={rowSelection}
              columns={columns}
              data={kayrkartaData}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        <AddNewKaryaKarta
          title={"Upload Mobile No. List"}
          inputLable={"Mobile No.excel sheet upload"}
          setIsModalOpen={setAddNew}
          isModalOpen={addNew}
        />
        <ExportTable
          open={openExportDrawer}
          setOpen={setOpeExportDrawer}
          title={"Export Table For Demo"}
          columns={columns}
          data={kayrkartaData && kayrkartaData}
        />
      </Container>
    </ManageDataContainer>
  );
};

export default KaryaKartaList;
