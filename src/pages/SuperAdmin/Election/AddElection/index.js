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
  CREAT_DISTRIBUTOR,
  CREAT_ELECTION,
  GET_ASSEMBLY_LIST,
  GET_ASSEMBLY_LIST_BY_DISTRICT,
  GET_DISTRICT_LIST_BY_STATE,
  GET_ELECTION_PARTY,
  GET_STATE_LIST,
} from "constants/api";
import { toast } from "react-toastify";
import moment from "moment";

const { Option } = Select;

const AddNewDistributor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const [states, setStates] = useState([]);
  const [assambly, setAssambly] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [party, setParty] = useState([]);
  const [selectState, setSelectState] = useState();
  const [selectDistrict, setSelectDistrict] = useState();
  const { mutateAsync: AddNewElection } = usePost();
  const { mutateAsync: GetStateList } = useGet();
  const { mutateAsync: GetAssemblyList } = useGet();
  const { mutateAsync: GetDistrictList } = useGet();
  const { mutateAsync: GetPartyList } = useGet();

  useEffect(() => {
    getStateList();
    // getElectionParty();
    {
      selectDistrict && getAssemblyist();
    }
    {
      selectState && getDistrict();
    }
  }, [selectState, selectDistrict]);

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
  const getAssemblyist = async () => {
    await GetAssemblyList({
      url: GET_ASSEMBLY_LIST_BY_DISTRICT + selectDistrict,
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
    setLoading(true);

    const payload = {
      name: creds?.eName,
      electionType: creds?.electionType,
      stateId: creds?.stateName,
      districtId: creds?.districtName,
      vidhansabhaId: creds?.assemblyName,
      electionDate: creds?.electionDate,
      acharSanhitaDate: creds?.acharSanhitaDate,
    };
    await AddNewElection({
      url: CREAT_ELECTION,
      type: "details",
      payload: payload,
      token: true,
    })
      .then((res) => {
        if (res) {
          toast.success(
            "Success! You have successfully created a new Election",
            {
              position: "top-right",
            }
          );
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
  const disablePreviousDates = (current) => {
    return current && current < moment().startOf("day");
  };
  return (
    <ClientAdminComponent>
      <Container>
        <Row className="flex justify-between items-center input ">
          <h3
            className="text-[20px] font-semibold mb-[10px] mt-[20px]"
            style={{ marginBottom: "10px" }}
          >
            Add Election
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
                {" "}
                <Form.Item
                  name="eName"
                  label="Election Name"
                  rules={[
                    { required: true, message: "Please Enter Election Name " },
                  ]}
                >
                  <FormInput
                    name="eName"
                    placeholder="Election Name "
                    required={false}
                  />
                </Form.Item>
              </Col>
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
                    setSelectState={setSelectDistrict}
                    options={districtList && districtList}
                    placeholder="Select District"
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
                    placeholder="Select Assambly"
                    required={false}
                    disabled={selectDistrict ? false : true}
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
                    disabledDate={disablePreviousDates}
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
                    disabledDate={disablePreviousDates}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="sigin-btn text-[16px] font-[500] h-[48px] bg-[#54408C] max-w-[200px] mt-[30px]"
                style={{ width: "100%" }}
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
