import React, { useEffect, useMemo, useState } from "react";
import { Container } from "styles/components/common/Layout";
import { ManageDataContainer } from "styles/pages/ClientAdmin/ManageKaryakarta";
import VoterFilter from "components/common/Filters/Voter";

import SurveyAssign from "assets/svg/surveyAssign";
import TableComponent from "components/common/Table";

import PlusIcons from "assets/svg/plusIcons";

import ButtonComponent from "components/common/FormControl/ButtonComponent";
import AddNewModal from "components/common/UploadExcelSheet";
import AssignSurvey from "./AssignSurvey";

import useGet from "hooks/useGet";
import { GET_KARYKARTA_AUTHORIZED_USER_LIST } from "constants/api";

import KaryaKartaTableColumns from "../Columns/KarykartaTableColumns";
import { useMetaDataContext } from "context/metaData";
import KaryakartaFilter from "components/common/Filters/Karykarta";

const ManageData = () => {
  const [accountStatus, setAccountStatus] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [assignSurvey, setAssignSurvey] = useState(false);
  const [kayrkartaData, setKayrkartaData] = useState([]);
  const { mutateAsync: GetKarykarta } = useGet();
  const [selectedUsersID, setSelectedUsersID] = useState();
  const [seletedUserData, setSeletedUserData] = useState([]);
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
        url: `${
          GET_KARYKARTA_AUTHORIZED_USER_LIST + authorizedUserID
        }?page=${page}&limit=${limit}`,
        type: "details",
        token: true,
      });

      if (res && res.items) {
        setKayrkartaData((prevData) => {
          const newItems = res.items.filter(
            (item) =>
              !prevData.some((existingItem) => existingItem.id === item.id)
          );

          return [...prevData, ...newItems];
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
  const handleAssignSurvey = () => {
    setAssignSurvey(true);
  };

  // Table Row Selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedUsersID(selectedRowKeys);
      setSeletedUserData(selectedRows);
    },
  };
  const tableData =
    kayrkartaData &&
    kayrkartaData?.map((item) => ({
      ...item,
      key: item.id,
    }));
  return (
    <ManageDataContainer>
      <Container>
        <Container>
          <h3 className="text-[22px] font-bold py-[20px]">Karyakarta List</h3>
          <div>
            <div className="votter-list-fillter">
              <KaryakartaFilter onFilterSubmit={handleFilterSubmit} />
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
                <div className="survey-assign">
                  <ButtonComponent
                    Icons={<SurveyAssign />}
                    text={"  Survey Assign"}
                    onClick={handleAssignSurvey}
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
                columns={KaryaKartaTableColumns(
                  accountStatus,
                  setAccountStatus,
                  handleAssignSurvey
                )}
                data={tableData}
                tableParams={tableParams}
                handleTableChange={handleTableChange}
                loading={loading}
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

        <AssignSurvey
          open={assignSurvey}
          setOpen={setAssignSurvey}
          usersId={selectedUsersID}
          title={"Assign Booth For Survey "}
          data={seletedUserData}
        />
      </Container>
    </ManageDataContainer>
  );
};

export default ManageData;
