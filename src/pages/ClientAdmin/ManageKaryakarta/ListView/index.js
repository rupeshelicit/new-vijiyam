import React, { useState } from "react";
import { Container } from "styles/components/common/Layout";
import { ManageDataContainer } from "styles/pages/ClientAdmin/ManageKaryakarta";
import VoterFilter from "components/common/FiltersComponent";
import ExcelIcons from "assets/svg/excelIcons";
import SurveyAssign from "assets/svg/surveyAssign";
import TableComponent from "components/common/Table";
import SwitchComponent from "components/common/SwitchComponent";
import PlusIcons from "assets/svg/plusIcons";
import { Button } from "antd";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import AddNewModal from "components/common/UploadExcelSheet";
import ExportTable from "components/common/ExportDemoTablesDrawer";
import ExportToExcel from "components/common/ExportToExcel";

const ListView = () => {
  const [accountStatus, setAccountStatus] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [openExportDrawer, setOpeExportDrawer] = useState(false);
  const [assignSurvey, setAssignSurvey] = useState(false);
  const columns = [
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
          disabled={true}
        />
      ),
      width: 50,
    },
    {
      title: "Online User",
      dataIndex: "onlineUser",
      key: "onlineUser",
      align: "center",
      sorter: (a, b) => a.onlineUser?.localeCompare(b.onlineUser ?? "") ?? 0,
      render: (text, record) =>
        record.onlineUser === "Active" ? (
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
            <b className="h-[8px] w-[8px] bg-[#6C778B] rounded-[50px]"></b>
            Inactive{" "}
          </Button>
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: (a, b) => a.name?.localeCompare(b.name ?? "") ?? 0,
    },
    {
      title: "Booth/Part",
      dataIndex: "boothPart",
      key: "boothPart",
      align: "center",
      sorter: (a, b) => a.boothPart?.localeCompare(b.boothPart ?? "") ?? 0,
    },
    {
      title: "Vidhansabha",
      dataIndex: "vidhansabha",
      key: "vidhansabha",
      align: "center",
      sorter: (a, b) => a.vidhansabha?.localeCompare(b.vidhansabha ?? "") ?? 0,
    },

    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      align: "center",
      sorter: (a, b) =>
        a.mobileNumber?.localeCompare(b.mobileNumber ?? "") ?? 0,
    },
  ];

  // Sample Data
  const data = [
    {
      key: "1",
      onlineUser: "Active",
      name: "Alice",
      boothPart: "indore121",
      vidhansabha: "indore-7",
      assignSurveyArea: "Survey Assign",
      mobileNumber: "9036837628",
    },
    {
      key: "2",
      onlineUser: "Inactive",
      name: "Anil",
      boothPart: "indore122",
      vidhansabha: "indore-7",
      assignSurveyArea: "Survey Assign",
      mobileNumber: "9036837628",
    },
    {
      key: "3",
      onlineUser: "Active",
      name: "Rupesh",
      boothPart: "indore123",
      vidhansabha: "indore-7",
      assignSurveyArea: "Survey Assign",
      mobileNumber: "9036837628",
    },
    {
      key: "4",
      onlineUser: "Inactive",
      name: "John",
      boothPart: "indore124",
      vidhansabha: "indore-7",
      assignSurveyArea: "Survey Assign",
      mobileNumber: "9036837628",
    },
    {
      key: "5",
      onlineUser: "Active",
      name: "Rupesh",
      boothPart: "indore124",
      vidhansabha: "indore-7",
      assignSurveyArea: "Survey Assign",
      mobileNumber: "9036837628",
    },
    {
      key: "6",
      onlineUser: "Inactive",
      name: "Anil",
      boothPart: "indore124",
      vidhansabha: "indore-7",
      assignSurveyArea: "Survey Assign",
      mobileNumber: "9036837628",
    },
  ];

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Update Active button state
  };

  const handleAddNewKaryakarta = () => {
    setAddNew(true);
  };
  const handleExportDemoTable = () => {
    setOpeExportDrawer(true);
  };
  const handlAssignSurvey = () => {
    setAssignSurvey(true);
  };
  return (
    <ManageDataContainer>
      <Container>
        <Container>
          <h3 className="text-[22px] font-semibold py-[20px]">
            Authorized user list
          </h3>
          <div>
            <div className="votter-list-fillter">
              <VoterFilter />
            </div>
            <div className="manage-authorized-user-dashboard flex justify-between items-center px-[22px] py-[20px] flex-wrap bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[4px]">
              <div>
                <h3 className="text-[17px] font-bold mb-[10px]">
                  Authorized User List
                </h3>
                <p className="text-[13px] font-medium text-[#667085]">
                  Search list
                </p>
              </div>
              <div className="voter-search-list-buttons flex gap-[20px]">
                {/* Export Button */}
                <div className="export-file">
                  <ExportToExcel
                    // data={data}
                    columns={columns}
                    Icons={<ExcelIcons />}
                    buttonText={" Export Blank Excel"}
                    // subText={"    for Demo add Member list"}
                    excelName="KarykartaList"
                  />
                </div>
                <div className="export-file">
                  <ButtonComponent
                    Icons={<ExcelIcons />}
                    onClick={handleExportDemoTable}
                    text={"Export"}
                  />
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
        </Container>
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

export default ListView;
