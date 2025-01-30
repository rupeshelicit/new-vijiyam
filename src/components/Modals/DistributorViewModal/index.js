import React from "react";
import { Modal, Descriptions, Tag, Button } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const DistributorViewModal = ({ isOpen, setIsOpen, distributorData }) => {
  console.log(distributorData,'distributorData')
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      className="view-modal"
      title={
        <div className="flex items-center space-x-2">
          <UserOutlined className="text-#54408C-500" />
          <span className="text-xl font-semibold">
            {distributorData?.name || "Distributor Name"}{" "}
            {distributorData?.hiName && `(${distributorData.hiName})`}
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
      <div className="p-4">
        {distributorData ? (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Father's Name" span={2}>
              {distributorData.fatherName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="flex items-center">
                  <PhoneOutlined className="mr-2" /> Mobile Number
                </span>
              }
            >
              {distributorData.mobileNumber || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {distributorData.email || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Party">
              <Tag color="#54408C">{distributorData.party?.name || "N/A"}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              {distributorData.age || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {distributorData.gender || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {distributorData.dateOfBirth
                ? new Date(distributorData.dateOfBirth).toLocaleDateString()
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
              {distributorData.address || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Voter ID">
              {distributorData.voterId || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="State">
              {distributorData.state?.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="District">
              {distributorData.district?.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Designation">
              {distributorData.designation || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={distributorData.status ? "green" : "red"}>
                {distributorData.status ? "Active" : "Inactive"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Permission">
              <Tag color={distributorData.isPermission ? "blue" : "orange"}>
                {distributorData.isPermission ? "Granted" : "Revoked"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>No distributor data available</p>
        )}
      </div>
    </Modal>
  );
};

export default DistributorViewModal;
