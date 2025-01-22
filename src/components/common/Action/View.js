import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import VoterViewModal from "pages/SuperAdmin/DataManagement/UploadVoter/Voter/ViewModal";
import React, { useState } from "react";

const ViewComponent = ({ record, roleType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = () => {
    if (roleType === "voter") {
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <Button
        icon={<EyeOutlined />}
        onClick={handleView}
        size="small"
        style={{ marginRight: 8 }}
      />
      {roleType === "voter" && (
        <VoterViewModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          data={record}
        />
      )}
    </div>
  );
};

export default ViewComponent;
