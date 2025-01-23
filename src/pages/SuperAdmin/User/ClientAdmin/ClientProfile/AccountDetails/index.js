import { Card } from "antd";
import React from "react";
import { Container } from "styles/components/common/Layout";

const AccountDetails = () => {
  return (
    <Container>
      {" "}
      <div title="" className="mb-[20px]">
        <label>Account Details</label>
        <div className="grid gap-4 text-sm my-6">
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Account</span>
            <span>Demo</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Email</span>
            <span>Demo@Gmail.Com</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">User Name</span>
            <span>Demo</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Created Date</span>
            <span>20/04/2024</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Activated</span>
            <span>True</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Activated Date</span>
            <span>20/04/2024</span>
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
