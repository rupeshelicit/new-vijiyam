import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import DeleteModal from "./DeleteModal";

const DeleteComponent = ({ record, roleType }) => {
  const [isconfirmationModal, setIsConfirmationModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const handleDelete = () => {
    setIsConfirmationModal(true);
    if (roleType === "voter" && confirmation == true) {
      handleVoterDelete();
    }
  };

  const handleVoterDelete = () => {
    
  };

  return (
    <div>
      <Button
        icon={<DeleteOutlined />}
        onClick={handleDelete}
        size="small"
        danger
      />

      <DeleteModal
        isModalOpen={isconfirmationModal}
        setIsModalOpen={setIsConfirmationModal}
        name={roleType}
        setConfirmation={setConfirmation}
      />
    </div>
  );
};

export default DeleteComponent;
