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
          <div className="w-32 h-32 bg-[#ffff] rounded-full flex items-center justify-center">
            <img src={ profileDetails?.profileDetails?.partyIcon } alt="BJP Logo" className="w-24 h-24" />
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
                VidhanSabha
              </span>
              <span className="font-medium text-[#A6A8A8]">{ profileDetails?.profileDetails?.vidhansabha?.name }</span>
              <span className="text-[#455A5C] text-[18px] font-semibold">
                Age
              </span>
              <span className="font-medium text-[#A6A8A8]">{ profileDetails?.profileDetails?.age } Years</span>
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
              <span className="font-medium text-[#A6A8A8]">{ profileDetails?.profileDetails?.gender }</span>
              <span className="text-[#455A5C] text-[18px] font-semibold">
                Address
              </span>
              <span className="font-medium text-[#A6A8A8]">{ profileDetails?.profileDetails?.vidhansabha?.name }</span>
              <span className="text-[#455A5C] text-[18px] font-semibold">
                Mobile No.
              </span>
              <span className="font-medium text-[#A6A8A8]">{ profileDetails?.profileDetails?.mobileNumber }</span>
            </div>
          </div>
          <button className="w-full bg-[#54408C] text-white py-2 rounded-md flex items-center justify-center gap-2 text-[20px] font-semibold border border-solid border-[#54408C]">
            <div className="flex items-center gap-2">
              <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.125 7.1499H17.375M4.125 4.1499H17.375M4.125 10.1499H12.375M19 0.649902H2.5C2.10218 0.649902 1.72064 0.807937 1.43934 1.08924C1.15804 1.37055 1 1.75208 1 2.1499V12.1499C1 12.5477 1.15804 12.9293 1.43934 13.2106C1.72064 13.4919 2.10218 13.6499 2.5 13.6499H3.32V17.3499L7.45 13.6499H19C19.3978 13.6499 19.7794 13.4919 20.0607 13.2106C20.342 12.9293 20.5 12.5477 20.5 12.1499V2.1499C20.5 1.75208 20.342 1.37055 20.0607 1.08924C19.7794 0.807937 19.3978 0.649902 19 0.649902Z" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              <span>Contact</span>
            </div>
          </button>
        </div>
      </Card>
    </Container>
  );
};

export default ProfileDetail;
