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

const DeleteComponent = ({ record, roleType }) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: Delete } = usePatch();

  const handleDeleteClick = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteAction = () => {
    if (!isConfirmed) return;

    if (roleType === "voter") {
      handleVoterDelete();
    } else if (roleType === "karyakarta") {
      handleKaryakartaDelete();
    } else if (roleType === "election") {
      handleDeleteElection();
    } else if (roleType === "client") {
      handleDeleteClient();
    } else if (roleType === "distributor") {
      handleDeleteDistributor();
    }
  };

  const handleVoterDelete = async () => {
    setLoading(true);
    const voterId = record?.id;
    await Delete({
      url: DELETE_VOTER + voterId,
      type: "details",
    })
      .then((res) => {
        if (res) {
          toast.success("Success! You have successfully delete this Voter", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        toast.error(`Error! ${error?.response?.data?.message}`, {
          position: "top-right",
        });
      });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleKaryakartaDelete = async () => {
    setLoading(true);
    const karyakartaId = record?.id;
    await Delete({
      url: DELETE_KARYAKARTA + karyakartaId,
      type: "details",
    })
      .then((res) => {
        if (res) {
          toast.success(
            "Success! You have successfully delete this Karyakarta",
            {
              position: "top-right",
            }
          );
        }
      })
      .catch((error) => {
        toast.error(`Error! ${error?.response?.data?.message}`, {
          position: "top-right",
        });
      });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const handleDeleteDistributor = async () => {
    setLoading(true);
    const distributerId = record?.id;
    await Delete({
      url: DELETE_DISTRIBUTOR + distributerId,
      type: "details",
    })
      .then((res) => {
        if (res) {
          toast.success(
            "Success! You have successfully delete this distributor",
            {
              position: "top-right",
            }
          );
        }
      })
      .catch((error) => {
        toast.error(`Error! ${error?.response?.data?.message}`, {
          position: "top-right",
        });
      });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const handleDeleteClient = async () => {
    setLoading(true);
    const clienId = record?.id;
    await Delete({
      url: DELETE_CLIENT + clienId,
      type: "details",
    })
      .then((res) => {
        if (res) {
          toast.success("Success! You have successfully delete this client", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        toast.error(`Error! ${error?.response?.data?.message}`, {
          position: "top-right",
        });
      });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const handleDeleteElection = async () => {
    setLoading(true);
    const electionID = record?.id;
    await Delete({
      url: DELETE_ELECTION + electionID,
      type: "details",
    })
      .then((res) => {
        if (res) {
          toast.success("Success! You have successfully delete this eleciton", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        toast.error(`Error! ${error?.response?.data?.message}`, {
          position: "top-right",
        });
      });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      <Button
        icon={<DeleteOutlined />}
        onClick={handleDeleteClick}
        size="small"
        danger
      />

      <DeleteModal
        isModalOpen={isConfirmationModalOpen}
        setIsModalOpen={setIsConfirmationModalOpen}
        name={roleType}
        setConfirmation={(value) => {
          setIsConfirmed(value);
          if (value) handleDeleteAction();
        }}
      />
    </div>
  );
};

export default DeleteComponent;
