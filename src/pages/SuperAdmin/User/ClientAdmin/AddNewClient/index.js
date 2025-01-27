import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Form,
  Input,
  Select,
  Button,
  Upload,
  Switch,
  DatePicker,
} from "antd";
import { Container } from "styles/components/common/Layout";
import { ClientAdminComponent } from "styles/pages/SuperAdmin/user";
import FormInput from "components/common/FormControl/FormInput";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
import usePost from "hooks/usePost";
import useGet from "hooks/useGet";
import {
  CREAT_CLIENT,
  GET_ASSEMBLY_LIST_BY_DISTRICT,
  GET_DISTRICT_LIST_BY_STATE,
  GET_ELECTION_PARTY,
  GET_STATE_LIST,
} from "constants/api";
import UploadFile from "components/common/FormControl/UploadFile";
import { toast } from "react-toastify";

const { Option } = Select;

const AddNewClient = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const [partySymbole, setPartySymbole] = useState();
  const [candidatesPhoto, setCandidatesPhoto] = useState();
  const [states, setStates] = useState([]);
  const [assambly, setAssambly] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [party, setParty] = useState([]);
  const [password, setPassword] = useState();
  const [confirmassword, setConfirmPassword] = useState();
  const [selectState, setSelectState] = useState();
  const [selctedDistrict, setSelctedDistrict] = useState();
  const [slipSettings, setSlipSettings] = useState(false);
  const [candidateImage, setCandidateImage] = useState(false);
  const [isOnline, setiIsOnline] = useState(false);
  const [status, setStatus] = useState(false);
  const [isPermission, setIsPermission] = useState(false);
  const { mutateAsync: AddNewClients } = usePost();
  const { mutateAsync: GetStateList } = useGet();
  const { mutateAsync: GetAssemblyList } = useGet();
  const { mutateAsync: GetDistrictList } = useGet();
  const { mutateAsync: GetPartyList } = useGet();
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const usersRole = JSON.parse(localStorage.getItem("roleList"));
  const clientRole = usersRole.filter((item) => item.name === "clientAdmin");
  console.log(candidateImage, partySymbole, "dddddddddddddddd");
  useEffect(() => {
    getStateList();
    getElectionParty();
    {
      selctedDistrict && getAssemblyist();
    }
    {
      selectState && getDistrict();
    }
  }, [selectState, selctedDistrict]);

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
      url: GET_ASSEMBLY_LIST_BY_DISTRICT + selctedDistrict,
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
      url: GET_DISTRICT_LIST_BY_STATE + selectState,
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
          console.log(res, "-------------->party");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormSubmit = async (creds) => {
    const formData = new FormData();
    setLoading(true);

    formData.append("image", creds?.image || null);
    formData.append("partyIcon", creds?.partyIcon || null);
    formData.append("name", creds?.name || "");
    formData.append("fatherName", creds?.fatherName || "");
    formData.append("partyId", parseInt(creds?.partyId || 0, 10));
    formData.append("dateOfBirth", creds?.dateOfBirth || "");
    formData.append("gender", creds?.gender || "");
    formData.append("email", creds?.email || "");
    formData.append("mobileNumber", creds?.mobileNumber || "");
    formData.append("districtId", parseInt(creds?.districtId || 0, 10));
    formData.append("stateId", parseInt(creds?.stateId || 0, 10));
    formData.append("vidhansabhaId", parseInt(creds?.vidhansabhaId || 0, 10));
    formData.append("userId", loginUsers?.id || 0);
    formData.append("password", creds?.password || "");
    formData.append("role", clientRole[0]?.id);
    formData.append("isCandidateImage", candidateImage || false);
    formData.append("isSlipSetting", slipSettings || false);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const payload = formData;

    try {
      const res = await AddNewClients({
        url: CREAT_CLIENT,
        type: "details",
        payload: payload,
      });
      if (res) {
        toast.success("Success! You have successfully created a new client", {
          position: "top-right",
        });
        form.resetFields();
      }
    } catch (error) {
      toast.error(`Error! ${error?.response?.data?.message}`, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientAdminComponent>
      <Container>
        <Row className="flex justify-between items-center input ">
          <h3
            className="text-[20px] font-semibold mb-[10px] mt-[20px]"
            style={{ marginBottom: "10px" }}
          >
            Add New Client
          </h3>
        </Row>

        <Card>
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Row
              gutter={[16, 16]}
              className="bg-[#EEEEEE63] rounded-[5px] px-[15px] py-[20px]"
            >
              <Col span={8}>
                {" "}
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please Enter Full Name " },
                  ]}
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
                  rules={[
                    { required: true, message: "Please Select a Gender" },
                  ]}
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
                    disabled={selectState ? false : true}
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
                    disabled={selctedDistrict ? false : true}
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
                      required: true,
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
              <Col span={8}>
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
                  </div>
                </Form.Item>

                <p className="mt-[60px] text-left">
                  Uploaded file:
                  {partySymbole && partySymbole.name}{" "}
                </p>
              </Col>
              <Col span={8}>
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
                </Form.Item>
                <p className="mt-[25px] text-left">
                  Uploaded file:
                  {candidatesPhoto && candidatesPhoto.name}
                </p>
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

            <h4
              className="text-[18px] font-semibold mb-[5px] text-[#54408C] mt-[10px]"
              style={{ marginBottom: "10px" }}
            >
              Login Details
            </h4>
            <Row
              gutter={[16, 16]}
              className="bg-[#EEEEEE63] rounded-[5px] px-[15px] py-[20px]"
            >
              <Col span={8}>
                {" "}
                <Form.Item
                  name="userName"
                  label="User Name"
                  rules={[
                    { required: true, message: "Please Enter User Name" },
                  ]}
                >
                  <FormInput
                    name="userName"
                    placeholder="User Name "
                    required={false}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                {" "}
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter  email",
                    },
                  ]}
                >
                  <FormInput
                    name="email"
                    type="email"
                    placeholder="abc@gmail.com"
                    required={false}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: "Please Enter password" }]}
                >
                  <FormInput
                    name="password"
                    placeholder="Enter password"
                    required={false}
                    type={"password"}
                    onchange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                {" "}
                <Form.Item
                  name="confirmassword"
                  label="Confirm Password"
                  rules={[
                    {
                      required: false,
                      message: "Please Please Confirm Password",
                    },
                  ]}
                >
                  <FormInput
                    name="confirmassword"
                    placeholder="Confirm Password"
                    required={false}
                    type={"password"}
                    onchange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Item>
                <p className="text-[16px] text-[red]">
                  {confirmassword !== password && password.length >= 3
                    ? "Passwords do not match, please check"
                    : ""}
                </p>
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
        </Card>
      </Container>
    </ClientAdminComponent>
  );
};

export default AddNewClient;
