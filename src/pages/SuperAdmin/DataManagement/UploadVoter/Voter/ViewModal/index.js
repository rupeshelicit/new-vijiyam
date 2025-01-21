import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import styled from "styled-components";
import { Container } from "styles/components/Navbar";

const StyledModal = styled(Modal)`
  .view-modal-content {
    text-align: center;
    padding: 16px;
  }

  .modal-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .modal-description {
    font-size: 16px;
    margin-bottom: 16px;
    color: #333;

    strong {
      font-weight: bold;
      color: #000;
    }
  }

  .modal-footer {
    margin-top: 24px;

    button {
      width: 120px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
      background-color: #2f244d;
      color: white;
      border: none;

      &:hover {
        background-color: #333;
      }
    }
  }
`;

const VoterViewModal = ({
  isModalOpen,
  setIsModalOpen,
  title = "View Details",
  data,
}) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const formattedData = [
    { label: "Name", value: data?.name || "N/A" },
    { label: "Father Name", value: data?.fatherName || "N/A" },
    { label: "User Name", value: "Demo" },
    {
      label: "Created Date",
      value: new Date(data?.createdAt).toLocaleDateString() || "N/A",
    },
    { label: "Activated", value: data?.status ? "True" : "False" },
    {
      label: "Activated Date",
      value: new Date(data?.updatedAt).toLocaleDateString() || "N/A",
    },
    { label: "Password", value: "********" },
    { label: "Mobile Number", value: data?.mobileNumber || "N/A" },
    { label: "Party", value: data?.party || "N/A" },
    { label: "Booth", value: data?.booth || "N/A" },
    { label: "Section", value: data?.section || "N/A" },
    { label: "New Address", value: data?.newAddress || "N/A" },
    { label: "Caste", value: data?.caste?.name || "N/A" },
    { label: "Gender", value: data?.gender || "N/A" },
    {
      label: "Date of Birth",
      value: new Date(data?.dateOfBirth).toLocaleDateString() || "N/A",
    },
  ];
  return (
    <StyledModal
      className="view-modal"
      title={null}
      open={isModalOpen}
      footer={null}
      centered
      onCancel={handleClose}
    >
      <div className="view-modal-content">
        <h2 className="modal-title">{title}</h2>
        <Container>
          {" "}
          <div title="" className="mb-[20px]">
            <div className="grid gap-4 text-sm mt-2">
              {formattedData.map((item, index) => (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <span className="text-gray-600">{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
        <div className="modal-footer">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </StyledModal>
  );
};

VoterViewModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  title: PropTypes.string,
  data: PropTypes.string.isRequired,
};

export default VoterViewModal;
