import React, { useEffect, useMemo, useState } from "react";
import { Container } from "styles/components/common/Layout";
import { ManageDataContainer } from "styles/pages/ClientAdmin/ManageKaryakarta";
import PlusIcons from "assets/svg/plusIcons";
import TableComponent from "components/common/Table";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import deleteIcon from "assets/svg/trans-icon.svg";
import useGet from "hooks/useGet";
import {
  DOWNLOAD_USER_EXCEL,
  GET_KARYKARTA_AUTHORIZED_USER_LIST,
} from "constants/api";
import ExportToExcel from "components/common/ExportToExcel";
import AddNewKaryaKarta from "../AddNewKarykartaModal";
import ExcelIcons from "assets/svg/excelIcons";
import { useMetaDataContext } from "context/metaData";
import KaryaKartaTableColumns from "../Columns/KarykartaTableColumns";
import {
  KarykartaExcelColumns,
  KarykartaExcelDataColumns,
} from "../Columns/KarykartaExcelColumns";
import KaryakartaFilter from "components/common/Filters/Karykarta";
const KaryaKartaList = () => {
  const [loading, setLoading] = useState(false);
  const [accountStatus, setAccountStatus] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [kayrkartaData, setKayrkartaData] = useState([]);

  const { mutateAsync: GetKarykarta } = useGet();
  const { mutateAsync: GetKarykartaExcelData } = useGet();
  const [currentPage, setCurrentPage] = useState(1);
  const [karyakartaExcelData, setKaryakartaExcelData] = useState([]);
  const { deleteStatus, updateStatus } = useMetaDataContext();
  const usersRole = JSON.parse(localStorage.getItem("roleList")) || [];
  const authorized = usersRole.find((item) => item?.name === "authorized");
  const authorizedUserId = authorized?.id;

  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      GetKarykartaList(currentPage, 10);
      handleKarykartaExcel();
    }

    return () => {
      isMounted = false;
    };
  }, [currentPage, deleteStatus.karykarta, updateStatus.karykarta]);

  const handleTableChange = (pagination) => {
    setTableParams({ ...tableParams, current: pagination.current });
    setCurrentPage(pagination.current);
  };



  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("Selected Row Keys:", selectedRowKeys);
      console.log("Selected Rows:", selectedRows);
    },
  };
  const handleAddNewKaryakarta = () => {
    setAddNew(true);
  };


  const GetKarykartaList = async (page, limit) => {
    setLoading(true);
    try {
      const res = await GetKarykarta({
        url: `${
          GET_KARYKARTA_AUTHORIZED_USER_LIST + authorizedUserId
        }?page=${page}&limit=${limit}`,
        type: "details",
        token: true,
      });

      if (res && res.items) {
        setKayrkartaData((prevData) => {
          const existingIds = new Set(prevData.map((item) => item.id));
          const newData = res.items.filter((item) => !existingIds.has(item.id));
          return [...prevData, ...newData];
        });
      } else {
        console.log("No items found in response");
      }
    } catch (error) {
      console.error("Error fetching voter list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKarykartaExcel = async () => {
    try {
      const res = await GetKarykartaExcelData({
        url: DOWNLOAD_USER_EXCEL + authorizedUserId,
        type: "details",
        token: true,
      });
      if (res) {
        setKaryakartaExcelData(res && res);
      } else {
        console.log("No data available for Excel export");
      }
    } catch (error) {
      console.error("Error fetching voter Excel data:", error);
    }
  };

  const handleFilterSubmit = async (filters) => {
    // const id = loginUsers.id;
    const filterParams = new URLSearchParams(filters).toString();
    try {
      const res = await GetKarykarta({
        url: `${
          GET_KARYKARTA_AUTHORIZED_USER_LIST + authorizedUserId
        }?${filterParams}`,
        type: "details",
        token: true,
      });
      if (res) {
        setKayrkartaData(res?.items);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };
  return (
    <ManageDataContainer>
      <Container>
        <h3 className="text-[22px] font-semibold py-[20px]">Karyakarta List</h3>
        <div>
          <div className="votter-list-fillter">
            <KaryakartaFilter onFilterSubmit={handleFilterSubmit} />
          </div>
          <div className="manage-authorized-user-dashboard flex justify-between items-center px-[22px] py-[20px] flex-wrap bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[4px]">
            <div>
              <h3 className="text-[17px] font-bold mb-[10px] items-center">
                Karyakarta List
              </h3>
              <p className="text-[13px] font-medium text-[#667085] text-left">
                Search List
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
                <ExportToExcel
                  buttonText={" Export Demo Excel"}
                  Icons={<ExcelIcons />}
                  columns={KarykartaExcelColumns}
                  excelName="KarykartaDemo"
                />
              </div>
              <div className="export-file">
                <ExportToExcel
                  buttonText={" Export Karykarta Excel"}
                  Icons={<ExcelIcons />}
                  columns={KarykartaExcelDataColumns}
                  excelName="Karykarta"
                  data={karyakartaExcelData}
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
              columns={KaryaKartaTableColumns(setAccountStatus, accountStatus)}
              data={kayrkartaData}
              tableParams={tableParams}
              handleTableChange={handleTableChange}
              loading={loading}
            />
          </div>
        </div>
        <AddNewKaryaKarta
          title={"Upload Mobile No. List"}
          inputLable={"Mobile No.excel sheet upload"}
          setIsModalOpen={setAddNew}
          isModalOpen={addNew}
        />
     
      </Container>
    </ManageDataContainer>
  );
};

export default KaryaKartaList;
