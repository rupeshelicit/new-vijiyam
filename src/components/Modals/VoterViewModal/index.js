import React from "react";
import { Modal, Descriptions, Tag, Button } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const VoterViewModal = ({ isOpen, setIsOpen, voterData }) => {
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
            {voterData?.name || "Voter Name"}{" "}
            {voterData?.hiName && `(${voterData?.hiName})`}
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
      width={875}
    >
      <div className="">
        {voterData ? (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Father's Name" span={2}>
              {voterData.fatherName || "N/A"}{" "}
              {voterData.hiFatherName && `(${voterData.hiFatherName})`}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="flex items-center">
                  <PhoneOutlined className="mr-2" /> Mobile Number
                </span>
              }
            >
              {voterData.mobileNumber || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Alternate Number">
              {voterData.alternateNumber || "N/A"}
            </Descriptions.Item>
          
            <Descriptions.Item label="Age">
              {voterData.age || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {voterData.gender || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {voterData.dateOfBirth
                ? new Date(voterData.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="flex items-center">
                  City
                </span>
              }
              span={2}
            >
           {voterData.city || "N/A"}{" "}
             
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="flex items-center">
                  <HomeOutlined className="mr-2" /> Address
                </span>
              }
              span={2}
            >
              {voterData.houseNo}, {voterData.newAddress || "N/A"}{" "}
              {voterData.hiNewAddress && `(${voterData.hiNewAddress})`}
            </Descriptions.Item>
        
            <Descriptions.Item label="Section" span={2}>
              {voterData.section || "N/A"}{" "}
              {voterData.hiSection && `(${voterData.hiSection})`}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="flex items-center">
                  <IdcardOutlined className="mr-2" /> Voter ID
                </span>
              }
            >
              {voterData.voterId || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Caste">
              {voterData.caste?.name || "N/A"}{" "}
              {voterData.caste?.hiName && `(${voterData.caste.hiName})`}
            </Descriptions.Item>
            <Descriptions.Item label="Vidhansabha">
              {voterData.assembly || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Loksabha">
              {voterData.loksabha || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Booth">
              {voterData.booth || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Supporting Party">
              <Tag
                color={
                  voterData.supportingParty === "Neutral" ? "orange" : "green"
                }
              >
                {voterData.supportingParty || "N/A"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Voted">
              <Tag color={voterData.isVoted ? "green" : "red"}>
                {voterData.isVoted ? "Yes" : "No"}
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

export default VoterViewModal;
