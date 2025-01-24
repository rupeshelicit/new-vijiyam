import React, { useEffect, memo, useState, useMemo } from "react";
import { Container } from "styles/components/common/Layout";
import deleteIcon from "assets/svg/trans-icon.svg";

import TableComponent from "components/common/Table";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import PlusIcons from "assets/svg/plusIcons";
import ExportToExcel from "components/common/ExportToExcel";
import ExcelIcons from "assets/svg/excelIcons";
import EditComponent from "components/common/Action/Edit";
import DeleteComponent from "components/common/Action/Delete";
import ViewComponent from "components/common/Action/View";

import { ClientListSection } from "styles/pages/SuperAdmin/user";
import { useNavigate } from "react-router-dom";
import useGet from "hooks/useGet";
import { GET_ELECTION_LIST } from "constants/api";
import { useMetaDataContext } from "context/metaData";

function ElectionsList() {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [electionData, setElectionData] = useState([]);
  const { mutateAsync: GetElectionsList } = useGet();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prevPage, setPrevPage] = useState(0);
  const { deleteStates, updateStatus } = useMetaDataContext();
  const [tableParams, setTableParams] = useState({
      current: 1,
      pageSize: 3,
      total: 0
  });
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  console.log(currentPage)

  const fetchElectionList = async (page, limit) => {
    setLoading(true);
    try {
      const response = await GetElectionsList({
        url: `${GET_ELECTION_LIST}?page=${page}&limit=${limit}`,
        type: "details",
        token: true,
      });

      if (response) {
        setLoading(false)
        setElectionData(response.items);
        setTableParams({...tableParams, total: response?.meta?.totalItems})
      }
    } catch (error) {
      setLoading(false)
      console.error("Error fetching election list:", error);
    }
  };
  // Recall API when deleteStates or updateStatus changes
  useMemo(() => {
      fetchElectionList(currentPage,3);
      setPrevPage(currentPage);
  }, [currentPage]);

  

  const handleDelete = () => {
    fetchElectionList(currentPage, 3);
  }

  // Table columns
  const columns = [
    {
      title: "S.NO",
      dataIndex: "serialNumber",
      key: "serialNumber",
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Election Type",
      dataIndex: "electionType",
      key: "electionType",
      align: "center",
      sorter: (a, b) => a.electionType.localeCompare(b.electionType),
      render: (text) => text || "NA",
    },
    {
      title: "State Name",
      dataIndex: "state",
      key: "state",
      align: "center",
      sorter: (a, b) => a.state?.name.localeCompare(b.state?.name),
      render: (_, record) => record?.state?.name || "NA",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
      align: "center",
      sorter: (a, b) => a.district?.name.localeCompare(b.district?.name),
      render: (_, record) => record?.district?.name || "NA",
    },
    {
      title: "Vidhansabha",
      dataIndex: "vidhansabha",
      key: "vidhansabha",
      align: "center",
      sorter: (a, b) => a.vidhansabha?.localeCompare(b.vidhansabha),
      render: (_, record) => record?.name || "NA",
    },
    {
      title: "Achar Sanhita Date",
      dataIndex: "acharSanhitaDate",
      key: "acharSanhitaDate",
      align: "center",
      sorter: (a, b) => a.acharSanhitaDate.localeCompare(b.acharSanhitaDate),
      render: (date) =>
        date ? new Date(date).toLocaleDateString() : "NA",
    },
    {
      title: "Election Date",
      dataIndex: "electionDate",
      key: "electionDate",
      align: "center",
      sorter: (a, b) => a.electionDate.localeCompare(b.electionDate),
      render: (date) =>
        date ? new Date(date).toLocaleDateString() : "NA",
    },
    {
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      render: (date) =>
        date ? new Date(date).toLocaleDateString() : "NA",
    },
    {
      title: "Update Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
      render: (date) =>
        date ? new Date(date).toLocaleDateString() : "NA",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2">
          <EditComponent record={record} roleType={"election"} />
          <DeleteComponent record={record} roleType={"election"} handleDelete={handleDelete} />
          <ViewComponent record={record} roleType={"election"} />
        </div>
      ),
    },
  ];

  // Handle row selection
  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange = (pagination) => {
    console.log("--->", pagination)
    setTableParams({ ...tableParams, current: pagination.current })
    setCurrentPage(pagination.current)
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
                data={electionData}
                columns={columns}
                excelName="ElectionList"
              />
            </div>
          </div>

          <TableComponent
            rowSelection={rowSelection}
            columns={columns}
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
