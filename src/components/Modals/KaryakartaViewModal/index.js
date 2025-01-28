import React from "react";
import { Modal, Descriptions, Tag, Button } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const ViewKaryakartaModal = ({ isOpen, setIsOpen, karyakartaData }) => {
  const handleClose = () => {
    setIsOpen(false); // Close the modal
  };

  return (
    <Modal
      className="view-modal"
      title={
        <div className="flex items-center space-x-2">
          <UserOutlined className="text-#54408C-500" />
          <span className="text-xl font-semibold">
            {karyakartaData?.name || "Karyakarta Name"}{" "}
            {karyakartaData?.hiName && `(${karyakartaData?.hiName})`}
          </span>
        </div>
      }
      visible={isOpen}
      onCancel={handleClose}
      footer={[
        <Button key="close" onClick={handleClose}>
          Close
        </Button>,
      ]}
      width={700}
    >
      <div className="">
        {karyakartaData ? (
          <Descriptions bordered column={2}>
                <Descriptions.Item label="Client's Name" span={2}>
              {karyakartaData.createdBy || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Father's Name" span={2}>
              {karyakartaData.fatherName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="flex items-center">
                  <PhoneOutlined className="mr-2" /> Mobile Number
                </span>
              }
            >
              {karyakartaData.mobileNumber || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {karyakartaData.email || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {karyakartaData.gender || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              {karyakartaData.age || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {karyakartaData.dateOfBirth
                ? new Date(karyakartaData.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="flex items-center">
                  <HomeOutlined className="mr-2" /> Address
                </span>
              }
              span={2}
            >
              {karyakartaData.address || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Voter ID">
              {karyakartaData.voterId || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Party">
              {karyakartaData.party?.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              {karyakartaData.designation || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="State">
              {karyakartaData.state?.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="District">
              {karyakartaData.district?.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={karyakartaData.status ? "green" : "red"}>
                {karyakartaData.status ? "Active" : "Inactive"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>No Karyakarta data available</p>
        )}
      </div>
    </Modal>
  );
};

export default ViewKaryakartaModal;
