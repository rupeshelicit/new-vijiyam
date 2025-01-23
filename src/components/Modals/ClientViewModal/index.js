import React from "react";
import { Modal, Descriptions, Tag, Button } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const ClientViewModal = ({ isOpen, setIsOpen, clientData }) => {
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
            {clientData?.name || "Voter Name"}{" "}
            {clientData?.hiName && `(${clientData?.hiName})`}
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
        {clientData ? (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Father's Name" span={2}>
              {clientData.fatherName || "N/A"}{" "}
              {clientData.hiFatherName && `(${clientData.hiFatherName})`}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="flex items-center">
                  <PhoneOutlined className="mr-2" /> Mobile Number
                </span>
              }
            >
              {clientData.mobileNumber || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Alternate Number">
              {clientData.alternateNumber || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Party">
              <Tag color="#54408C">
                {clientData.party || "N/A"}{" "}
                {clientData.hiParty && `(${clientData.hiParty})`}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              {clientData.age || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {clientData.gender || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {clientData.dateOfBirth
                ? new Date(clientData.dateOfBirth).toLocaleDateString()
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
              {clientData.houseNo}, {clientData.newAddress || "N/A"}{" "}
              {clientData.hiNewAddress && `(${clientData.hiNewAddress})`}
            </Descriptions.Item>
            <Descriptions.Item label="Section" span={2}>
              {clientData.section || "N/A"}{" "}
              {clientData.hiSection && `(${clientData.hiSection})`}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="flex items-center">
                  <IdcardOutlined className="mr-2" /> Voter ID
                </span>
              }
            >
              {clientData.voterId || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Caste">
              {clientData.caste?.name || "N/A"}{" "}
              {clientData.caste?.hiName && `(${clientData.caste.hiName})`}
            </Descriptions.Item>
            <Descriptions.Item label="Assembly">
              {clientData.assembly || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Booth">
              {clientData.booth || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Supporting Party">
              <Tag
                color={
                  clientData.supportingParty === "Neutral" ? "orange" : "green"
                }
              >
                {clientData.supportingParty || "N/A"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Voted">
              <Tag color={clientData.isVoted ? "green" : "red"}>
                {clientData.isVoted ? "Yes" : "No"}
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

export default ClientViewModal;
