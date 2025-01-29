import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, Row, Col, Switch } from "antd";
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
  GET_ELECTION_PARTY,
  GET_PARTY_LIST,
  GET_STATE_LIST,
  UPDATE_KARYAKARTA_DETAILS,
} from "constants/api";
import useGet from "hooks/useGet";
import usePatch from "hooks/usePatch";
import { toast } from "react-toastify";
import moment from "moment";
import { useMetaDataContext } from "context/metaData";

const { Option } = Select;

const KarykartaEditModal = ({ isOpen, setIsOpen, karyakartaData, onSubmit }) => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assambly, setAssambly] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [district, setSelctedDistrict] = useState();
  const [status, setStatus] = useState(karyakartaData?.status || false);
  const [isPermission, setIsPermission] = useState(
    karyakartaData?.isPermission || false
  );
  const { updateEditState } = useMetaDataContext();
  const [party, setParty] = useState([]);
  const [selectState, setSelectState] = useState();
  const { mutateAsync: GetPartyList } = useGet();
  const { mutateAsync: GetStateList } = useGet();
  const { mutateAsync: GetAssemblyList } = useGet();
  const { mutateAsync: GetDistrictList } = useGet();
  const [form] = Form.useForm();

  const { mutateAsync: UpdateKarykartaDetails } = usePatch();
  const data = {
    ...karyakartaData,
    dateOfBirth: karyakartaData?.dateOfBirth
      ? moment(karyakartaData.dateOfBirth).isValid()
        ? moment(karyakartaData.dateOfBirth)
        : null
      : null,
  };
  const stateId = selectState ? selectState : data?.stateId;
  const districtId = district ? district : data?.districtId;
  useEffect(() => {
    getPartyList();
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      getStateList();
      {
        districtId && getAssemblyist();
      }
      {
        stateId && getDistrict();
      }
    }
  }, [selectState, stateId, districtId, isOpen]);

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
      url: GET_ASSEMBLY_LIST_BY_DISTRICT + districtId,
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

  const handleFormSubmit = async (creds) => {
    setLoading(true);
    if (creds) {
      const payload = {
        id: karyakartaData?.id,
        name: creds?.name,
        email: creds?.email,
        mobileNumber: creds?.mobileNumber,
        gender: creds?.gender,
        stateId: creds?.stateId,
        partyId: creds?.partyId,
        designation: creds?.designation,
        stateId: creds.stateId,
        districtId: creds?.districtId,
        assemblyId: creds?.assemblyId,
        isPermission: isPermission,
        status: status,
      };
      await UpdateKarykartaDetails({
        url: UPDATE_KARYAKARTA_DETAILS,
        type: "details",
        payload: payload,
        token: true,
      })
        .then((res) => {
          if (res) {
            toast.success(
              "Success! You have successfully update karyakarta details",
              {
                position: "top-right",
              }
            );
            updateEditState("karyakarta", true);
          }
        })
        .catch((error) => {
          toast.error(`Error! ${error?.response?.data?.message}`, {
            position: "top-right",
          });
        });
    }
    setTimeout(() => {
      setLoading(false);
      handleClose();
    }, 3000);
  };

  const getPartyList = async () => {
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

  return (
    <Modal
      className="edit-modal"
      title={
        <div className="flex items-center space-x-2">
          <UserOutlined className="text-#54408C-500" />
          <span className="text-xl font-semibold">Edit Karykarta Details</span>
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
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please Enter Full Name" }]}
            >
              <FormInput name="name" placeholder="Full Name" required={false} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please Enter Email" }]}
            >
              <FormInput
                name="email"
                placeholder="Enter Email"
                required={false}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Phone Number"
              name="mobileNumber"
              rules={[
                { required: true, message: "Please Input Your Phone Number!" },
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

          <Col span={8}>
            <Form.Item
              name="partyId"
              label="Party Name"
              rules={[
                { required: true, message: "Please Select a Party Name" },
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

          <Col span={8}>
            <Form.Item label="Designation" name="designation">
              <FormInput
                name="designation"
                placeholder="Enter Designation"
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
            <div className="flex gap-[20px] items-center mb-[10px]">
              <div className="settings ">
                <Switch
                  onChange={(checked) => setStatus(checked)}
                  checked={status}
                  checkedChildren="On"
                  unCheckedChildren="Off"
                />
              </div>
              <label className="text-[20px] font-medium items-center">
                Status
              </label>
            </div>
            <div className="flex gap-[20px] items-center mb-[10px]">
              <div className="settings ">
                <Switch
                  onChange={(checked) => setIsPermission(checked)}
                  checked={isPermission}
                  checkedChildren="On"
                  unCheckedChildren="Off"
                />
              </div>
              <label className="text-[20px] font-medium items-center">
                Permission
              </label>
            </div>
          </Col>
          <Col span={24}>
            <Form.Item label="Address" name="address">
              <Input.TextArea
                placeholder="Enter Address"
                rows={3}
                prefix={<HomeOutlined />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <div className="flex justify-end space-x-4">
            <Button
              onClick={handleClose}
              className="cancel py-[15px]g-[#54408C]"
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="bg-[#54408C] px-[35px] py-[15px]g-[#54408C]"
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default KarykartaEditModal;
