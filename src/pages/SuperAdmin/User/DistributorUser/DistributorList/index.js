import React, { useEffect, useMemo, useState } from "react";
import { Container } from "styles/components/common/Layout";
import deleteIcon from "assets/svg/trans-icon.svg";
import TableComponent from "components/common/Table";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import VoterFilter from "components/common/Filters/Voter";
import PlusIcons from "assets/svg/plusIcons";
import { ClientListSection } from "styles/pages/SuperAdmin/user";
import { useNavigate } from "react-router-dom";
import useGet from "hooks/useGet";
import { DOWNLOAD_USER_EXCEL, GET_DISTRIBUTOR_LITS } from "constants/api";
import TableColumns from "./Columns/TableColumns";
import ExportToExcel from "components/common/ExportToExcel";
import ExcelColumns from "./Columns/ExcelColumns";
import ExcelIcons from "assets/svg/excelIcons";
import { useMetaDataContext } from "context/metaData";
import DistributorFilter from "components/common/Filters/Distributor";

function DistributortList() {
  const navigate = useNavigate();
  const { deleteStatus, updateStatus } = useMetaDataContext();
  const [accountStatus, setAccountStatus] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [distributorsExcelData, setDistributorsExcelData] = useState([]);
  const usersRole = JSON.parse(localStorage.getItem("roleList")) || [];
  const distributor = usersRole.find((item) => item?.name === "distributor");
  const distributorUserID = distributor?.id;
  const { mutateAsync: GetDistributsData } = useGet();
  const { mutateAsync: GetDistributsExcelData } = useGet();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    let isMounted = true;
    handleDistributorExcel();
    if (isMounted) {
      getDistributorList(currentPage, 10);
    }

    return () => {
      isMounted = false;
    };
  }, [currentPage, deleteStatus?.distributor, updateStatus?.distributor]);




   const getDistributorList = async (page, limit) => {
      setLoading(true);
      try {
        const response = await GetDistributsData({
          url: `${GET_DISTRIBUTOR_LITS+distributorUserID}?page=${page}&limit=${limit}`,
          type: "details",
          token: true,
        });
  
        if (response) {
          setDistributors(response.items);
          setTableParams({ ...tableParams, total: response?.meta?.totalItems });
        }
      } catch (error) {
        console.error("Error fetching election list:", error);
      } finally {
        setLoading(false);
      }
    };



  
  const handleTableChange = (pagination) => {
    setTableParams({ ...tableParams, current: pagination.current });
    setCurrentPage(pagination.current);
  };
  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    console.log("Selected Row Keys:", newSelectedRowKeys);
    console.log("Selected Rows:", newSelectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleFilterSubmit = async (filters) => {
    // const id = loginUsers.id;
    const filterParams = new URLSearchParams(filters).toString();
    try {
      const res = await GetDistributsData({
        url: `${GET_DISTRIBUTOR_LITS + distributorUserID}?${filterParams}`,
        type: "details",
        token: true,
      });
      if (res) {
        setDistributors(res?.items);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };






  
  const handleDistributorExcel = async () => {
    setLoading(true);
    try {
      const res = await GetDistributsExcelData({
        url: DOWNLOAD_USER_EXCEL+ distributorUserID,
        type: "details",
        token: true,
      });
      if (res) {
        setDistributorsExcelData(res && res);
        setLoading(false);
      } else {
        console.log("No data available for Excel export");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching voter Excel data:", error);
      setLoading(false);
    }
  };

  return (
    <ClientListSection>
      <Container>
        <div className="py-[20px]">
          <div className="client-list-fillter">
            <DistributorFilter onFilterSubmit={handleFilterSubmit} />
          </div>
          <div className="client-list-header flex justify-between items-center px-[22px] py-[20px] flex-wrap bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[4px]">
            <div>
              <h3 className="text-[17px] font-bold mb-[10px]">
                Distributor List
              </h3>
              <p className="text-[13px] font-medium text-[#667085]">Search</p>
            </div>
            <div className="client-search-list-buttons flex gap-[20px]">
              <div className="delete-button flex items-center">
                <button className="flex gap-[5px] items-center">
                  <img src={deleteIcon} alt="Delete Icon" />
                  <span className="text-[13px] font-medium text-[#344054]">
                    Delete
                  </span>
                </button>
              </div>
              <div className="add-new-client">
                <ButtonComponent
                  text={"Add New Distributor"}
                  Icons={<PlusIcons />}
                  onClick={() => navigate("/add-distributor")}
                />
              </div>
              <div className="add-new-client">
                <ExportToExcel
                  buttonText={"Export Distributor Excel"}
                  excelName={"Distributor"}
                  columns={ExcelColumns}
                  Icons={<ExcelIcons />}
                  data={distributorsExcelData}
                />
              </div>
            </div>

            <TableComponent
              rowSelection={rowSelection}
              columns={TableColumns(accountStatus, setAccountStatus)}
              tableParams={tableParams}
              data={distributors}
              handleTableChange={handleTableChange}
              loading={loading}
              pagination={{
                current: currentPage,
                onChange: (page) => setCurrentPage(page),
              }}
            />
          </div>
        </div>
      </Container>
    </ClientListSection>
  );
}

export default DistributortList;
