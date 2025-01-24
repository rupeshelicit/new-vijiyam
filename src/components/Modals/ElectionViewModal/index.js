import React from "react";
import { Modal, Descriptions, Tag, Button } from "antd";
import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";

const ElectionViewModal = ({ isOpen, setIsOpen, electionData }) => {
  const handleClose = () => {
    setIsOpen(false); // Close the modal
  };

  return (
    <Modal
      className="view-modal"
      title={
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">
            Election Details - {electionData?.name || "Election Name"}
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
            <Descriptions.Item label="Election Name">
              {electionData.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Election Type">
              {electionData.electionType || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="State">
              {electionData.state?.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="District">
              {electionData.district?.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Election Date">
              {electionData.electionDate
                ? new Date(electionData.electionDate).toLocaleDateString()
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Achar Sanhita Date">
              {electionData.acharSanhitaDate
                ? new Date(electionData.acharSanhitaDate).toLocaleDateString()
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Is Achar Sanhita Active">
              <Tag color={electionData.isAcharSanhita ? "green" : "red"}>
                {electionData.isAcharSanhita ? "Yes" : "No"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Is Without Image">
              <Tag color={electionData.iswithoutImage ? "green" : "red"}>
                {electionData.iswithoutImage ? "Yes" : "No"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Is Print Slip Setting">
              <Tag color={electionData.isPrintSlipSetting ? "green" : "red"}>
                {electionData.isPrintSlipSetting ? "Yes" : "No"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {electionData.createdAt
                ? new Date(electionData.createdAt).toLocaleDateString()
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {electionData.updatedAt
                ? new Date(electionData.updatedAt).toLocaleDateString()
                : "N/A"}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>No election data available</p>
        )}
      </div>
    </Modal>
  );
};

export default ElectionViewModal;
