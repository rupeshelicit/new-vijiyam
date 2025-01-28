import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, Row, Col } from "antd";
import { UserOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import FormInput from "components/common/FormControl/FormInput";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
import { GET_ELECTION_PARTY, UPDATE_VOTER_DETAILS } from "constants/api";
import useGet from "hooks/useGet";
import usePatch from "hooks/usePatch";
import { toast } from "react-toastify";

const { Option } = Select;

const VoterEditModal = ({ isOpen, setIsOpen, voterData, onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { mutateAsync: UpdateVoterDetails } = usePatch();

  useEffect(() => {
    if (isOpen === true) {
      
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (creds) => {
    if (creds) {
      const payload = {
        id: voterData?.id,
        mobileNumber: creds?.mobileNumber,
        age: creds?.age,
        caste: creds?.caste,
        religionId: creds?.religionId,
        dateOfBirth: creds?.dateOfBirth,
        section: creds?.section,
        boothNo: creds?.boothNo,
        houseNo: creds?.booth,
        booth: creds?.booth,
        vidhansabha: creds?.vidhansabha,
        loksabha: creds?.loksabha,
        city: creds?.city,
      };

      await UpdateVoterDetails({
        url: UPDATE_VOTER_DETAILS,
        type: "details",
        payload: payload,
        token:true
      })
        .then((res) => {
          if (res) {
            toast.success(
              "Success! You have successfully updated voter details",
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
      handleClose();
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
              name="caste"
              label="Caste"
              rules={[{ required: true, message: "Please Input Your Caste!" }]}
            >
              <FormInput
                name="caste"
                placeholder="Enter Caste"
                required={false}
                maxLength={10}
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
            <Form.Item label="House No" name="houseNo">
              <FormInput
                name="houseNo"
                placeholder="Enter House No"
                required={false}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="mobileNumber"
              label="Phone Number"
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
            <Form.Item label="Booth " name="booth">
              <FormInput
                name="booth"
                placeholder="Enter Booth "
                required={false}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Booth Number " name="booth">
              <FormInput
                name="boothNo"
                placeholder="Enter Booth  Number"
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
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please Enter Full Name " }]}
            >
              <FormInput
                name="name"
                placeholder="First Name"
                required={false}
                disabled={true}
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
                disabled={true}
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
                disabled={true}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="voterId"
              label="Voter ID"
              rules={[
                { required: true, message: "Please Input Your Voter ID!" },
              ]}
            >
              <FormInput
                name="voterId"
                placeholder="Enter Voter ID"
                required={false}
                maxLength={10}
                disabled={true}
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
                disabled={true}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Section"
              name="section"
              rules={[{ required: false, message: "Please Enter Section" }]}
            >
              <FormInput
                name="section"
                placeholder="Enter Section"
                required={false}
                disabled={true}
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
      </Form>
    </Modal>
  );
};

export default VoterEditModal;
