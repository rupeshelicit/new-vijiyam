import React, { useState } from "react";
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
} from "antd"; // Import Ant Design components
import { Container } from "styles/components/common/Layout";
import { ClientAdminComponent } from "styles/pages/SuperAdmin/user";
import FormInput from "components/common/FormControl/FormInput";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
import usePost from "hooks/usePost";

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

const AddNewDistributor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [partySymbole, setPartySymbole] = useState();
  const [candidatesPhoto, setCandidatesPhoto] = useState();
  const { mutateAsync: AddNewDistributors } = usePost();

  const handleUpload = (info) => {};

  const onFinish = (creds) => {
    setLoading(true);
    const payload = creds;
    AddNewDistributors({
      url: "url",
      type: "details",
      payload: payload,
    })
      .then((res) => {
        if (res) {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
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
            Add New Distributor
          </h3>
        </Row>

        <Card>
          <Form layout="vertical" onFinish={onFinish} className="mt-4">
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
                  name="gmail"
                  label="Gmail"
                  rules={[
                    {
                      required: false,
                      message: "Please enter the Gmail",
                    },
                    {
                      pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message:
                        "Please enter a valid Gmail address (e.g., user@gmail.com)",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Gmail"
                    maxLength={50}
                    name="email"
                    className="email"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                {" "}
                <Form.Item
                  name="dateOfBirth"
                  label="Date Of Birth"
                  rules={[
                    {
                      required: false,
                      message: "Please select a Date Of Birth",
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
                  label="Phone Number"
                  name="phone"
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
                  <FormInput
                    placeholder="Enter Mobile Number"
                    maxLength={10} // Ensures the user cannot input more than 10 digits
                  />
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
                    options={["Female", "Other", "Male"]}
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
                    options={["VidhnaSabha", "LookSabha", "Other"]}
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
                    placeholder="Select State Nam"
                    options={["Madhya Pradesh", "Gujrat", "Other"]}
                    required={false}
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
                  <Select
                    showSearch
                    placeholder="Select Assembly Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.children ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.children ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.children ?? "").toLowerCase())
                    }
                  >
                    <Option value="Indore-1">Indore-1</Option>
                    <Option value="Indore-2">Indore-2</Option>
                    <Option value="Indore-3">Indore-3</Option>
                  </Select>
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
                    placeholder="Select Party Name"
                    options={["BJP", "Congress", "Other"]}
                    required={false}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="district"
                  label="District"
                  rules={[
                    {
                      required: false,
                      message: "Please select a District",
                    },
                  ]}
                >
                  <DropdownSelect
                    name={"district"}
                    placeholder="Select Party Name"
                    options={["Indore", "Ujjain", "Ujjain"]}
                    required={false}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="electionDate"
                  label="Election Date"
                  rules={[
                    {
                      required: false,
                      message: "Please select a election date",
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
                  name="acharSanhitaDate"
                  label="Achar Sanhita Date"
                  rules={[
                    {
                      required: false,
                      message: "Please select a Achar Sanhita Date",
                    },
                  ]}
                >
                  <DatePicker
                    className="w-[100%]"
                    name="acharSanhitaDate"
                    required={false}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={[16, 16]}
              className="bg-[#EEEEEE63] rounded-[5px] px-[15px] py-[20px]"
            >
              <Col span={8}>
                <Form.Item name="photos" className="mb-1 image-upload">
                  <label className="text-[16px] font-normal mb-[20px]">
                    Candidates Photo
                  </label>
                  <div className="flex justify-between gap-[50px]">
                    <Upload
                      className="max-w-[225px] h-[150px]"
                      listType="picture-card"
                      showUploadList={false}
                      beforeUpload={handleUpload}
                      onChange={setCandidatesPhoto}
                    >
                      <UploadIcon />
                    </Upload>
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
                    Wnpm ith Candidate Image
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
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
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

export default AddNewDistributor;
