import React, { useEffect, memo, useState } from "react";
import { Container } from "styles/components/common/Layout";
import deleteIcon from "assets/svg/trans-icon.svg";
import TableComponent from "components/common/Table";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import PlusIcons from "assets/svg/plusIcons";
import ExportToExcel from "components/common/ExportToExcel";
import ExcelIcons from "assets/svg/excelIcons";
import { ClientListSection } from "styles/pages/SuperAdmin/user";
import { useNavigate } from "react-router-dom";
import useGet from "hooks/useGet";
import { DOWNLOAD_ELECTION_EXCEL, GET_ELECTION_LIST } from "constants/api";
import { useMetaDataContext } from "context/metaData";
import ElectionTableColumns from "../Columns/ElectionTableColumns";
import ElectionExcelColumns, {
  electionExcelColumns,
} from "../Columns/ElectionExcelColumns";
// import ElectionExcelColumns from "../ElectionTableColumns";

function ElectionsList() {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [electionData, setElectionData] = useState([]);
  const { mutateAsync: GetElectionsList } = useGet();
  const { mutateAsync: GetElectionsExcelData } = useGet();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const { deleteStates, updateStatus } = useMetaDataContext();
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchElectionList = async (page, limit) => {
    setLoading(true);
    try {
      const response = await GetElectionsList({
        url: `${GET_ELECTION_LIST}?page=${page}&limit=${limit}`,
        type: "details",
        token: true,
      });

      if (response) {
        setElectionData(response.items);
        setTableParams({ ...tableParams, total: response?.meta?.totalItems });
      }
    } catch (error) {
      console.error("Error fetching election list:", error);
    } finally {
      setLoading(false);
    }
  };

  const getElectionExcelData = async () => {
    try {
      const response = await GetElectionsList({
        url: DOWNLOAD_ELECTION_EXCEL,
        type: "details",
        token: true,
      });

      if (response) {
        setExcelData(response.items);
      }
    } catch (error) {
      console.error("Error fetching election list:", error);
    }
  };

  useEffect(() => {
    let isMounted = true; 

    if (isMounted) {
      fetchElectionList(currentPage, 3);
    }

    return () => {
      isMounted = false; 
    };
  }, [currentPage, deleteStates.election, updateStatus.election]);

  const handleDelete = () => {
    fetchElectionList(currentPage, 3);
  };

  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange = (pagination) => {
    setTableParams({ ...tableParams, current: pagination.current });
    setCurrentPage(pagination.current);
  };

  return (
    <ClientListSection>
      <Container>
        <div className="py-4">
          <div className="client-list-header flex justify-between items-center bg-white p-5 border rounded">
            <div>
              <h3 className="text-lg font-bold">Election List</h3>
              <p className="text-sm text-gray-500">Search list</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2">
                <img src={deleteIcon} alt="Delete" />
                <span>Delete</span>
              </button>
              <ButtonComponent
                text="Add Election"
                Icons={<PlusIcons />}
                onClick={() => navigate("/add-elections")}
              />
              <ExportToExcel
                buttonText="Export Election List"
                Icons={<ExcelIcons />}
                data={excelData}
                columns={electionExcelColumns}
                handleDownload={getElectionExcelData}
                excelName="ElectionList"
              />
            </div>
          </div>

          <TableComponent
            rowSelection={rowSelection}
            columns={ElectionTableColumns({ handleDelete })}
            data={electionData}
            tableParams={tableParams}
            handleTableChange={handleTableChange}
            loading={loading}
          />
        </div>
      </Container>
    </ClientListSection>
  );
}

export default memo(ElectionsList);
