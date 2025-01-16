import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import SwitchComponent from 'components/common/SwitchComponent';
import { onChange } from 'react-toastify/dist/core/store';

export const columns = [
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
    sorter: true,
    render: (text, record) => (
      <SwitchComponent
        record={record.isPermission}
            switchStates={onChange(() => {
            
        })}
            setSwitchStates={onChange(() => {
            
        })}      
        text={text}
        onChange={async (checked) => {
          if (checked) {
            await updateUserPermission(record.id, true);
          } else {
            console.log("Permission revoked for:", record);
            await updateUserPermission(record.id, false);
          }

          setAccountStatus((prevState) => ({
            ...prevState,
            [record.id]: checked,
          }));
        }}
      />
    ),
    width: 50,
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
    title: "Voter Id",
    dataIndex: "voterId",
    key: "voterId",
    align: "center",
    sorter: (a, b) => a.voterId.localeCompare(b.voterId),
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
    title: "Caste",
    dataIndex: "casteId",
    key: "casteId",
    align: "center",
    sorter: (a, b) => a.casteId.localeCompare(b.casteId),
  },
  {
    title: "State Name",
    dataIndex: "stateId",
    key: "stateId",
    align: "center",
    sorter: (a, b) => a.stateId.localeCompare(b.stateId),
  },
  {
    title: "District",
    dataIndex: "districtId",
    key: "districtId",
    align: "center",
    sorter: (a, b) => a.districtId.localeCompare(b.districtId),
  },
  {
    title: "Nigam Ward Number",
    dataIndex: "nigamWardNumber",
    key: "nigamWardNumber",
    align: "center",
    sorter: (a, b) => a.nigamWardNumber.localeCompare(b.nigamWardNumber),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    align: "center",
    sorter: (a, b) => a.age.localeCompare(b.age),
  },
  {
    title: "Nigam ward",
    dataIndex: "section",
    key: "section",
    align: "center",
    sorter: (a, b) => a.section.localeCompare(b.section),
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    align: "center",
    sorter: (a, b) => a.designation.localeCompare(b.designation),
  },
  {
    title: "Vidhansabha",
    dataIndex: "vidhansabhaId",
    key: "vidhansabhaId",
    align: "center",
    sorter: (a, b) => a.vidhansabhaId.localeCompare(b.vidhansabhaId),
  },
  {
    title: "Loksabha",
    dataIndex: "loksabhaId",
    key: "loksabhaId",
    align: "center",
    sorter: (a, b) => a.loksabhaId.localeCompare(b.loksabhaId),
  },

  {
    title: "House No",
    dataIndex: "houseNo",
    key: "houseNo",
    align: "center",
    sorter: (a, b) => parseInt(a.houseNo) - parseInt(b.houseNo),
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    align: "center",
    sorter: (a, b) => a.city.localeCompare(b.city),
  },
  {
    title: "Vidhansabha",
    dataIndex: "vidhansabha",
    key: "vidhansabha",
    align: "center",
    sorter: (a, b) => a.vidhansabha.localeCompare(b.vidhansabha),
  },
  {
    title: "LokSabha",
    dataIndex: "loksabha",
    key: "loksabha",
    align: "center",
    sorter: (a, b) => a.loksabha.localeCompare(b.loksabha),
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
    align: "center",
    sorter: (a, b) => a.mobileNumber.localeCompare(b.mobileNumber),
  },
  {
    title: "District",
    dataIndex: "district",
    key: "district",
    align: "center",
    sorter: (a, b) => a.district.localeCompare(b.district),
  },
  {
    title: "Address",
    dataIndex: "newAddress",
    key: "newAddress",
    align: "center",
    sorter: (a, b) => a.newAddress.localeCompare(b.newAddress),
  },

  {
    title: "Create Date",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
  },
  {
    title: "Update Date",
    dataIndex: "updatedAt",
    key: "updatedAt",
    align: "center",
    sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    render: (text, record) => (
      <div>
      
          <Button
            icon={<EditOutlined />}
            onClick={handleEdit}
            size="small"
            style={{ marginRight: 8 }}
          />
  
      
          <Button
            icon={<SaveOutlined />}
            onClick={handleUpdate}
            size="small"
            style={{ marginRight: 8 }}
          />
  
        <Button
          icon={<DeleteOutlined />}
          onClick={handleDelete}
          size="small"
          danger
        />
      </div>
    ),
  },
];
