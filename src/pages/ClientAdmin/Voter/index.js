import React, { useEffect, useState } from "react";
import { Container } from "styles/components/common/Layout";
import { VoterListSection } from "styles/pages/ClientAdmin/Voter/index";
import deleteIcon from "assets/svg/trans-icon.svg";
import ExcelIcons from "assets/svg/excelIcons";
import PlusIcons from "assets/svg/plusIcons";
import { columns } from "./dummyData";
import TableComponent from "components/common/Table";
import VoterFilter from "components/common/Filters/Voter";
import AddNewVoters from "./addNewModal";
import ExportTable from "components/common/ExportDemoTablesDrawer";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import ExportToExcel from "components/common/ExportToExcel";
import useGet from "hooks/useGet";
import {
  DOWNLOAD_ELECTION_EXCEL,
  DOWNLOAD_VOTER_EXCEL,
  GET_VOTER_LIST,
} from "constants/api";
import { VoterExcelColumn } from "./Columns/VoterExcelColumn";
import { tr } from "date-fns/locale";
import { useMetaDataContext } from "context/metaData";
const VoterList = () => {
  const [addNewVoters, setAddNewVoters] = useState(false);
  const [voterData, setVoterData] = useState([]);
  const [voterExcelData, setVoterExcelData] = useState([]);
  const [openExportDrawer, setOpeExportDrawer] = useState(false);
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const { mutateAsync: GetVoterList } = useGet(); 
  const { mutateAsync: GetVoterExcelList } = useGet(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { deleteStatus, updateStatus } = useMetaDataContext();
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    getVoterList(currentPage, 10);
    handleVoterExcel();
  }, [currentPage, updateStatus.voter, deleteStatus.voter]);

  const handleTableChange = (pagination) => {
    setTableParams({ ...tableParams, current: pagination.current });
    setCurrentPage(pagination.current);
  };

  const handleAddnewVoter = () => {
    setAddNewVoters(true);
  };

  const handleVoterExcel = async () => {
      const id = loginUsers.id;
    try {
      const res = await GetVoterExcelList({
        
        url: DOWNLOAD_VOTER_EXCEL,
        type: "details",
        token: true,
      });
      if (res) {
        setVoterExcelData(res && res);
      } else {
        console.log("No data available for Excel export");
      }
    } catch (error) {
      console.error("Error fetching voter Excel data:", error);
    }
  };

  const getVoterList = async (page, limit) => {
    const id = loginUsers.id;
    setLoading(true);
    try {
      const res = await GetVoterList({
        url: `${GET_VOTER_LIST + id}?page=${page}&limit=${limit}`,
        type: "details",
        token: true,
      });
      if (res && res.items) {
        setVoterData((prevData) => [...prevData, ...res.items]);
      } else {
        console.log("No items found in response");
      }
    } catch (error) {
      console.error("Error fetching voter list:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Filter Submit
  const handleFilterSubmit = async (filters) => {
    const id = loginUsers.id;
    const filterParams = new URLSearchParams(filters).toString();
    try {
      const res = await GetVoterList({
        url: `${GET_VOTER_LIST + id}?${filterParams}`,
        type: "details",
        token: true,
      });
      if (res) {
        setVoterData(res?.items);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  // Table Row Selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("Selected Row Keys:", selectedRowKeys);
      console.log("Selected Rows:", selectedRows);
    },
  };

  return (
    <VoterListSection>
      <Container>
        <h3 className="text-[22px] font-semibold py-[20px]">
          Voter Search List
        </h3>
        <div>
          <div className="voter-list-filter">
            <VoterFilter onFilterSubmit={handleFilterSubmit} />
          </div>
          <div className="voter-list-header flex justify-between items-center px-[22px] py-[20px] flex-wrap bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[4px]">
            <div>
              <h3 className="text-[17px] font-bold mb-[10px]">Voter List</h3>
              <p className="text-[13px] font-medium text-[#667085]">
                Search list
              </p>
            </div>
            <div className="voter-search-list-buttons flex gap-[20px]">
              <button className="flex gap-[5px] items-center">
                <img src={deleteIcon} alt="Delete Icon" />
                <span className="text-[13px] font-medium text-[#344054]">
                  Delete
                </span>
              </button>

              <ExportToExcel
                data={voterExcelData}
                columns={VoterExcelColumn}
                Icons={<ExcelIcons />}
                buttonText={"Export"}
                excelName="VoterList"
                handleVoterExcel={handleVoterExcel}
              />

              <ExportToExcel
                data={[]}
                columns={VoterExcelColumn}
                Icons={<ExcelIcons />}
                buttonText={"Export Demo Excel"}
                excelName="VoterDemo"
                handleVoterExcel={handleVoterExcel}
              />

              <ButtonComponent
                text={"Add new Voter"}
                Icons={<PlusIcons />}
                onClick={handleAddnewVoter}
              />
            </div>

            <TableComponent
              rowSelection={rowSelection}
              columns={columns}
              data={voterData}
              tableParams={tableParams}
              handleTableChange={handleTableChange}
              loading={loading}
            />
          </div>
        </div>
      </Container>
      <AddNewVoters
        setIsModalOpen={setAddNewVoters}
        isModalOpen={addNewVoters}
      />
      <ExportTable
        open={openExportDrawer}
        setOpen={setOpeExportDrawer}
        title={"Select List Header"}
        data={voterData}
        columns={columns}
      />
    </VoterListSection>
  );
};

export default VoterList;
