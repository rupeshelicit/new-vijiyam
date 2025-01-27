import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ElectionViewModal from "components/Modals/ElectionViewModal";
import ViewKaryakartaModal from "components/Modals/KaryakartaViewModal";
import VoterViewModal from "components/Modals/VoterViewModal";
import ClientViewModal from "components/Modals/ClientViewModal";
import React, { useState } from "react";
import DistributorViewModal from "components/Modals/DistributorViewModal";
import { useNavigate } from "react-router-dom";
import { useMetaDataContext } from "context/metaData";
const ViewComponent = ({ record, roleType }) => {
  const navigate = useNavigate();

  const [isVoterOpen, setIsVoterOpen] = useState(false);
  const [isKaryakartaOpen, setIsKaryakartaOpen] = useState(false);
  const [isElectionOpen, setIsElectionOpen] = useState(false);
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [isDistributorOpen, setIsDistributorOpen] = useState(false);
  const { setClientProfile } = useMetaDataContext();
  const handleViewClick = () => {
    if (roleType === "voter") {
      setIsVoterOpen(true);
    } else if (roleType === "karyakarta") {
      setIsKaryakartaOpen(true);
    } else if (roleType === "election") {
      setIsElectionOpen(true);
    } else if (roleType === "client") {
      setClientProfile(record);
      navigate("/client-profile");
    } else if (roleType === "distributor") {
      setIsClientOpen(true);
    }
  };
  return (
    <div>
      <Button
        icon={<EyeOutlined />}
        onClick={handleViewClick}
        size="small"
        style={{ marginRight: 8 }}
      />
      {roleType === "voter" && (
        <VoterViewModal
          isOpen={isVoterOpen}
          setIsOpen={setIsVoterOpen}
          voterData={record}
        />
      )}
      {roleType === "karyakarta" && (
        <ViewKaryakartaModal
          isOpen={isKaryakartaOpen}
          setIsOpen={setIsKaryakartaOpen}
          karyakartaData={record}
        />
      )}
      {roleType === "election" && (
        <ElectionViewModal
          isOpen={isElectionOpen}
          setIsOpen={setIsElectionOpen}
          electionData={record}
        />
      )}{" "}
      {roleType === "client" && (
        <ClientViewModal
          isOpen={isClientOpen}
          setIsOpen={setIsClientOpen}
          clientData={record}
        />
      )}
      {roleType === "distributor" && (
        <DistributorViewModal
          isOpen={isDistributorOpen}
          setIsOpen={setIsDistributorOpen}
          clientData={record}
        />
      )}
    </div>
  );
};

export default ViewComponent;
