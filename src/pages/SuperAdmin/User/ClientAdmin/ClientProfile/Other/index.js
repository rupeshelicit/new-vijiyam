import { Card } from "antd";
import React from "react";
import { Container } from "styles/components/common/Layout";

const OtherDetails = () => {
  return (
    <Container>
      <div title="Other" className=" mb-[20px]">
        <label>Other</label>
        <div className="grid gap-4 text-sm my-6">
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Education</span>
            <span>Graduate</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Party Name</span>
            <span>No</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Last Election Result</span>
            <span>Win(+300000)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Vidhan Sabha</span>
            <span>Indore</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OtherDetails;
