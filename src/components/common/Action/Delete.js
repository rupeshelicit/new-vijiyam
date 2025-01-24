import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import usePatch from "hooks/usePatch";
import { toast } from "react-toastify";
import {
  DELETE_CLIENT,
  DELETE_DISTRIBUTOR,
  DELETE_ELECTION,
  DELETE_KARYAKARTA,
  DELETE_VOTER,
} from "constants/api";
import { useMetaDataContext } from "context/metaData";
import useDelete from "hooks/useDelete";

const API_ENDPOINTS = {
  voter: DELETE_VOTER,
  karyakarta: DELETE_KARYAKARTA,
  election: DELETE_ELECTION,
  client: DELETE_CLIENT,
  distributor: DELETE_DISTRIBUTOR,
};

const SUCCESS_MESSAGES = {
  voter: "Success! You have successfully deleted this Voter.",
  karyakarta: "Success! You have successfully deleted this Karyakarta.",
  election: "Success! You have successfully deleted this Election.",
  client: "Success! You have successfully deleted this Client.",
  distributor: "Success! You have successfully deleted this Distributor.",
};

const DeleteComponent = ({ record, roleType, handleDelete }) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: Delete } = useDelete();
  const { updateDeleteState } = useMetaDataContext();

  const handleDeleteClick = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteAction = async () => {
    const endpoint = API_ENDPOINTS[roleType];
    const successMessage = SUCCESS_MESSAGES[roleType];

    if (!endpoint) {
      toast.error("Error! Invalid role type.", { position: "top-right" });
      return;
    }

    if (!record?.id) {
      toast.error("Error! Record ID is missing.", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      const response = await Delete({
        url: `${endpoint}${record?.id}`,
        type: "details",
        token: true,
      });
      if (response) {
        handleDelete();
        toast.success(successMessage, { position: "top-right" });
        updateDeleteState(roleType, true);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred!";
      toast.error(`Error! ${errorMessage}`, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        icon={<DeleteOutlined />}
        onClick={handleDeleteClick}
        size="small"
        danger
        loading={loading}
        disabled={loading}
      />

      <DeleteModal
        isModalOpen={isConfirmationModalOpen}
        setIsModalOpen={(isOpen) => {
          setIsConfirmationModalOpen(isOpen);
          if (!isOpen) setLoading(false);
        }}
        name={roleType}
        setConfirmation={(isConfirmed) => {
          if (isConfirmed) handleDeleteAction();
        }}
      />
    </div>
  );
};

export default DeleteComponent;
