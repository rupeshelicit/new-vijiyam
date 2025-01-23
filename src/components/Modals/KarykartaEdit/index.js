import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, Row, Col } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import FormInput from "components/common/FormControl/FormInput";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
import {
  GET_ELECTION_PARTY,
  GET_PARTY_LIST,
  UPDATE_KARYAKARTA_DETAILS,
} from "constants/api";
import useGet from "hooks/useGet";
import usePatch from "hooks/usePatch";

const { Option } = Select;

const KarykartaEditModal = ({ isOpen, setIsOpen, karykartaData, onSubmit }) => {
  const [form] = Form.useForm();
  const { mutateAsync: GetPartyList } = useGet();
  const { mutateAsync: UpdateKarykartaDetails } = usePatch();
  const [party, setParty] = useState([]);

  useEffect(() => {
    getPartyList();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (creds) => {
    setLoading(true);
    if (creds) {
      const payload = {
        id: karykartaData?.id,
        // name: creds?.name,
        // stateId: creds?.stateId,
        // electionType: creds?.electionType,
        // districtId: creds?.districtId,
        // assemblyId: creds?.assemblyId,
        // electionDate: creds?.electionDate,
        // acharSanhitaDate: creds?.acharSanhitaDate,
      };
      await UpdateKarykartaDetails({
        url: UPDATE_KARYAKARTA_DETAILS,
        type: "details",
        payload: payload,
      })
        .then((res) => {
          if (res) {
            toast.success(
              "Success! You have successfully update karykarta details",
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
        initialValues={karykartaData}
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
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please Input Role!" }]}
            >
              <FormInput
                name="role"
                placeholder="Enter Role"
                required={false}
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
            <Form.Item label="State" name="state">
              <FormInput
                name="state"
                placeholder="Enter State"
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
