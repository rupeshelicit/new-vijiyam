import React from "react";
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

const { Option } = Select;

const AddElections = () => {
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
  const handleFinish = (values) => {
    console.log("Form values:", values);
  };
  const handleUpload = (info) => {};

  return (
    <ClientAdminComponent>
      <Container>
        <Row className="flex justify-between items-center input ">
          <h3
            className="text-[20px] font-semibold mb-[10px] mt-[20px]"
            style={{ marginBottom: "10px" }}
          >
            Add New Election
          </h3>
        </Row>

        <Card>
          <Form layout="vertical" onFinish={handleFinish} className="mt-4">
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
                      message: "Please select a Assembly Name",
                    },
                  ]}
                >
                  <DropdownSelect
                    name={"assemblyName"}
                    placeholder="Select Assembly Name"
                    options={["Indore-1", "Indore-2", "Indore-3"]}
                    required={false}
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
                  <DatePicker className="w-[100%]" name="electionDate" required={false} />
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
                  <DatePicker className="w-[100%]" name="acharSanhitaDate" required={false}  />
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
                    with Candidate  Image
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

export default AddElections;
