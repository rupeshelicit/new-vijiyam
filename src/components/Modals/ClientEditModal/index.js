import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Tag,
  Row,
  Col,
  Switch,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import FormInput from "components/common/FormControl/FormInput";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
import {
  GET_ASSEMBLY_LIST,
  GET_DISTRICT_LIST_BY_STATE,
  GET_ELECTION_PARTY,
  GET_STATE_LIST,
  UPDATE_CLIENT_DETAILS,
} from "constants/api";
import useGet from "hooks/useGet";
import usePatch from "hooks/usePatch";
import { toast } from "react-toastify";
import UploadFile from "components/common/FormControl/UploadFile";
import moment from "moment";
import { id } from "date-fns/locale";

const { Option } = Select;

const ClietEditModal = ({ isOpen, setIsOpen, ClientData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const [partySymbole, setPartySymbole] = useState();
  const [candidatesPhoto, setCandidatesPhoto] = useState();
  const [states, setStates] = useState([]);
  const [assambly, setAssambly] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [district, setSelctedDistrict] = useState();
  const [party, setParty] = useState([]);
  const [password, setPassword] = useState();
  const [confirmassword, setConfirmPassword] = useState();
  const [selectState, setSelectState] = useState();
  const [slipSettings, setSlipSettings] = useState(
    ClientData?.isOnline || false
  );
  const [candidateImage, setCandidateImage] = useState(
    ClientData?.isOnline || false
  );
  const [isOnline, setiIsOnline] = useState(ClientData?.isOnline || false);
  const [status, setStatus] = useState(ClientData?.status || false);
  const [isPermission, setIsPermission] = useState(
    ClientData?.isPermission || false
  );
  const { mutateAsync: GetStateList } = useGet();
  const { mutateAsync: GetAssemblyList } = useGet();
  const { mutateAsync: GetDistrictList } = useGet();
  const { mutateAsync: GetPartyList } = useGet();
  const { mutateAsync: updateClientDetails } = usePatch();
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const usersRole = JSON.parse(localStorage.getItem("roleList"));
  const clientRole = usersRole.filter((item) => item.name === "clientAdmin");
  const data = {
    ...ClientData,
    dateOfBirth: ClientData?.dateOfBirth
      ? moment(ClientData.dateOfBirth).isValid()
        ? moment(ClientData.dateOfBirth)
        : null
      : null,
  };
  const stateId = selectState ? selectState : data?.stateId;
  const districtId = district ? district : data?.districtId;
  useEffect(() => {
    getStateList();
    getElectionParty();
    {
      districtId && getAssemblyist();
    }
    {
      stateId && getDistrict();
    }
  }, [selectState, stateId, districtId]);

  const getStateList = async () => {
    await GetStateList({
      url: GET_STATE_LIST,
      type: "details",
    })
      .then((res) => {
        if (res) {
          setStates(res && res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAssemblyist = async () => {
    await GetAssemblyList({
      url: GET_ASSEMBLY_LIST + districtId,
      type: "details",
    })
      .then((res) => {
        if (res) {
          setAssambly(res && res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDistrict = async () => {
    await GetDistrictList({
      url: GET_DISTRICT_LIST_BY_STATE + stateId,
      type: "details",
    })
      .then((res) => {
        if (res) {
          setDistrictList(res && res.districts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getElectionParty = async () => {
    await GetPartyList({
      url: GET_ELECTION_PARTY,
      type: "details",
    })
      .then((res) => {
        if (res) {
          setParty(res && res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormSubmit = async (creds) => {
    setLoading(true);
    const clientId = ClientData.id;
    const payload = {
      id:clientId,
      image: candidatesPhoto,
      partyIcon: partySymbole,
      name: creds?.name,
      fatherName: creds?.fatherName,
      partyId: creds?.partyId,
      dateOfBirth: creds?.dateOfBirth,
      gender: creds?.gender,
      email: creds?.email,
      mobileNumber: creds?.mobileNumber,
      districtId: creds?.districtId,
      stateId: creds?.stateId,
      vidhansabhaId: creds?.vidhansabhaId,
      role: clientRole[0]?.id,
      isCandidateImage: creds?.isCandidateImage,
      isSlipSetting:creds?.isSlipSetting,
    };

    await updateClientDetails({
      url: UPDATE_CLIENT_DETAILS,
      type: "details",
      payload: payload,
      token: true,
    })
      .then((res) => {
        if (res) {
          toast.success("Success! You have successfully created a new client", {
            position: "top-right",
          });
          form.resetFields();
        }
      })
      .catch((error) => {
        toast.error(`Error! ${error?.response?.data?.message}`, {
          position: "top-right",
        });
      });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  console.log(data, "datasa");
  return (
    <Modal
      className="edit-modal"
      title={
        <div className="flex items-center space-x-2">
          <UserOutlined className="text-#54408C-500" />
          <span className="text-xl font-semibold">Update Client Details</span>
        </div>
      }
      visible={isOpen}
      onCancel={handleClose}
      footer={null}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={data}
        onFinish={handleFormSubmit}
      >
        <Row
          gutter={[16, 16]}
          className="bg-[#EEEEEE63] rounded-[5px] px-[15px] py-[20px]"
        >
          <Col span={8}>
            {" "}
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please Enter Full Name " }]}
            >
              <FormInput
                name="name"
                placeholder="First Name "
                required={false}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            {" "}
            <Form.Item
              name="fatherName"
              label="Father Name"
              rules={[
                {
                  required: true,
                  message: "Please Enter Father Name",
                },
              ]}
            >
              <FormInput
                name="fatherName"
                placeholder="Enter Father Name"
                required={false}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="dateOfBirth"
              label="DOB"
              rules={[
                {
                  required: true,
                  message: "Please Select  Date of Birth ",
                },
              ]}
            >
              {/* {moment(ClientData?.dateOfBirth).format('YYYY-MM-DD')} */}
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="Select Election Date"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please Enter Email",
                },
              ]}
            >
              <FormInput
                name="email"
                placeholder="Enter Gmail"
                required={false}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Phone Number"
              name="mobileNumber"
              rules={[
                {
                  required: true,
                  message: "Please Input Your Phone Number!",
                },
                {
                  pattern: /^[6-9]\d{9}$/,
                  message: "Please enter a valid 10-digit mobile number!",
                },
              ]}
            >
              <FormInput
                name="mobileNumber"
                placeholder="Enter Mobile Number"
                required={false}
                maxLength={10}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please Select a Gender" }]}
            >
              <DropdownSelect
                name={"gender"}
                placeholder="Please select a Gender"
                options={[
                  { id: "Male", name: "Male" },
                  { id: "Female", name: "Female" },
                  { id: "Other", name: "Other" },
                ]}
                required={false}
              />
            </Form.Item>
          </Col>
        </Row>

        <h4
          className="text-[18px] font-semibold mb-[5px] text-[#54408C] mt-[10px]"
          style={{ marginBottom: "10px" }}
        >
          Election Details{" "}
        </h4>
        <Row
          gutter={[16, 16]}
          className="bg-[#EEEEEE63] rounded-[5px] px-[15px] py-[20px]"
        >
          <Col span={8}>
            <Form.Item
              name="electionType"
              label="Election Type"
              rules={[
                {
                  required: true,
                  message: "Please select a Election Type",
                },
              ]}
            >
              <DropdownSelect
                name={"electionType"}
                placeholder="Select Election Typer"
                options={[
                  { id: "Vidhansabha", name: "Vidhansabha" },
                  { id: "LookSabha", name: "LookSabha" },
                  { id: "Nigam", name: "Nigam" },
                ]}
                required={false}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="stateId"
              label="State Name"
              rules={[
                {
                  required: true,
                  message: "Please Select a State Name",
                },
              ]}
            >
              <DropdownSelect
                name={"stateId"}
                placeholder="Select State Name"
                options={states && states}
                required={false}
                setSelectState={setSelectState}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="districtId"
              label="District"
              rules={[
                {
                  required: true,
                  message: "Please Select a District",
                },
              ]}
            >
              <DropdownSelect
                name={"districtId"}
                options={districtList && districtList}
                placeholder="Select Party District"
                required={false}
                disabled={stateId ? false : true}
                setSelectState={setSelctedDistrict}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="vidhansabhaId"
              label="Assembly Name"
              rules={[
                {
                  required: false,
                  message: "Please Select  Assembly Name",
                },
              ]}
            >
              <DropdownSelect
                name={"vidhansabhaId"}
                options={assambly && assambly}
                placeholder="Select Party Assambly"
                required={false}
                disabled={districtId ? false : true}
                defaultOption={
                  !assambly.length
                    ? "No Assambly found  Select Correct State "
                    : "Select Assambly"
                }
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="partyId"
              label="Party Name"
              rules={[
                {
                  required: false,
                  message: "Please Select a Party Name",
                },
              ]}
            >
              <DropdownSelect
                name={"partyId"}
                options={party && party}
                placeholder="Select Party Name"
                required={false}
                disabled={false}
                defaultOption={"Select Party Name"}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          className="bg-[#EEEEEE63] rounded-[5px] px-[15px] py-[20px] client-upload-input-filed"
        >
          <Col span={12}>
            <Form.Item
              name="partyIcon"
              className="mb-1 image-upload"
              rules={[
                {
                  required: false,
                  message: "Please Uoload a Party Symbole",
                },
              ]}
            >
              <label className="text-[16px] font-normal mb-[20px]">
                Party Symbols
              </label>
              <div className="  flex justify-between gap-[50px] mt-[15px] max-w-[140px] h-[110px] ">
                <UploadFile
                  inputLable={"Upload Party Icon"}
                  setFile={setPartySymbole}
                  inputName="partyIcon"
                />
                {partySymbole && partySymbole.name}
              </div>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="image"
              className="mb-1 image-upload"
              rules={[
                {
                  required: false,
                  message: "Please Uoload Candidate Photo ",
                },
              ]}
            >
              <label className="text-[16px] font-normal mb-[20px]">
                Candidates Photo
              </label>
              <div className="flex justify-between gap-[50px] mt-[15px] ">
                <UploadFile
                  inputLable={"Upload Candidates Photo"}
                  setFile={setCandidatesPhoto}
                  inputName="image"
                />
              </div>
              {candidatesPhoto && candidatesPhoto.name}
            </Form.Item>
          </Col>
        </Row>
        <h4
          className="text-[18px] font-semibold mb-[5px] text-[#54408C] mt-[10px]"
          style={{ marginBottom: "10px" }}
        >
          Settings
        </h4>
        <Row
          gutter={[16, 16]}
          className="bg-[#EEEEEE63] rounded-[5px] px-[15px] py-[20px]"
        >
          <Col span={16}>
            <div className="flex gap-[50px] items-center mb-[10px]">
              <div className="settings ">
                <Switch
                  onChange={(checked) => setSlipSettings(checked)}
                  checkedChildren="On"
                  unCheckedChildren="Off"
                />
              </div>
              <label className="text-[20px] font-semibold items-center">
                Slip Settings{" "}
              </label>
            </div>
            <div className="flex gap-[50px] items-center mb-[10px]">
              <div className="settings ">
                <Switch
                  checkedChildren="On"
                  unCheckedChildren="Off"
                  onChange={(checked) => setCandidateImage(checked)}
                />
              </div>
              <label className="text-[20px] font-semibold items-center">
                with Candidate Image
              </label>
            </div>
            <div className="flex gap-[50px] items-center mb-[10px]">
              <div className="settings ">
                <Switch
                  onChange={(checked) => setiIsOnline(checked)}
                  checked={isOnline}
                  checkedChildren="On"
                  unCheckedChildren="Off"
                />
              </div>
              <label className="text-[20px] font-semibold items-center">
                isOnline
              </label>
            </div>
            <div className="flex gap-[50px] items-center mb-[10px]">
              <div className="settings ">
                <Switch
                  onChange={(checked) => setStatus(checked)}
                  checked={status}
                  checkedChildren="On"
                  unCheckedChildren="Off"
                />
              </div>
              <label className="text-[20px] font-semibold items-center">
                status
              </label>
            </div>
            <div className="flex gap-[50px] items-center mb-[10px]">
              <div className="settings ">
                <Switch
                  onChange={(checked) => setIsPermission(checked)}
                  checked={isPermission}
                  checkedChildren="On"
                  unCheckedChildren="Off"
                />
              </div>
              <label className="text-[20px] font-semibold items-center">
                Permission
              </label>
            </div>
          </Col>
        </Row>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="sigin-btn text-[16px] font-[500] h-[48px] bg-[#54408C] max-w-[200px] mt-[30px]"
            style={{ width: "100%" }}
            // loading={loading}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#432C6A")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#54408C")
            }
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClietEditModal;
