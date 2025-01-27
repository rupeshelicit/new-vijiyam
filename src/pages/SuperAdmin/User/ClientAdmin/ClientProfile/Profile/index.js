import React from "react";
import { Card } from "antd";
import { Container } from "styles/components/common/Layout";
import partyIcon from "assets/images/BJP-Icon.png";
import MessageIcon from "assets/svg/messageIcon";
import { useMetaDataContext } from "context/metaData";

const ProfileDetail = () => {
  const { clientProfileData } = useMetaDataContext();

  const {
    name = "Rahul Gandhi",
    fatherName = "ABCD",
    countryName = "India",
    age = "28",
    partyName = "BJP",
    birthDate = "19/03/2001",
    religion = "Hindu",
    gender = "Male",
    address = "Info",
    mobileNO = "9876543210",
  } = clientProfileData || {};

  const profileFields = [
    { label: "Name", value: name },
    { label: "Father", value: fatherName },
    { label: "Country", value: countryName },
    { label: "Age", value: `${age} Years` },
    { label: "DOB", value: birthDate },
    { label: "Religion", value: religion },
    { label: "Gender", value: gender },
    { label: "Address", value: address },
    { label: "Mobile No.", value: mobileNO },
  ];

  return (
    <Container>
      <Card className="shadow-sm ">
        <div className="flex flex-col items-center space-y-6">
          {/* Party Icon */}
          <div className="w-32 h-32 bg-[#FF6B35] rounded-full flex items-center justify-center">
            <img
              src={
                clientProfileData?.partyIcon != null // Checks for both null and undefined
                  ? clientProfileData?.partyIcon
                  : partyIcon
              }
              alt="Party Logo"
              className="w-24 h-24"
            />
          </div>

          <div className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {profileFields.map((field, index) => (
                <React.Fragment key={index}>
                  <span className="text-[#455A5C] text-[18px] font-semibold">
                    {field.label}
                  </span>
                  <span className="text-[16px] font-medium text-[#A6A8A8]">
                    {field.value}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <button className="w-full bg-[#54408C] text-white py-2 rounded-md flex items-center justify-center gap-2 text-[20px] font-semibold">
            <MessageIcon size={20} className="text-white" />
            <span>Contact</span>
          </button>
        </div>
      </Card>
    </Container>
  );
};

export default ProfileDetail;
