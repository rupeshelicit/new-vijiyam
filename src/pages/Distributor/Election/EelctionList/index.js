import React, { useState } from "react";
import { Container } from "styles/components/common/Layout";
import deleteIcon from "assets/svg/trans-icon.svg";

import TableComponent from "components/common/Table";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import VoterFilter from "components/common/FiltersComponent";
import PlusIcons from "assets/svg/plusIcons";
import SwitchComponent from "components/common/SwitchComponent";
import { ClientListSection } from "styles/pages/SuperAdmin/user";
import { useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";

function ElectionsList() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("addNewclient");
  const [accountStatus, setAccountStatus] = useState(false);
  const [userPermissions, setUserPermissions] = useState(false);
  const [openExportDrawer, setOpeExportDrawer] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

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
      title: "Sheet ",
      dataIndex: "sheet",
      key: "sheet",
      align: "center",
      render:(record)=>record?record:'NA',
      sorter: (a, b) => a.sheet?.localeCompare(b.sheet ?? "") ?? 0,
    },
    {
      title: "Election Type",
      dataIndex: "electionType",
      key: "electionType",
      align: "center",
      render:(record)=>record?record:'NA',

      sorter: (a, b) =>
        a.electionType?.localeCompare(b.electionType ?? "") ?? 0,
    },
    {
      title: "Election Date",
      dataIndex: "electionDate",
      key: "electionDate",
      align: "center",
      render:(record)=>record?record:'NA',

      sorter: (a, b) =>
        a.electionDate?.localeCompare(b.electionDate ?? "") ?? 0,
    },
    {
      title: "Achar sanhita Date",
      dataIndex: "acharSanhitaDate",
      key: "acharSanhitaDate",
      align: "center",
      render:(record)=>record?record:'NA',

      sorter: (a, b) =>
        a.acharSanhitaDate?.localeCompare(b.acharSanhitaDate ?? "") ?? 0,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      align: "center",
      render:(record)=>record?record:'NA',

      sorter: (a, b) => a.state?.localeCompare(b.state ?? "") ?? 0,
    },
  ];

  const data = [
    {
      key: "1",
      serialNumber: "01",
      sheet: "Sheet 1",
      electionType: "General Election",
      electionDate: "2025-01-01",
      acharSanhitaDate: "2024-12-01",
      state: "Madhya Pradesh",
    },
    {
      key: "2",
      serialNumber: "02",
      sheet: "Sheet 2",
      electionType: "Assembly Election",
      electionDate: "2025-03-15",
      acharSanhitaDate: "2025-02-15",
      state: "Uttar Pradesh",
    },
    {
      key: "3",
      serialNumber: "03",
      sheet: "Sheet 3",
      electionType: "Municipal Election",
      electionDate: "2025-05-10",
      acharSanhitaDate: "2025-04-10",
      state: "Rajasthan",
    },
    {
      key: "4",
      serialNumber: "04",
      sheet: "Sheet 4",
      electionType: "General Election",
      electionDate: "2025-07-20",
      acharSanhitaDate: "2025-06-20",
      state: "Gujarat",
    },
    {
      key: "5",
      serialNumber: "05",
      sheet: "Sheet 5",
      electionType: "Panchayat Election",
      electionDate: "2025-09-05",
      acharSanhitaDate: "2025-08-05",
      state: "Maharashtra",
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
  return (
    <ClientListSection>
      <Container>
        <div className="py-[20px]">
          {/* <div className="client-list-fillter">
            <VoterFilter />
          </div> */}
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
