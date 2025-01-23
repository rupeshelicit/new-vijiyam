import React from "react";
import { Modal, Descriptions, Tag, Button } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const DistributorViewModal = ({ isOpen, setIsOpen, distributorData }) => {
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
            {distributorData?.name || "Voter Name"}{" "}
            {distributorData?.hiName && `(${distributorData?.hiName})`}
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
              {distributorData.fatherName || "N/A"}{" "}
              {distributorData.hiFatherName &&
                `(${distributorData.hiFatherName})`}
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
            <Descriptions.Item label="Alternate Number">
              {distributorData.alternateNumber || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Party">
              <Tag color="#54408C">
                {distributorData.party || "N/A"}{" "}
                {distributorData.hiParty && `(${distributorData.hiParty})`}
              </Tag>
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
              {distributorData.houseNo}, {distributorData.newAddress || "N/A"}{" "}
              {distributorData.hiNewAddress &&
                `(${distributorData.hiNewAddress})`}
            </Descriptions.Item>
            <Descriptions.Item label="Section" span={2}>
              {distributorData.section || "N/A"}{" "}
              {distributorData.hiSection && `(${distributorData.hiSection})`}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="flex items-center">
                  <IdcardOutlined className="mr-2" /> Voter ID
                </span>
              }
            >
              {distributorData.voterId || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Caste">
              {distributorData.caste?.name || "N/A"}{" "}
              {distributorData.caste?.hiName &&
                `(${distributorData.caste.hiName})`}
            </Descriptions.Item>
            <Descriptions.Item label="Assembly">
              {distributorData.assembly || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Booth">
              {distributorData.booth || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Supporting Party">
              <Tag
                color={
                  distributorData.supportingParty === "Neutral"
                    ? "orange"
                    : "green"
                }
              >
                {distributorData.supportingParty || "N/A"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Voted">
              <Tag color={distributorData.isVoted ? "green" : "red"}>
                {distributorData.isVoted ? "Yes" : "No"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>No voter data available</p>
        )}
      </div>
    </Modal>
  );
};

export default DistributorViewModal;
