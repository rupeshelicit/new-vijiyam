import React, { useEffect, useState } from "react";
import { Container } from "styles/components/common/Layout";
import { ManageDataContainer } from "styles/pages/ClientAdmin/ManageKaryakarta";
import VoterFilter from "components/common/Filters/Voter";
import PlusIcons from "assets/svg/plusIcons";
import TableComponent from "components/common/Table";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import ExportToExcel from "components/common/ExportToExcel";
import deleteIcon from "assets/svg/trans-icon.svg";
import useGet from "hooks/useGet";
import { GET_KARYKARTA_AUTHORIZED_USER_LIST } from "constants/api";
import ExcelIcons from "assets/svg/excelIcons";
import AddNewKarykarta from "../AddNewKarykarta";
import { toast } from "react-toastify";
import KaryaKartaTableColumns from "../Columns/KarykartaTableColumns";
import { KarykartaExcelColumns } from "../Columns/KarykartaExcelColumns";
import DownloadExcelColumns from "../Columns/DownloadExcelColumns";
import { useMetaDataContext } from "context/metaData";

const ListViewEditComponent = () => {
  const [accountStatus, setAccountStatus] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [kayrkartaData, setKayrkartaData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { mutateAsync: GetKarykarta } = useGet();
  const [currentPage, setCurrentPage] = useState(1);
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const usersRole = JSON.parse(localStorage.getItem("roleList"));
  const authorized = usersRole?.filter((item) => item.name === "authorized");
  const authorizedUserID = authorized[0]?.id;
  const { deleteStatus, updateStatus } = useMetaDataContext();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    getKarykartaList(currentPage, 10);
  }, [currentPage, updateStatus.karyakarta, deleteStatus.karyakarta]);

  const handleTableChange = (pagination) => {
    setTableParams({ ...tableParams, current: pagination.current });
    setCurrentPage(pagination.current);
  };

  const handleAddNewKaryakarta = () => {
    setAddNew(true);
  };

  const getKarykartaList = async (page, limit) => {
    setLoading(true);
    try {
      const res = await GetKarykarta({
        url: `${GET_KARYKARTA_AUTHORIZED_USER_LIST + authorizedUserID}?page=${page}&limit=${limit}`,
        type: "details",
        token: true,
      });

      if (res && res.items) {
        setKayrkartaData((prevData) => {
          const newItems = res.items.filter(
            (item) => !prevData.some((existingItem) => existingItem.id === item.id)
          );
          return [...prevData, ...newItems];
        });
      }
    } catch (error) {
      console.error("Error fetching karyakarta list:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    console.log("Selected Row Keys:", newSelectedRowKeys);
    console.log("Selected Rows:", newSelectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Optionally disable selection for certain rows
    }),
  };

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
              <h3 className="text-[17px] font-bold mb-[10px]">Karyakarta List</h3>
              <p className="text-[13px] font-medium text-[#667085]">Search list</p>
            </div>
            <div className="voter-search-list-buttons flex gap-[20px]">
              <div className="delete-button flex items-center">
                <button className="flex gap-[5px] items-center">
                  <img src={deleteIcon} alt="Delete Icon" />
                  <span className="text-[13px] font-medium text-[#344054]">Delete</span>
                </button>
              </div>
              <div className="demo-excel-voter">
                <ExportToExcel
                  buttonText={"Export Demo Excel"}
                  Icons={<ExcelIcons />}
                  columns={KarykartaExcelColumns}
                  excelName="KarykartaDemo"
                />
              </div>
              <div className="export-file">
                <ExportToExcel
                  buttonText={"Export Karykarta Excel"}
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
              tableParams={tableParams}
              handleTableChange={handleTableChange}
              loading={loading}
            />
          </div>
        </div>
        <AddNewKarykarta
          title={"Upload Mobile No. List"}
          inputLable={"Mobile No. excel sheet upload"}
          setIsModalOpen={setAddNew}
          isModalOpen={addNew}
        />
      </Container>
    </ManageDataContainer>
  );
};

export default ListViewEditComponent;
