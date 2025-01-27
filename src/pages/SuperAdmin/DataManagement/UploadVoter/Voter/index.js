import React, { useEffect, useMemo, useState } from "react";
import { Container } from "styles/components/common/Layout";
import { VoterListSection } from "styles/pages/ClientAdmin/Voter/index";
import deleteIcon from "assets/svg/trans-icon.svg";
import ExcelIcons from "assets/svg/excelIcons";
import PlusIcons from "assets/svg/plusIcons";
import { columns } from "./dummyData";
import { data } from "./dummyData";
import TableComponent from "components/common/Table";
import VoterFillter from "components/common/FiltersComponent";
import AddNewVoters from "./addNewModal";
import ExportTable from "components/common/ExportDemoTablesDrawer";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import ExportToExcel from "components/common/ExportToExcel";
import useGet from "hooks/useGet";
import { GET_VOTER_LIST } from "constants/api";
import ExcelColum from "Data/DummyDataExcelColum";

const VoterList = () => {
  console.log("----> voter component");
  const [activeButton, setActiveButton] = useState("addNewVoter");
  const [multiUserDelete, setMultiUserDelete] = useState(false);
  const [addNewVoters, setAddNewVoters] = useState(false);
  const [voterData, setVoterData] = useState([]);
  const [openExportDrawer, setOpeExportDrawer] = useState(false);
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const { mutateAsync: GetVoterList } = useGet();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getVoterList(currentPage, 10);
    }

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  const handleTableChange = (pagination) => {
    setTableParams({ ...tableParams, current: pagination.current });
    setCurrentPage(pagination.current);
  };
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  const handleBlankExcel = () => {
    setOpeExportDrawer(true);
  };
  const handleAddnewVoter = () => {
    setAddNewVoters(true);
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("Selected Row Keys:", selectedRowKeys);
      console.log("Selected Rows:", selectedRows);
    },
  };

  const getVoterList = async (page, limit) => {
    const id = loginUsers.id;
    await GetVoterList({
      url: `${GET_VOTER_LIST + id}?page=${page}&limit=${limit}`,
      type: "details",
      token: true,
    })
      .then((res) => {
        if (res) {
          let newRes = [...voterData];
          newRes = newRes.concat(res?.items);
          setVoterData(newRes);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <VoterListSection>
      <Container>
        <h3 className="text-[22px] font-semibold py-[20px]">
          Voter Search list
        </h3>
        <div>
          <div className="votter-list-fillter">
            <VoterFillter />
          </div>
          <div className="voter-list-header flex justify-between items-center px-[22px] py-[20px] flex-wrap bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[4px]">
            <div>
              <h3 className="text-[17px] font-bold mb-[10px]">Voter list</h3>
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

              <div className="export-file">
                <ExportToExcel
                  data={voterData}
                  columns={columns}
                  Icons={<ExcelIcons />}
                  buttonText={"Export"}
                  excelName="voterlist"
                />
              </div>

              <div className="export-file">
                <ExportToExcel
                  buttonText={" Export Demo Excel"}
                  Icons={<ExcelIcons />}
                  columns={ExcelColum}
                  excelName="VoterDemo"
                  // subText={" for Demo add Member list"}
                />
              </div>

              <div className="add-new-voter">
                <ButtonComponent
                  text={"Add new Voter"}
                  Icons={<PlusIcons />}
                  onClick={handleAddnewVoter}
                />
              </div>
            </div>
            {/* <TableComponent
              rowSelection={rowSelection}
              columns={columns}
              data={voterData}
              setCurrentPage={setCurrentPage}
            /> */}
            <TableComponent
              rowSelection={rowSelection}
              columns={columns}
              data={voterData}
              tableParams={tableParams}
              handleTableChange={handleTableChange}
              loading={loading}
            />
            <div className="flex items-center mb-4">
              <input
                onClick={setMultiUserDelete}
                disabled=""
                id="disabled-checkbox"
                type="checkbox"
                defaultValue=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="disabled-checkbox"
                className="ms-2 text-[16px] font-medium text-#000000-400 dark:text-gray-500"
              >
                Multi user can select and delete{" "}
              </label>
            </div>
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
        title={"Select list Header"}
        data={voterData}
        columns={columns}
      />
    </VoterListSection>
  );
};

export default VoterList;
