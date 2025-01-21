import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import styled from "styled-components";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const StyledModal = styled(Modal)`
  .delete-modal-content {
    text-align: center;
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

  .warning-box {
    display: flex;
    align-items: center;
    background-color: #fff6f0;
    border: 1px solid #ffa39e;
    padding: 12px;
    border-radius: 4px;
    color: #d4380d;
    font-size: 14px;
    margin-bottom: 24px;

    .warning-icon {
      margin-right: 8px;
      font-size: 20px;
    }
  }

  .modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;

    button {
      width: 120px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
    }

    .cancel-button {
      background-color: #2f244d;
      color: white;
      border: none;

      &:hover {
        background-color: #333;
      }
    }

    .delete-button {
      background-color: transparent;
      color: #2f244d;
      border: 1px solid #2f244d;

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
`;

const DeleteModal = ({
  isModalOpen,
  setIsModalOpen,
  title = "Delete User",
  name,
  setConfirmation,
}) => {
  const handleOk = () => {
    setConfirmation(true);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setConfirmation(false);
    setIsModalOpen(false);
  };

  return (
    <StyledModal
      className="delete-modal"
      title={null}
      open={isModalOpen}
      footer={null}
      centered
      onCancel={handleCancel}
    >
      <div className="delete-modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-description"></p>
        <div className="warning-box">
          <ExclamationCircleOutlined className="warning-icon" />
          <span>
            Are you sure you want to delete this <strong>{name}</strong>?{" "}
          </span>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={handleCancel}>
            No, Cancel
          </button>
          <button className="delete-button" onClick={handleOk}>
            Yes, Delete
          </button>
        </div>
      </div>
    </StyledModal>
  );
};

DeleteModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteModal;
