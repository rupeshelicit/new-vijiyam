import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { DeleteModalComponent } from "styles/components/common/Action";
import ButtonComponent from "components/common/FormControl/ButtonComponent";

const DeleteModal = ({
  isModalOpen,
  setIsModalOpen,
  title = "Delete Confirmation",
  content = "Are you sure you want to delete this item?",
  onConfirm,
}) => {
  const handleOk = () => {
    if (onConfirm) onConfirm(); // Trigger custom confirm logic
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <DeleteModalComponent className="delete-component">
          <Modal 
        className="delete-modal"
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} 
      >
        <div>
          <p>{content}</p>
        </div>
        <div className="justify-between gap-[8px] flex">
          <ButtonComponent
            text="Cancel"
            onClick={handleCancel}
            type="default"
          />
          <ButtonComponent
            text="Yes Delete"
            onClick={handleOk}
            type="primary"
          />
        </div>
      </Modal>
    </DeleteModalComponent>
  );
};

DeleteModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default DeleteModal;
