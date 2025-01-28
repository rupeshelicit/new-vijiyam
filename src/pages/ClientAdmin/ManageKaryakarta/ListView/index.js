import React, { useEffect, useMemo, useState } from "react";
import { Container } from "styles/components/common/Layout";
import { ManageDataContainer } from "styles/pages/ClientAdmin/ManageKaryakarta";
import VoterFilter from "components/common/Filters/Voter";
import PlusIcons from "assets/svg/plusIcons";
import TableComponent from "components/common/Table";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import ExportTable from "components/common/ExportDemoTablesDrawer";
import deleteIcon from "assets/svg/trans-icon.svg";
import useGet from "hooks/useGet";
import { GET_KARYKARTA_AUTHORIZED_USER_LIST } from "constants/api";

import ExportToExcel from "components/common/ExportToExcel";
// import AddNewKaryaKarta from "./AddNewKaryaKarta";
import ExcelIcons from "assets/svg/excelIcons";
import AddNewKaryaKarta from "../AddNewKarykarta";
import { toast } from "react-toastify";
import KaryaKartaTableColumns from "../Columns/KarykartaTableColumns";
import { KarykartaExcelColumns } from "../Columns/KarykartaExcelColumns";
import DownloadExcelColumns from "../Columns/DownloadExcelColumns";
const ListViewEditComponent = () => {
  const [accountStatus, setAccountStatus] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [openExportDrawer, setOpeExportDrawer] = useState(false);
  const [kayrkartaData, setKayrkartaData] = useState([]);

  const { mutateAsync: GetKarykarta } = useGet();
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const usersRole = JSON.parse(localStorage.getItem("roleList"));
  const authorized = usersRole?.filter((item) => item.name === "authorized");
  const authorizedUserID = authorized[0]?.id;

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
                    columns={KarykartaExcelColumns}
                    excelName="KarykartaDemo"
                  />
                </div>
              </div>
              <div className="export-file">
                <ExportToExcel
                  buttonText={" Export Karykarta Excel"}
                  Icons={<ExcelIcons />}
                  columns={DownloadExcelColumns}
                  data={kayrkartaData}
                  excelName="Karykarta"
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

            <TableComponent
              rowSelection={rowSelection}
              columns={KaryaKartaTableColumns(accountStatus, setAccountStatus)}
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
          // columns={columns}
          data={kayrkartaData && kayrkartaData}
        />
      </Container>
    </ManageDataContainer>
  );
};

export default ListViewEditComponent;
