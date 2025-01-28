import React, { useMemo, useState } from "react";
import { Container } from "styles/components/common/Layout";
import { ManageDataContainer } from "styles/pages/ClientAdmin/ManageKaryakarta";
import VoterFilter from "components/common/Filters/Voter";
import ExcelIcons from "assets/svg/excelIcons";
import SurveyAssign from "assets/svg/surveyAssign";
import TableComponent from "components/common/Table";
import SwitchComponent from "components/common/SwitchComponent";
import PlusIcons from "assets/svg/plusIcons";
import { Button } from "antd";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import AddNewModal from "components/common/UploadExcelSheet";
import ExportTable from "components/common/ExportDemoTablesDrawer";
import AssignSurvey from "./AssignSurvey";
import ExportToExcel from "components/common/ExportToExcel";
import useGet from "hooks/useGet";
import { GET_KARYKARTA_AUTHORIZED_USER_LIST } from "constants/api";
import EditComponent from "components/common/Action/Edit";
import ViewComponent from "components/common/Action/View";
import DeleteComponent from "components/common/Action/Delete";
import { toast } from "react-toastify";

const ManageData = () => {
  const [accountStatus, setAccountStatus] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [openExportDrawer, setOpeExportDrawer] = useState(false);
  const [assignSurvey, setAssignSurvey] = useState(false);
  const [kayrkartaData, setKayrkartaData] = useState([]);
  const { mutateAsync: GetKarykarta } = useGet();
  const [currentPage, setCurrentPage] = useState(1);
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const [prevPage, setPrevPage] = useState(0);
  const usersRole = JSON.parse(localStorage.getItem("roleList"));
  const authorized = usersRole?.filter((item) => item.name === "authorized");
  const authorizedUserID = authorized[0]?.id;
  const GetKarykartaList = async (page, limit) => {
    await GetKarykarta({
      url: `${
        GET_KARYKARTA_AUTHORIZED_USER_LIST + authorizedUserID
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

  const handleAddNewKaryakarta = () => {
    setAddNew(true);
  };
  const handleExportDemoTable = () => {
    setOpeExportDrawer(true);
  };
  const handlAssignSurvey = () => {
    setAssignSurvey(true);
  };

  const handleButtonClick = (buttonName) => {
    // setActiveButton(buttonName); // Update Active button state
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("Selected Row Keys:", selectedRowKeys);
      console.log("Selected Rows:", selectedRows);
    },
  };
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
      dataIndex: "caste",
      key: "caste",
      align: "center",
      render: (record) => (record ? record?.name : "NA"),
      sorter: (a, b) => a.casteId.localeCompare(b.casteId),
    },
    {
      title: "State Name",
      dataIndex: "state",
      key: "state",
      align: "center",
      render: (record) => record?.name,
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
      align: "center",
      render: (record) => record?.name,
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
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      align: "center",
      render: (record) => (record ? record : "NA"),
      sorter: (a, b) => a.designation.localeCompare(b.designation),
    },
    {
      title: "Vidhansabha",
      dataIndex: "vidhansabha",
      key: "vidhansabha",
      align: "center",
      render: (record) => (record ? record?.name : "NA"),
      sorter: (a, b) => a.vidhansabha.localeCompare(b.vidhansabha),
    },

    {
      title: "LokSabha",
      dataIndex: "loksabha",
      key: "loksabha",
      align: "center",
      render: (record) => (record ? record?.name : "NA"),
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
      render: (record) => (record ? record?.name : "NA"),
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
      title: "Assign Survey Area",
      dataIndex: "assignSurveyArea",
      key: "assignSurveyArea",
      align: "center",
      sorter: (a, b) =>
        a.assignSurveyArea?.localeCompare(b.assignSurveyArea ?? "") ?? 0,
      render: (text, record) =>
        record.status === true ? (
          <Button className="items-center px-[30px] py-[15px] rounded-[40px] text-[#54408C] text-[12px] font-medium bg-[#54408C66] border-[none]">
            Survey Assign
          </Button>
        ) : (
          <Button className="items-center px-[30px] py-[15px] rounded-[40px] text-[#54408C] text-[12px] font-medium">
            Survey Assign
          </Button>
        ),
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
          <EditComponent record={record} roleType={"karykarta"} />
          <DeleteComponent record={record} />
          <ViewComponent record={record} roleType={"karykarta"} />
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

  return (
    <ManageDataContainer>
      <Container>
        <Container>
          <h3 className="text-[22px] font-bold py-[20px]">Karyakarta List</h3>
          <div>
            <div className="votter-list-fillter">
              <VoterFilter />
            </div>
            <div className="manage-authorized-user-dashboard flex justify-between items-center px-[22px] py-[20px] flex-wrap bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[4px]">
              <div>
                <h3 className="text-[17px] font-semibold mb-[10px]">
                  Karyakarta List
                </h3>
                <p className="text-[13px] font-medium text-[#667085]">
                  Search list
                </p>
              </div>
              <div className="voter-search-list-buttons flex gap-[20px]">
                {/* Survey Assign Button */}
                <div className="survey-assign">
                  <ButtonComponent
                    Icons={<SurveyAssign />}
                    text={"  Survey Assign"}
                    onClick={handlAssignSurvey}
                  />
                </div>
                {/* Export Button */}
                {/* <div className="export-file">
                  <ExportToExcel
                    // data={data}
                    columns={Democolumns}
                    Icons={<ExcelIcons />}
                    buttonText={" Export Blank Excel"}
                    excelName="ManageDataList"
                    // subText={"    for Demo add Member list"}
                  />
                </div> */}
                {/* <div className="export-file">
                  <ButtonComponent
                    Icons={<ExcelIcons />}
                    onClick={handleExportDemoTable}
                    text={"Export"}
                  />
                </div> */}

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
                data={kayrkartaData}
                columns={columns}
                setCurrentPage={setCurrentPage}
              />
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
          data={kayrkartaData}
        />
        <AssignSurvey
          open={assignSurvey}
          setOpen={setAssignSurvey}
          data={kayrkartaData}
          title={"Assign Booth For Survey "}
        />
      </Container>
    </ManageDataContainer>
  );
};

export default ManageData;
