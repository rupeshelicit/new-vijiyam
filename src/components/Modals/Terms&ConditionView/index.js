import React from "react";
import { Modal, Descriptions, Button } from "antd";

const parseDescription = (description) => {
  try {
  
    const sections = description.replace(/[\n\r]/g, "").split(",");

    return sections.map((section) => {
      const [title, ...descParts] = section.split("Description");
      const description = descParts.join("Description").trim();
      return { title: title.trim(), description: description.trim() };
    });
  } catch (error) {
    console.error("Error parsing description:", error);
    return [];
  }
};

const TermsAndConditions = ({ isOpen, setIsOpen, termsAndConditionData }) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  const parsedData = parseDescription(termsAndConditionData?.description || "");

  const currentData = parsedData[0] || {};  

  return (
    <Modal
      className="view-modal"
      title="Terms and Conditions"
      visible={isOpen}
      onCancel={handleClose}
      footer={[
        <Button key="close" onClick={handleClose}>
          Close
        </Button>,
      ]}
      width={700}
    >
      <div className="space-y-4">
        {currentData.title && currentData.description ? (
          <div className="space-y-2">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Title">
                {currentData.title || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {currentData.description || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          <p>No Terms and Conditions available</p>
        )}
      </div>
    </Modal>
  );
};

export default TermsAndConditions;
