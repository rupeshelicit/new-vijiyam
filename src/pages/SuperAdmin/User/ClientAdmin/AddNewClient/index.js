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
  GET_ASSEMBLY_LIST,
  GET_DISTRICT_LIST_BY_STATE,
  GET_ELECTION_PARTY,
  GET_STATE_LIST,
} from "constants/api";
import UploadFile from "components/common/FormControl/UploadFile";

const { Option } = Select;
const UploadIcon = () => (
  <svg
    width="70"
    height="50"
    viewBox="0 0 70 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.306 9.45713C55.6002 3.93341 66.2299 10.3731 66.2299 17.1161C66.2299 21.4711 64.5621 23.1793 61.9791 24.9999C75.0065 31.9734 69.1105 47.3982 57.7453 49.9999H18.0512C-0.59142 49.9999 -7.48693 24.719 12.3629 18.594C8.64003 3.74236 37.7326 -9.66514 48.306 9.45713ZM30.3598 39.0761V30.1528H22.3805L34.8969 15.082L47.4132 30.1528H39.434V39.0761H30.3598Z"
      fill="black"
      fillOpacity="0.5"
    />
  </svg>
);

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
  const { mutateAsync: AddNewClients } = usePost();
  const { mutateAsync: GetStateList } = useGet();
  const { mutateAsync: GetAssemblyList } = useGet();
  const { mutateAsync: GetDistrictList } = useGet();
  const { mutateAsync: GetPartyList } = useGet();
  const handleUpload = (info) => {
    console.log(info, "-------------files");
  };

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

  const onFinish = (creds) => {
    // setLoading(true);
    console.log(creds, "Client-Creads", partySymbole, candidatesPhoto);

    const payload = creds;
    // await AddNewClients({
    //   url: "url",
    //   type: "details",
    //   payload: payload,
    // })
    //   .then((res) => {
    //     if (res) {
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

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

  const handleSubmit = (creds) => {
    const formData = new FormData();
    console.log(creds,candidatesPhoto,partySymbole)
  
    if (creds && candidatesPhoto && partySymbole) {
      formData.append("image", candidatesPhoto);
      formData.append("partyIcon", partySymbole);
      formData.append("name", creds?.fullName);
      formData.append("fatherName", creds?.fatherName);
      formData.append("partyId", creds.partyName);
      formData.append("dateOfBirth", creds.dateOfBirth);
      formData.append("gender", creds?.gender);
      formData.append("districtId", creds.districtName);
      formData.append("stateId", creds.stateName);
      formData.append("vidhansabhaId", creds?.assemblyName);
      formData.append("userId", creds?.userName);
      formData.append("password", creds?.password);
  
      // Debugging: Check the contents of FormData
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }
    } else {
      console.error("Missing required data");
    }
  
    // Uncomment this block for an actual API call
    // fetch("/api/upload", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Response:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
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
                    { required: false, message: "Please enter the name" },
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
                      required: false,
                      message: "Please enter the Father Name",
                    },
                  ]}
                >
                  <FormInput
                    name="fatherName"
                    placeholder="Father Name"
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
                      required: false,
                      message: "Please select a Date of Birth ",
                    },
                  ]}
                >
                  <DatePicker
                    className="w-[100%]"
                    name="electionDate"
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
                      required: false,
                      message: "Please enter the Gmail",
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
                  name="mobileNumbe"
                  rules={[
                    {
                      required: false,
                      message: "Please Input Your Phone Number!",
                    },
                    {
                      pattern: /^[6-9]\d{9}$/,
                      message: "Please enter a valid 10-digit mobile number!",
                    },
                  ]}
                >
                  <FormInput  name =" mobileNumbe"placeholder="Enter Mobile Number" maxLength={10} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[
                    { required: false, message: "Please select a Gender" },
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
                      required: false,
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
                      required: false,
                      message: "Please select a State Name",
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
                      required: false,
                      message: "Please select an Assembly Name",
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
                      required: false,
                      message: "Please select a Party Name",
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
                      required: false,
                      message: "Please select a District",
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
                <Form.Item name="photos" className="mb-1 image-upload">
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
                <Form.Item name="photos" className="mb-1 image-upload">
                  <label className="text-[16px] font-normal mb-[20px]">
                    Candidates Photo
                  </label>
                  <div className="flex justify-between gap-[50px] mt-[15px] ">
                    <UploadFile
                      inputLable={"Upload Candidates Photo"}
                      setFile={setCandidatesPhoto}
                      inputName="candidatesPhoto"
                    />

                    {candidatesPhoto && candidatesPhoto.name}
                  </div>
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
                    <Switch />
                  </div>
                  <label className="text-[20px] font-semibold items-center">
                    Slip Settings{" "}
                  </label>
                </div>
                <div className="flex gap-[50px] items-center mb-[10px]">
                  <div className="settings ">
                    <Switch />
                  </div>
                  <label className="text-[20px] font-semibold items-center">
                    with Candidate Image
                  </label>
                </div>
                <div className="flex gap-[50px] items-center mb-[10px]">
                  <div className="settings ">
                    <Switch />
                  </div>
                  <label className="text-[20px] font-semibold items-center">
                    Slip Settings{" "}
                  </label>
                </div>
                <div className="flex gap-[50px] items-center mb-[10px]">
                  <div className="settings ">
                    <Switch />
                  </div>
                  <label className="text-[20px] font-semibold items-center">
                    Slip Settings{" "}
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
                  rules={[{ required: false, message: "Please user name" }]}
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
                      required: false,
                      message: "Please enter the email",
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
                  rules={[
                    { required: false, message: "Please enter password" },
                  ]}
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
