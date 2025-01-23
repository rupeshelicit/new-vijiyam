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
import { GET_ELECTION_LIST } from "constants/api";
import { Button } from "antd";
import EditComponent from "components/common/Action/Edit";
import DeleteComponet from "components/common/Action/Delete";
import ViewComponent from "components/common/Action/View";
import ExportToExcel from "components/common/ExportToExcel";
import ExcelIcons from "assets/svg/excelIcons";

function ElectionsList() {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [ElecotionData, setElecotionData] = useState([]);
  const { mutateAsync: GetElectionsList } = useGet();
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));

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
      title: "Election Type",
      dataIndex: "electionType",
      key: "electionType",
      align: "center",
      render: (text, record) => record?.electionType,
      sorter: (a, b) => a.electionType.localeCompare(b.electionType),
    },
    {
      title: "State Name",
      dataIndex: "stateId",
      key: "stateId",
      align: "center",
      render: (text, record) => record?.state?.name,
      // {
      //   console.log(record?.state?.name, "ddddddddddddddd");
      // },

      sorter: (a, b) => a.stateId.localeCompare(b.stateId),
    },

    {
      title: "District",
      dataIndex: "districtId",
      key: "districtId",
      align: "center",
      render: (text, record) => record?.district,
      sorter: (a, b) => a.districtId.localeCompare(b.districtId),
    },
    {
      title: "Vidhansabha",
      dataIndex: "vidhansabhaId",
      key: "vidhansabhaId",
      align: "center",
      render: (text, record) => record?.vidhansabha?.name,
      sorter: (a, b) => a.vidhansabhaId.localeCompare(b.vidhansabhaId),
    },

    {
      title: "AcharSanhita Date",
      dataIndex: "acharSanhitaDate",
      key: "acharSanhitaDate",
      align: "center",
      render: (record) =>new Date(record?record:'NA').toLocaleDateString(),
      sorter: (a, b) => a.acharSanhitaDate.localeCompare(b.acharSanhitaDate),
    },
    {
      title: "Election Date",
      dataIndex: "electionDate",
      key: "electionDate",
      align: "center",
      render: (record) =>new Date(record?record:'NA').toLocaleDateString(),
      sorter: (a, b) => a.electionDate.localeCompare(b.electionDate),
    },
    {
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (record) =>new Date(record?record:'NA').toLocaleDateString(),
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      title: "Update Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (record) =>new Date(record?record:'NA').toLocaleDateString(),
      sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
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
    setSelectedRows(newSelectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const getElectionList = async (page, limit) => {
    const id = loginUsers.role;
    await GetElectionsList({
      url: `${GET_ELECTION_LIST}?page=${page}&limit=${limit}`,

      type: "details",
      token: true,
    })
      .then((res) => {
        if (res) {
          let newRes = [...ElecotionData];
          newRes = newRes.concat(res?.items);

          setElecotionData(newRes);
        }
      })
      .catch((error) => console.log(error));
  };

  useMemo(() => {
    if (currentPage > prevPage) {
      getElectionList(currentPage, 10);
      setPrevPage((prev) => prev + 1);
    }
  }, [currentPage]);
  return (
    <ClientListSection>
      <Container>
        <div className="py-[20px]">
          <div className="client-list-header flex justify-between items-center px-[22px] py-[20px] flex-wrap bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[4px]">
            <div>
              <h3 className="text-[17px] font-bold mb-[10px]">
                {" "}
                Election list
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
                  text={"Add Election"}
                  Icons={<PlusIcons />}
                  onClick={ () => navigate("/add-elections")}
                />
              </div>
              <div className="add-new-client">
                <ExportToExcel
                  buttonText={"Export Election List"}
                  Icons={<ExcelIcons />}
                  data={ElecotionData}
                  columns={columns}
                  excelName="ElectionList"
                />
              </div>
            </div>

            <TableComponent
              rowSelection={rowSelection}
              columns={columns}
              data={ElecotionData}
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
      </Container>
    </ClientListSection>
  );
}

export default ElectionsList;
