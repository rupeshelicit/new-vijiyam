import React, { useEffect, useMemo, useState } from "react";
import { Container } from "styles/components/common/Layout";
import deleteIcon from "assets/svg/trans-icon.svg";

import TableComponent from "components/common/Table";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import VoterFilter from "components/common/FiltersComponent";
import PlusIcons from "assets/svg/plusIcons";
import SwitchComponent from "components/common/SwitchComponent";
import { ClientListSection } from "styles/pages/SuperAdmin/user";
import { useNavigate } from "react-router-dom";
import useGet from "hooks/useGet";
import { GET_DISTRIBUTOR_LITS } from "constants/api";
import { Button } from "antd";
import EditComponent from "components/common/Action/Edit";
import DeleteComponet from "components/common/Action/Delete";
import ViewComponent from "components/common/Action/View";

function DistributortList() {
  const navigate = useNavigate();
  const [accountStatus, setAccountStatus] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);

  const usersRole = JSON.parse(localStorage.getItem("roleList")) || [];
  const distributor = usersRole.find((item) => item?.name === "distributor");
  const distributorUserID = distributor?.id;

  const { mutateAsync: GetDistributsData } = useGet();

  const columns = [
    {
      title: "S.NO",
      dataIndex: "serialNumber",
      key: "serialNumber",
      align: "center",
      render: (text, record, index) => index + 1,
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
            <b className="h-[8px] w-[8px] bg-[#14BA6D] rounded-[50px]"></b> Active
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div className="flex gap-[10px]">
          <EditComponent record={record} />
          <DeleteComponet record={record} />
          <ViewComponent record={record} />
        </div>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    console.log("Selected Row Keys:", newSelectedRowKeys);
    console.log("Selected Rows:", newSelectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const getDistributorList = async (page, limit) => {
    if (!distributorUserID) {
      console.error("Distributor User ID not found.");
      return;
    }
    try {
      const response = await GetDistributsData({
        url: `${GET_DISTRIBUTOR_LITS + distributorUserID}?page=${page}&limit=${limit}`,
        type: "details",
        token: true,
      });
      if (response && response.items) {
        setDistributors((prev) => [...prev, ...response.items]);
      }
    } catch (error) {
      console.error("Error fetching distributor list:", error);
    }
  };

  useEffect(() => {
    if (currentPage > prevPage) {
      getDistributorList(currentPage, 10);
      setPrevPage(currentPage);
    }
  }, [currentPage]);

  return (
    <ClientListSection>
      <Container>
        <div className="py-[20px]">
          <div className="client-list-fillter">
            <VoterFilter />
          </div>
          <div className="client-list-header flex justify-between items-center px-[22px] py-[20px] flex-wrap bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[4px]">
            <div>
              <h3 className="text-[17px] font-bold mb-[10px]">
                Distributor List
              </h3>
              <p className="text-[13px] font-medium text-[#667085]">
                Search and manage distributors
              </p>
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
            </div>
            <TableComponent
              rowSelection={rowSelection}
              columns={columns}
              data={distributors}
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
