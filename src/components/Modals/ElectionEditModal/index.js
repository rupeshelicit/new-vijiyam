import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Row, Col, DatePicker, Select } from "antd";
import { toast } from "react-toastify";
import useGet from "hooks/useGet";
import usePatch from "hooks/usePatch";
import {
  GET_ASSEMBLY_LIST_BY_DISTRICT,
  GET_DISTRICT_LIST_BY_STATE,
  GET_STATE_LIST,
  UPDATE_ELECTION_DETAILS,
} from "constants/api";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
import { ClientAdminComponent } from "styles/pages/SuperAdmin/user";
import { Container } from "styles/components/common/Layout";
import moment from "moment";
import FormInput from "components/common/FormControl/FormInput";
import { useMetaDataContext } from "context/metaData";
const { Option } = Select;

const ElectionEditModal = ({ isOpen, setIsOpen, ElectionData, onSubmit }) => {
  const [form] = Form.useForm();
  const { updateEditState } = useMetaDataContext();
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [assemblies, setAssemblies] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [selectDistrict, setSelectDistrict] = useState();
  const [selectState, setSelectState] = useState();
  const { mutateAsync: UpdateElectionDetails } = usePatch();
  const { mutateAsync: GetStateList } = useGet();
  const { mutateAsync: GetAssemblyList } = useGet();
  const { mutateAsync: GetDistrictList } = useGet();

  useEffect(() => {
    if (isOpen) {
      getStateList();
      if (ElectionData) {
        setSelectState(ElectionData?.stateId);
        setSelectDistrict(ElectionData?.districtId);
      }
      if (selectState) {
        getDistrict();
      }
      if (selectDistrict) {
        getAssemblyList();
      }
    }
  }, [ElectionData, isOpen, selectState, selectDistrict]);

  const getStateList = async () => {
    const res = await GetStateList({
      url: GET_STATE_LIST,
      type: "details",
    });
    setStates(res || []);
  };

  const getDistrict = async () => {
    const res = await GetDistrictList({
      url: GET_DISTRICT_LIST_BY_STATE + selectState,
      type: "details",
    });
    setDistrictList(res?.districts || []);
  };

  const getAssemblyList = async () => {
    const res = await GetAssemblyList({
      url: GET_ASSEMBLY_LIST_BY_DISTRICT + selectDistrict,
      type: "details",
    });
    setAssemblies(res || []);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (creds) => {
    setLoading(true);
    const payload = {
      id: ElectionData?.id,
      name: creds?.name,
      electionType: creds?.electionType,
      stateId: creds?.stateId,
      districtId: creds?.districtName,
      vidhansabhaId: creds?.vidhansabhaId,
      electionDate: creds?.electionDate
        ? moment(creds.electionDate).toISOString()
        : null,
      acharSanhitaDate: creds?.acharSanhitaDate
        ? moment(creds.acharSanhitaDate).toISOString()
        : null,
    };

    await UpdateElectionDetails({
      url: UPDATE_ELECTION_DETAILS,
      type: "details",
      payload,
      token: true,
    })
      .then((res) => {
        if (res) {
          toast.success("Election updated successfully!", {
            position: "top-right",
          });
          form.resetFields();
          setIsOpen(false);
          updateEditState("election", true);
        }
      })
      .catch((error) => {
        toast.error(`Error: ${error?.response?.data?.message}`, {
          position: "top-right",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      title="Edit Election Details"
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
            initialValues={{
              ...ElectionData, // Spread ElectionData to include its fields
              electionDate: ElectionData?.electionDate
                ? moment(ElectionData.electionDate)
                : null,
              acharSanhitaDate: ElectionData?.acharSanhitaDate
                ? moment(ElectionData.acharSanhitaDate)
                : null,
            }}
            className="mt-4"
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Election Name"
                  rules={[
                    { required: true, message: "Please Enter Election Name" },
                  ]}
                >
                  <FormInput placeholder="Election Name" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="electionType"
                  label="Election Type"
                  rules={[
                    { required: true, message: "Please Select Election Type" },
                  ]}
                >
                  <DropdownSelect
                    name="electionType"
                    options={[
                      { id: "Vidhansabha", name: "Vidhansabha" },
                      { id: "LokSabha", name: "LokSabha" },
                      { id: "Nigam", name: "Nigam" },
                    ]}
                    placeholder="Select Election Type"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="stateId"
                  label="State"
                  rules={[{ required: true, message: "Please Select State" }]}
                >
                  <DropdownSelect
                    name="stateId"
                    options={states.map((state) => ({
                      id: state.id,
                      name: state.name,
                    }))}
                    placeholder="Select State"
                    setSelectState={setSelectState}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="districtName"
                  label="District"
                  rules={[
                    { required: true, message: "Please Select District" },
                  ]}
                >
                  <DropdownSelect
                    name="districtName"
                    options={districtList.map((district) => ({
                      id: district.id,
                      name: district.name,
                    }))}
                    placeholder="Select District"
                    setSelectState={setSelectDistrict}
                    disabled={!selectState}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="vidhansabhaId"
                  label="Assembly"
                  rules={[
                    { required: false, message: "Please Select Assembly" },
                  ]}
                >
                  <DropdownSelect
                    name="vidhansabhaId"
                    options={assemblies.map((assembly) => ({
                      id: assembly.id,
                      name: assembly.name,
                    }))}
                    placeholder="Select Assembly"
                    disabled={!selectDistrict}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="electionDate"
                  label="Election Date"
                  rules={[
                    { required: false, message: "Please select Election Date" },
                  ]}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    placeholder="Select Election Date"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="acharSanhitaDate"
                  label="Achar Sanhita Date"
                  rules={[
                    {
                      required: false,
                      message: "Please select Achar Sanhita Date",
                    },
                  ]}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    placeholder="Select Achar Sanhita Date"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    className="sigin-btn text-[16px] font-[500] h-[48px] bg-[#54408C]  mt-[30px]"
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
              </Col>
            </Row>
          </Form>
        </Container>
      </ClientAdminComponent>
    </Modal>
  );
};

export default ElectionEditModal;
