import React, { useState } from "react";
import { Container } from "styles/components/common/Layout";
import { ManageDataContainer } from "styles/pages/ClientAdmin/ManageKaryakarta";
import VoterFilter from "components/common/FiltersComponent";
import ExcelIcons from "assets/svg/excelIcons";
import PlusIcons from "assets/svg/plusIcons";
import SwitchComponent from "components/common/SwitchComponent";
import TableComponent from "components/common/Table";
import { Button } from "antd";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import AddNewModal from "components/common/UploadExcelSheet";
import ExportTable from "components/common/ExportDemoTablesDrawer";
import deleteIcon from "assets/svg/trans-icon.svg";
const KaryaKartaList = () => {
  const [accountStatus, setAccountStatus] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [openExportDrawer, setOpeExportDrawer] = useState(false);
  const handleSwitchChange = (checked, recordKey) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === recordKey ? { ...item, activeClient: checked } : item
      )
    );
  };

  const columns = [
    {
      title: "S.NO",
      dataIndex: "serialNumber",
      key: "serialNumber",
      align: "center",
      sorter: (a, b) => a.serialNumber - b.serialNumber,
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Active User",
      dataIndex: "activeUser",
      key: "activeUser",
      align: "center",
      sorter: true,
      render: (text, record) => (
        <SwitchComponent
          record={record}
          switchStates={accountStatus}
          setSwitchStates={setAccountStatus}
          text={text}
        />
      ),
      width: 50,
    },
    {
      title: "User Permissions",
      dataIndex: "userPermissions",
      key: "userPermissions",
      align: "center",
      render: (text, record) =>
        record.userPermissions === "Active" ? (
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Client Admin",
      dataIndex: "clientAdmin",
      key: "clientAdmin",
      align: "center",
    },
    {
      title: "Father Name",
      dataIndex: "fatherName",
      key: "fatherName",
      align: "center",
    },
    {
      title: "Gmail",
      dataIndex: "gmail",
      key: "gmail",
      align: "center",
    },
    {
      title: "LokSabha",
      dataIndex: "loksabha",
      key: "loksabha",
      align: "center",
    },
    {
      title: "LokStatus",
      dataIndex: "lokstatus",
      key: "lokstatus",
      align: "center",
    },
  ];

  const data = [
    {
      key: "1",
      serialNumber: 1,
      activeClient: true,
      userPermissions: "Active",
      name: "Anil",
      clientAdmin: "Client admin",
      fatherName: "Name1",
      gmail: "admin@gmail.com",
      loksabha: "Indore-1",
      lokstatus: "Indore-1",
    },
    {
      key: "2",
      serialNumber: 2,
      activeClient: false,
      userPermissions: "Inactive",
      name: "Voter1",
      clientAdmin: "Client admin",
      fatherName: "Name2",
      gmail: "voter1@gmail.com",
      loksabha: "Indore-1",
      lokstatus: "Indore-1",
    },
  ];

  const handleAddNewKaryakarta = () => {
    setAddNew(true);
  };

  const handleExportDemoTable = () => {
    setOpeExportDrawer(true);
  };

  return (
    <ManageDataContainer>
      <Container>
        <h3 className="text-[22px] font-semibold py-[20px]">Karyakarta list</h3>
        <div>
          <div className="votter-list-fillter">
            <VoterFilter />
          </div>
          <div className="manage-authorized-user-dashboard flex justify-between items-center px-[22px] py-[20px] flex-wrap bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[4px]">
            <div>
              <h3 className="text-[17px] font-bold mb-[10px]">
                Karyakarta list
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

              <div className="add-new-voter">
                <ButtonComponent
                  Icons={<PlusIcons />}
                  text={"Add new Karyakarta"}
                  onClick={handleAddNewKaryakarta}
                />
              </div>
            </div>
            <TableComponent data={data} columns={columns} />
          </div>
        </div>
        <AddNewModal
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
          data={data}
        />
      </Container>
    </ManageDataContainer>
  );
};

export default KaryaKartaList;
