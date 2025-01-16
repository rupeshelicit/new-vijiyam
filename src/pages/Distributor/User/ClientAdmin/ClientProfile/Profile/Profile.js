import { Card } from "antd";
import React from "react";
import { Container } from "styles/components/common/Layout";
import ClientProfileImg from "assets/images/Client-Profile.png";
const Profile = () => {
  return (
    <Container>
      {" "}
      <Card className="shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold font-bold text-[#455A5C]">
            Profile
          </h2>
          <button className="px-4 py-1 bg-[#54408C] text-white text-sm rounded">
            Edit
          </button>
        </div>
        <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4">
          <img
            src={ClientProfileImg}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="text-[18px] mb-[15px] font-semibold text-[#455A5C]">
              Vidhan Sabha
            </p>
            <p className="text-[18px] mb-[15px] font-semibold text-[#455A5C]">Loksabha</p>
            <p className="text-[18px] mb-[15px] font-semibold text-[#455A5C]">Total Karykarta</p>
          </div>
          <div className="space-y-2">
            <p className="text-[16px] mb-[15px] font-medium text-[#455A5C]">
            Indore
            </p>
            <p className="text-[16px] mb-[15px] font-medium text-[#455A5C]">Indore</p>
            <p className="text-[16px] mb-[15px] font-medium text-[#455A5C]">400</p>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Profile;
