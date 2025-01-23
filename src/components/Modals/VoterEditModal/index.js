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
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import FormInput from "components/common/FormControl/FormInput";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
import { GET_ELECTION_PARTY, UPDATE_VOTER_DETAILS } from "constants/api";
import useGet from "hooks/useGet";
import usePatch from "hooks/usePatch";

const { Option } = Select;

const VoterEditModal = ({ isOpen, setIsOpen, voterData, onSubmit }) => {
  const [form] = Form.useForm();
  const { mutateAsync: GetPartyList } = useGet();
  const { mutateAsync: UpdateVoterDetails } = usePatch();
  const [party, setParty] = useState([]);

  useEffect(() => {
    getElectionParty();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (creds) => {
    setLoading(true);
    if (creds) {
      const payload = {
        id: voterData?.id,
        // name: creds?.name,
        // stateId: creds?.stateId,
        // electionType: creds?.electionType,
        // districtId: creds?.districtId,
        // assemblyId: creds?.assemblyId,
        // electionDate: creds?.electionDate,
        // acharSanhitaDate: creds?.acharSanhitaDate,
      };
      await UpdateVoterDetails({
        url: UPDATE_VOTER_DETAILS,
        type: "details",
        payload: payload,
      })
        .then((res) => {
          if (res) {
            toast.success(
              "Success! You have successfully update voter details",
              {
                position: "top-right",
              }
            );
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
      <Form
        form={form}
        layout="vertical"
        initialValues={voterData}
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
              rules={[{ required: true, message: "Please Enter Full Name " }]}
            >
              <FormInput
                name="name"
                placeholder="First Name"
                required={false}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="hiName"
              label="Full Name (Hindi)"
              rules={[
                { required: true, message: "Please Enter Full Name in Hindi" },
              ]}
            >
              <FormInput
                name="hiName"
                placeholder="First Name in Hindi"
                required={false}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="fatherName"
              label="Father Name"
              rules={[{ required: true, message: "Please Enter Father Name" }]}
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
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please Enter Email" }]}
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
              label="Voter ID"
              name="voterId"
              rules={[
                { required: true, message: "Please Input Your Voter ID!" },
              ]}
            >
              <FormInput
                name="voterId"
                placeholder="Enter Voter ID"
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
              name="partyName"
              label="Party Name"
              rules={[
                { required: true, message: "Please Select a Party Name" },
              ]}
            >
              <DropdownSelect
                name={"party"}
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
              label="Age"
              name="age"
              rules={[{ required: true, message: "Please Input Your Age!" }]}
            >
              <FormInput
                type={"number"}
                name="age"
                placeholder="Enter Age"
                required={false}
                maxLength={10}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Caste"
              name="caste"
              rules={[{ required: true, message: "Please Input Your Caste!" }]}
            >
              <FormInput
                name="caste"
                defaultValue={voterData?.caste?.name}
                placeholder="Enter Caste"
                required={false}
                maxLength={10}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Section"
              name="section"
              rules={[{ required: true, message: "Please Enter Section" }]}
            >
              <FormInput
                name="section"
                placeholder="Enter Section"
                required={false}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Booth Number" name="boothNo">
              <FormInput
                name="boothNo"
                placeholder="Enter Booth Number"
                required={false}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="City" name="city">
              <FormInput
                name="city"
                placeholder="Enter City"
                required={false}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Supporting Party" name="supportingParty">
              <FormInput
                name="supportingParty"
                placeholder="Enter Supporting Party"
                required={false}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="House No" name="houseNo">
              <FormInput
                name="houseNo"
                placeholder="Enter House No"
                required={false}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Vidhansabha" name="vidhansabha">
              <FormInput
                name="vidhansabha"
                placeholder="Enter Vidhansabha"
                required={false}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Loksabha" name="loksabha">
              <FormInput
                name="loksabha"
                placeholder="Enter Loksabha"
                required={false}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="District" name="district">
              <FormInput
                name="district"
                placeholder="Enter District"
                required={false}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="newAddress" label="Address">
              <Input.TextArea
                placeholder="Enter address"
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

export default VoterEditModal;
