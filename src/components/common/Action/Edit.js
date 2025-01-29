import React, { useState } from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import VoterEditModal from "components/Modals/VoterEditModal";
import KarykartaEditModal from "components/Modals/KarykartaEdit";
import ElectionEditModal from "components/Modals/ElectionEditModal";
import ClietEditModal from "components/Modals/ClientEditModal";
import DistributorEditModal from "components/Modals/DistributorEditModal";
const EditComponent = ({ record, roleType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isVoterEdit, setIsVoterEdit] = useState(false);
  const [isKaryakartaEdit, setIsKaryakartaEdit] = useState(false);
  const [isElectionEdit, setIsElectionEdit] = useState(false);
  const [isClientEdit, setIsClientEdit] = useState(false);
  const [isDistributorEdit, setIsDistributorEdit] = useState(false);
  console.log(roleType, "roleTypesssssss");
  const handleEditClick = () => {
    setIsEditing(true);
    handleEditAction();
  };

  const handleEditAction = () => {
    if (roleType === "voter") {
      setIsVoterEdit(true);
    } else if (roleType === "karyakarta") {
      setIsKaryakartaEdit(true);
    } else if (roleType === "election") {
      setIsElectionEdit(true);
    } else if (roleType === "client") {
      setIsClientEdit(true);
    } else if (roleType === "distributor") {
      setIsDistributorEdit(true);
    } else {
      console.warn("Unsupported role type:", roleType);
    }
  };

  return (
    <div>
      <Button
        icon={<EditOutlined />}
        onClick={handleEditClick}
        size="small"
        style={{ marginRight: 8 }}
      />
      <VoterEditModal
        isOpen={isVoterEdit}
        setIsOpen={setIsVoterEdit}
        voterData={isVoterEdit && record}
      />

      <KarykartaEditModal
        isOpen={isKaryakartaEdit}
        setIsOpen={setIsKaryakartaEdit}
        karyakartaData={record}
      />
      <ElectionEditModal
        isOpen={isElectionEdit}
        setIsOpen={setIsElectionEdit}
        ElectionData={record}
      />
      <ClietEditModal
        isOpen={isClientEdit}
        setIsOpen={setIsClientEdit}
        ClientData={record}
      />
      <DistributorEditModal
        isOpen={isDistributorEdit}
        setIsOpen={setIsDistributorEdit}
        distributorData={record}
      />
    </div>
  );
};

export default EditComponent;
