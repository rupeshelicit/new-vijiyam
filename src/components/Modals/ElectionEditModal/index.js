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
  Card,
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
  GET_ASSEMBLY_LIST_BY_DISTRICT,
  GET_DISTRICT_LIST_BY_STATE,
  GET_STATE_LIST,
  UPDATE_ELECTION_DETAILS,
} from "constants/api";
import useGet from "hooks/useGet";
import usePatch from "hooks/usePatch";
import { toast } from "react-toastify";
import { ClientAdminComponent } from "styles/pages/SuperAdmin/user";
import { Container } from "styles/components/common/Layout";
import moment from "moment";
const { Option } = Select;

const ElectionEditModal = ({ isOpen, setIsOpen, ElectionData, onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [states, setStates] = useState([]);
  const [assambly, setAssambly] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [selectDistrict, setSelectDistrict] = useState();
  const [selectState, setSelectState] = useState();
  const { mutateAsync: UpdateElectionDetails } = usePatch();
  const { mutateAsync: GetStateList } = useGet();
  const { mutateAsync: GetAssemblyList } = useGet();
  const { mutateAsync: GetDistrictList } = useGet();

  useEffect(() => {
    if (isOpen) {
      ElectionData && getStateList();
      {
        selectDistrict && getAssemblyist();
      }
      {
        selectState && getDistrict();
      }
      setSelectState(ElectionData?.stateId);
    }
  }, [ElectionData, selectState, isOpen, selectDistrict]);

  const handleClose = () => {
    setIsOpen(false);
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

  const handleSubmit = async (creds) => {
    setLoading(true);
    const id = ElectionData?.id;
    const payload = {
      id: id,
      name: creds?.name,
      electionType: creds?.electionType,
      stateId: creds?.stateId,
      districtId: creds?.districtName,
      vidhansabhaId: creds?.vidhansabhaId,
      // electionDate: creds?.electionDate,
      // acharSanhitaDate: creds?.acharSanhitaDate,
    };
    await UpdateElectionDetails({
      url: UPDATE_ELECTION_DETAILS,
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

  return (
    <Modal
      className="edit-modal"
      title={
        <div className="flex items-center space-x-2">
          <UserOutlined className="text-#54408C-500" />
          <span className="text-xl font-semibold">Edit Voter Details</span>
        </div>
      }
      visible={isOpen}
      onCancel={handleClose}
      footer={null}
      width={700}
    >
      <ClientAdminComponent>
        <Container>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            form={form}
            initialValues={ElectionData}
            className="mt-4"
          >
            <Row
              gutter={[16, 16]}
              className="bg-[#EEEEEE63] rounded-[5px] px-[15px] py-[20px]"
            >
              <Col span={8}>
                {" "}
                <Form.Item
                  name="name"
                  label="Election Name"
                  rules={[
                    {
                      required: false,
                      message: "Please Enter Election Name ",
                    },
                  ]}
                >
                  <FormInput
                    name="name"
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
                  name="stateId"
                  label="State Name"
                  rules={[
                    {
                      required: false,
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
                      required: false,
                      message: "Please Select a District",
                    },
                  ]}
                >
                  <DropdownSelect
                    name={"districtId"}
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
                    placeholder="Select Assambly"
                    required={false}
                    disabled={selectState ? false : true}
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
                  {/* <DatePicker
                      className="w-[100%]"
                      name="electionDate"
                      required={false}
                    /> */}
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
                  {/* <DatePicker
                      className="w-[100%]"
                      name="acharSanhitaDate"
                      required={false}
                    /> */}
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
        </Container>
      </ClientAdminComponent>
    </Modal>
  );
};

export default ElectionEditModal;
