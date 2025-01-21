import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import DeleteModal from "./DeleteModal";

const DeleteComponent = ({ record, roleType }) => {
  const [isconfirmationModal, setIsConfirmationModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const handleDelete = () => {
    setConfirmation(true);
    if (roleType === "voter" && confirmation == true) {
      handleVoterDelete();
    }
  };

  const handleVoterDelete = () => {
    console.log(record);
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
        setConfirmation
      />
    </div>
  );
};

export default DeleteComponent;
