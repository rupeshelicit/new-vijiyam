import { Card } from "antd";
import React from "react";

const Residency = () => {
  return (
    <div>
      <div title="" className="mb-[20px]">
        <label>Residency</label>
        <div className="grid gap-4 text-sm my-6">
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Country</span>
            <span>India</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">State / District</span>
            <span>Madhya Pradesh</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">City</span>
            <span>Indore</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Pin Code</span>
            <span>452010</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Residency;
