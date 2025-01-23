import { Card } from "antd";
import React from "react";
import { Container } from "styles/components/common/Layout";
import partyIcon from "assets/images/BJP-Icon.png";
import MessageIcon from "assets/svg/messageIcon";
const ProfileDetail = ( profileDetails ) =>
{
  console.log( profileDetails?.profileDetails ,"dsfsdf");
  
  const data = [
    {
      name: "Rahul Gandhi",
      fatherName: "ABCD",
      countryName: "India",
      age: "28",
      partyName: "BJP",
      birthDate: "19/03/2001",
      religion: "Hindu",
      gender: "Male",
      address: "Info",
      mobileNO: "9876543210",
    },
  ];
  const formatDate = ( isoDate ) =>
  {
    const date = new Date( isoDate );
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString( "en-US", options ).replace( /,/g, "" );
  };
  const formattedDate = formatDate( profileDetails?.profileDetails?.dateOfBirth );

  return (
    <Container>
      <Card className="shadow-sm">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 bg-[#FF6B35] rounded-full flex items-center justify-center">
            <img src={partyIcon} alt="BJP Logo" className="w-24 h-24" />
          </div>
          <div className="w-full space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-[#455A5C] text-[18px] font-semibold">
                Name
              </span>
              <span className="text-[16px] font-medium text-[#A6A8A8]">
                { profileDetails?.profileDetails?.name }
              </span>
              <span className="text-[#455A5C] text-[18px] font-semibold">
                Father
              </span>
              <span className="font-medium text-[#A6A8A8]">{ profileDetails?.profileDetails?.fatherName }</span>
              <span className="text-[#455A5C] text-[18px] font-semibold">
                Country
              </span>
              <span className="font-medium text-[#A6A8A8]">India</span>
              <span className="text-[#455A5C] text-[18px] font-semibold">
                Age
              </span>
              <span className="font-medium text-[#A6A8A8]">28 Years</span>
              <span className="text-[#455A5C] text-[18px] font-semibold">
                DOB
              </span>
              <span className="font-medium text-[#A6A8A8]">{formattedDate}</span>
              <span className="text-[#455A5C] text-[18px] font-semibold">
                Religion
              </span>
              <span className="font-medium text-[#A6A8A8]">Hindu</span>
              <span className="text-[#455A5C] text-[18px] font-semibold">
                Gender
              </span>
              <span className="font-medium text-[#A6A8A8]">Male</span>
              <span className="text-[#455A5C] text-[18px] font-semibold">
                Address
              </span>
              <span className="font-medium text-[#A6A8A8]">Info</span>
              <span className="text-[#455A5C] text-[18px] font-semibold">
                Mobile No.
              </span>
              <span className="font-medium text-[#A6A8A8]">9876543210</span>
            </div>
          </div>
          <button className="w-full bg-[#54408C] text-white py-2 rounded-md flex items-center justify-center gap-2 text-[20px] font-semibold">
            <div className="flex items-center gap-2">
              <MessageIcon size={20} className="text-white" />

              <span>Contact</span>
            </div>
          </button>
        </div>
      </Card>
    </Container>
  );
};

export default ProfileDetail;
