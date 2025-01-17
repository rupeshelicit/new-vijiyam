import React, { useMemo, useState } from "react";
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
import { GET_CLIENTS_LIST } from "constants/api";

function ClientList() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("addNewclient");
  const [accountStatus, setAccountStatus] = useState(false);
  const [userPermissions, setUserPermissions] = useState(false);
  const [openExportDrawer, setOpeExportDrawer] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [clientData, setClientData] = useState([]);
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const { mutateAsync: ClientList } = useGet();
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const handleAddnewclient = () => {
    navigate("/add-new-client");
  };

  const columns = [
    {
      title: "S.NO",
      dataIndex: "serialNumber",
      key: "serialNumber",
      align: "center",
      sorter: (a, b) => a.serialNumber - b.serialNumber,
    },
    {
      title: "Active Client",
      dataIndex: "activeClient",
      key: "activeClient",
      align: "center",
      render: (text, record) => (
        <SwitchComponent
          record={record}
          switchStates={accountStatus}
          setSwitchStates={setAccountStatus}
          text={text}
        />
      ),
    },
    {
      title: "User Permissions",
      dataIndex: "userPermissions",
      key: "userPermissions",
      align: "center",
      render: (text, record) => (
        <SwitchComponent
          record={record}
          switchStates={userPermissions}
          setSwitchStates={setUserPermissions}
          text={text}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: (a, b) => a.name?.localeCompare(b.name ?? "") ?? 0,
    },
    {
      title: "Father Name",
      dataIndex: "fatherName",
      key: "fatherName",
      align: "center",
    },
    {
      title: "Gmail",
      dataIndex: "gmail",
      key: "gmail",
      align: "center",
    },
    {
      title: "LokSabha",
      dataIndex: "lokSabha",
      key: "lokSabha",
      align: "center",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
      align: "center",
    },
  ];

  const data = [
    {
      key: "1",
      serialNumber: "01",
      activeClient: true,
      userPermissions: "Active",
      name: "Anil",
      fatherName: "name",
      gmail: "admin@gmail.com",
      lokSabha: "Indore-1",
      district: "Indore",
    },
    {
      key: "2",
      serialNumber: "02",
      activeClient: false,
      userPermissions: "Inactive",
      name: "Voter1",
      fatherName: "name",
      gmail: "admin@gmail.com",
      lokSabha: "Indore-1",
      district: "Indore",
    },
    {
      key: "3",
      serialNumber: "03",
      activeClient: false,
      userPermissions: "Inactive",
      name: "Voter1",
      fatherName: "name",
      gmail: "admin@gmail.com",
      lokSabha: "Indore-1",
      district: "Indore",
    },
    {
      key: "4",
      serialNumber: "04",
      activeClient: true,
      userPermissions: "Active",
      name: "Voter1",
      fatherName: "name",
      gmail: "admin@gmail.com",
      lokSabha: "Indore-1",
      district: "Indore",
    },
    {
      key: "5",
      serialNumber: "05",
      activeClient: true,
      userPermissions: "Active",
      name: "Voter1",
      fatherName: "name",
      gmail: "admin@gmail.com",
      lokSabha: "Indore-1",
      district: "Indore",
    },
    {
      key: "6",
      serialNumber: "06",
      activeClient: false,
      userPermissions: "Inactive",
      name: "Voter1",
      fatherName: "name",
      gmail: "admin@gmail.com",
      lokSabha: "Indore-1",
      district: "Indore",
    },
    {
      key: "7",
      serialNumber: "07",
      activeClient: true,
      userPermissions: "Active",
      name: "Voter1",
      fatherName: "name",
      gmail: "admin@gmail.com",
      lokSabha: "Indore-1",
      district: "Indore",
    },
  ];

  const getClietnList = async (page, limit) => {
    const id = loginUsers.role;
    await ClientList({
      url: `${GET_CLIENTS_LIST+id}?page=${page}&limit=${limit}`,
      type: "details",
      token: true,
    })
      .then((res) => {
        if (res) {
          let newRes = [...voterData];
          newRes = newRes.concat(res?.items);
          setClientData(newRes);
        }
      })
      .catch((error) => console.log(error));
  };
  useMemo(() => {
    if (currentPage > prevPage) {
      getClietnList(currentPage, 10);
      setPrevPage((prev) => prev + 1);
    }
  }, [currentPage]);
  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    console.log("Selected Row Keys:", newSelectedRowKeys);
    console.log("Selected Rows:", newSelectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
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
                {" "}
                Client Admin List
              </h3>
              <p className="text-[13px] font-medium text-[#667085]">
                Search list
              </p>
            </div>
            <div className="client-search-list-buttons flex gap-[20px]">
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

              <div className="add-new-client">
                <ButtonComponent
                  text={"Add new client"}
                  Icons={<PlusIcons />}
                  onClick={() => navigate("/add-new-client")}
                />
              </div>
            </div>
            <TableComponent
              rowSelection={rowSelection}
              columns={columns}
              data={data}
              setCurrentPage={10}
            />
            <div className="flex items-center mb-4">
              <input
                // onClick={setMultiUserDelete}
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
    </ClientListSection>
  );
}

export default ClientList;
