import React from "react";
import { Modal, Descriptions, Tag, Button } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const ElectionViewModal = ({ isOpen, setIsOpen, electionData }) => {
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
            {electionData?.name || "Voter Name"}{" "}
            {electionData?.hiName && `(${electionData?.hiName})`}
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
        {electionData ? (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Father's Name" span={2}>
              {electionData.fatherName || "N/A"}{" "}
              {electionData.hiFatherName && `(${electionData.hiFatherName})`}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="flex items-center">
                  <PhoneOutlined className="mr-2" /> Mobile Number
                </span>
              }
            >
              {electionData.mobileNumber || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Alternate Number">
              {electionData.alternateNumber || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Party">
              <Tag color="#54408C">
                {electionData.party || "N/A"}{" "}
                {electionData.hiParty && `(${electionData.hiParty})`}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              {electionData.age || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {electionData.gender || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {electionData.dateOfBirth
                ? new Date(electionData.dateOfBirth).toLocaleDateString()
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
              {electionData.houseNo}, {electionData.newAddress || "N/A"}{" "}
              {electionData.hiNewAddress && `(${electionData.hiNewAddress})`}
            </Descriptions.Item>
            <Descriptions.Item label="Section" span={2}>
              {electionData.section || "N/A"}{" "}
              {electionData.hiSection && `(${electionData.hiSection})`}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="flex items-center">
                  <IdcardOutlined className="mr-2" /> Voter ID
                </span>
              }
            >
              {electionData.voterId || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Caste">
              {electionData.caste?.name || "N/A"}{" "}
              {electionData.caste?.hiName && `(${electionData.caste.hiName})`}
            </Descriptions.Item>
            <Descriptions.Item label="Assembly">
              {electionData.assembly || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Booth">
              {electionData.booth || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Supporting Party">
              <Tag
                color={
                  electionData.supportingParty === "Neutral"
                    ? "orange"
                    : "green"
                }
              >
                {electionData.supportingParty || "N/A"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Voted">
              <Tag color={electionData.isVoted ? "green" : "red"}>
                {electionData.isVoted ? "Yes" : "No"}
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

export default ElectionViewModal;
