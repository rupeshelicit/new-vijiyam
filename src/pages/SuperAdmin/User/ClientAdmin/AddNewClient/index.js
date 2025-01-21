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
  GET_ASSEMBLY_LIST,
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

  useEffect(() => {
    getStateList();
    getElectionParty();
    {
      selectState && getAssemblyist();
    }
    {
      selectState && getDistrict();
    }
  }, [selectState]);

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

  const getRoleList = async () => {
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
      url: GET_ASSEMBLY_LIST + selectState,
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (creds) => {
    const formData = new FormData();
    setLoading(true);

    formData.append("image", candidatesPhoto);
    formData.append("partyIcon", partySymbole);
    formData.append("name", creds?.fullName || "");
    formData.append("fatherName", creds?.fatherName || "");
    formData.append("partyId", creds?.partyName || "");
    formData.append("dateOfBirth", creds?.dateOfBirth || "");
    formData.append("gender", creds?.gender || "");
    formData.append("email", creds?.email || "");
    formData.append("mobileNumber", creds?.mobileNumber || "");
    formData.append("districtId", creds?.districtName || "");
    formData.append("stateId", creds?.stateName || "");
    formData.append("vidhansabhaId", creds?.assemblyName || "");
    formData.append("userId", loginUsers.id || "");
    formData.append("password", creds?.password || "");
    formData.append("role", clientRole[0]?.id || "");
    formData.append("isCandidateImage", candidateImage || "");
    formData.append("isSlipSetting", slipSettings || "");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const payload = formData;

    await AddNewClients({
      url: CREAT_CLIENT,
      type: "details",
      payload: payload,
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
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            form={form}
            className="mt-4"
          >
            <h4
              className="text-[18px] font-semibold mb-[5px] text-[#54408C]"
              style={{ marginBottom: "10px" }}
            >
              Personal Details
            </h4>
            <Row
              gutter={[16, 16]}
              className="bg-[#EEEEEE63] rounded-[5px] px-[15px] py-[20px]"
            >
              <Col span={8}>
                {" "}
                <Form.Item
                  name="fullName"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please Enter Full Name " },
                  ]}
                >
                  <FormInput
                    name="fullName"
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
                  <DatePicker
                    className="w-[100%]"
                    name="dateOfBirth"
                    required={false}
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
                  name="stateName"
                  label="State Name"
                  rules={[
                    {
                      required: true,
                      message: "Please Select a State Name",
                    },
                  ]}
                >
                  <DropdownSelect
                    name={"stateName"}
                    placeholder="Select State Name"
                    options={states && states}
                    required={false}
                    setSelectState={setSelectState}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="assemblyName"
                  label="Assembly Name"
                  rules={[
                    {
                      required: true,
                      message: "Please Select  Assembly Name",
                    },
                  ]}
                >
                  <DropdownSelect
                    name={"assamblyName"}
                    options={assambly && assambly}
                    placeholder="Select Party Assambly"
                    required={false}
                    disabled={selectState ? false : true}
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
                  name="partyName"
                  label="Party Name"
                  rules={[
                    {
                      required: true,
                      message: "Please Select a Party Name",
                    },
                  ]}
                >
                  <DropdownSelect
                    name={"partyName"}
                    options={party && party}
                    placeholder="Select Party Name"
                    required={false}
                    disabled={false}
                    defaultOption={"Select Party Name"}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="districtName"
                  label="District"
                  rules={[
                    {
                      required: true,
                      message: "Please Select a District",
                    },
                  ]}
                >
                  <DropdownSelect
                    name={"districtName"}
                    options={districtList && districtList}
                    placeholder="Select Party District"
                    required={false}
                    disabled={selectState ? false : true}
                    defaultOption={
                      !districtList.length
                        ? "No District found  Select Correct State "
                        : "Select District"
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={[16, 16]}
              className="bg-[#EEEEEE63] rounded-[5px] px-[15px] py-[20px] client-upload-input-filed"
            >
              <Col span={6}>
                <Form.Item
                  name="photos"
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
              <Col span={6}>
                <Form.Item
                  name="photos"
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
                      inputName="candidatesPhoto"
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
              <Col span={8}>
                <div className="flex gap-[50px] items-center mb-[10px]">
                  <div className="settings ">
                    <Switch onChange={(checked) => setSlipSettings(checked)} />
                  </div>
                  <label className="text-[20px] font-semibold items-center">
                    Slip Settings{" "}
                  </label>
                </div>
                <div className="flex gap-[50px] items-center mb-[10px]">
                  <div className="settings ">
                    <Switch
                      onChange={(checked) => setCandidateImage(checked)}
                    />
                  </div>
                  <label className="text-[20px] font-semibold items-center">
                    with Candidate Image
                  </label>
                </div>
                <div className="flex gap-[50px] items-center mb-[10px]">
                  <div className="settings ">
                    <Switch onChange={(checked) => setiIsOnline(checked)} />
                  </div>
                  <label className="text-[20px] font-semibold items-center">
                    isOnline
                  </label>
                </div>
                <div className="flex gap-[50px] items-center mb-[10px]">
                  <div className="settings ">
                    <Switch onChange={(checked) => setStatus(checked)} />
                  </div>
                  <label className="text-[20px] font-semibold items-center">
                    status
                  </label>
                </div>
                <div className="flex gap-[50px] items-center mb-[10px]">
                  <div className="settings ">
                    <Switch onChange={(checked) => setIsPermission(checked)} />
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
