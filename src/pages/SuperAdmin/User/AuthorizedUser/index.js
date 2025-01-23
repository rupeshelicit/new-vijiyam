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
import { GET_CLIENTS_LIST, GET_AUTHORIZED_USER_LITS } from "constants/api";
import { Button } from "antd";
import EditComponent from "components/common/Action/Edit";
import DeleteComponet from "components/common/Action/Delete";
import ViewComponent from "components/common/Action/View";
import AddNewAuthorizedUser from "./AddNewUser";

function AuthorizedUser() {
  const navigate = useNavigate();
  const [accountStatus, setAccountStatus] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [authorizedUserData, setsetAuthorizedUserData] = useState([]);
  const [addAuthorizedUser, SetAddAuthorizedUser] = useState(false);
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const { mutateAsync: AuthorizedUser } = useGet();
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const usersRole = JSON.parse(localStorage.getItem("roleList"));
  const authorizedUsers = usersRole.filter(
    (item) => item.name === "authorized"
  );
  const authorizedUserID = authorizedUsers[0]?.id;

  const columns = [
    {
      title: "S.NO",
      dataIndex: "serialNumber",
      key: "serialNumber",
      align: "center",
      render: (text, record, index) => {
        return index + 1;
      },
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
            <b className="h-[8px] w-[8px] bg-[#14BA6D] rounded-[50px]"></b>{" "}
            Active
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
      title: "Voter Id",
      dataIndex: "voterId",
      key: "voterId",
      align: "center",
      sorter: (a, b) => a.voterId.localeCompare(b.voterId),
    },
    {
      title: "Party",
      dataIndex: "party",
      key: "party",
      align: "center",
      sorter: (a, b) => a.party.localeCompare(b.party),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Father Name",
      dataIndex: "fatherName",
      key: "fatherName",
      align: "center",
      sorter: (a, b) => a.fatherName.localeCompare(b.fatherName),
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      align: "center",
      render: (record) => new Date(record ? record : "NA").toLocaleDateString(),
      sorter: (a, b) => a.dateOfBirth.localeCompare(b.dateOfBirth),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      align: "center",
      sorter: (a, b) => a.mobileNumber.localeCompare(b.mobileNumber),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      align: "center",
      sorter: (a, b) => a.designation.localeCompare(b.designation),
    },
    {
      title: "State Name",
      dataIndex: "state",
      key: "state",
      align: "center",
      render: (record) => record?.name,
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
      align: "center",
      render: (record) => record?.name,
      sorter: (a, b) => a.district.localeCompare(b.district),
    },

    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      align: "center",
      sorter: (a, b) => a.age.localeCompare(b.age),
    },

    {
      title: "Vidhansabha",
      dataIndex: "vidhansabha",
      key: "vidhansabha",
      align: "center",
      render: (record) => record?.name,
      sorter: (a, b) => a.vidhansabha.localeCompare(b.vidhansabha),
    },
    {
      title: "Loksabha",
      dataIndex: "loksabhaId",
      key: "loksabhaId",
      align: "center",
      sorter: (a, b) => a.loksabhaId.localeCompare(b.loksabhaId),
    },

    {
      title: "City",
      dataIndex: "city",
      key: "city",
      align: "center",
      sorter: (a, b) => a.city.localeCompare(b.city),
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },

    {
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (record) => new Date(record ? record : "NA").toLocaleDateString(),
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      title: "Update Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (record) => new Date(record ? record : "NA").toLocaleDateString(),
      sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div className="flex gap-[10px]">
          <EditComponent record={record} roleType={"karyakarta"} />
          <DeleteComponet record={record} roleType={"karyakarta"} />
          <ViewComponent record={record} roleType={"karyakarta"} />
        </div>
      ),
    },
  ];

  const getAuthorizedUserList = async (page, limit) => {
    await AuthorizedUser({
      url: `${
        GET_AUTHORIZED_USER_LITS + authorizedUserID
      }?page=${page}&limit=${limit}`,
      type: "details",
      token: true,
    })
      .then((res) => {
        if (res) {
          // let newRes = [...voterData];
          // newRes = newRes.concat(res?.items);
          setsetAuthorizedUserData(res?.items);
        }
      })
      .catch((error) => console.log(error));
  };
  useMemo(() => {
    if (currentPage > prevPage) {
      getAuthorizedUserList(currentPage, 10);
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
                KaryaKarta List
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
                  text={"Add KaryaKarta"}
                  Icons={<PlusIcons />}
                  onClick={() => SetAddAuthorizedUser(true)}
                />
              </div>
            </div>
            <TableComponent
              rowSelection={rowSelection}
              columns={columns}
              data={authorizedUserData}
              setCurrentPage={setCurrentPage}
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
        <AddNewAuthorizedUser
          setIsModalOpen={SetAddAuthorizedUser}
          isModalOpen={addAuthorizedUser}
        />
      </Container>
    </ClientListSection>
  );
}

export default AuthorizedUser;
