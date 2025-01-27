import { Card } from "antd";
import { useMetaDataContext } from "context/metaData";
import React from "react";
import { Container } from "styles/components/common/Layout";

const AccountDetails = () => {
  const { clientProfileData } = useMetaDataContext();
  return (
    <Container>
      <div title="" className="mb-[20px]">
        <label>Account Details</label>
        <div className="grid gap-4 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Account</span>
            <span>{clientProfileData?.name ?? "N/A"}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Email</span>
            <span>{clientProfileData?.email ?? "N/A"}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">User Name</span>
            <span>{clientProfileData?.name ?? "N/A"}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Created Date</span>
            <span>
              {clientProfileData?.createdAt
                ? new Date(clientProfileData.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Activated</span>
            <span>{clientProfileData?.status ? "True" : "False"}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Activated Date</span>
            <span>
              {clientProfileData?.updatedAt
                ? new Date(clientProfileData.updatedAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Password</span>
            <span>********</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AccountDetails;
