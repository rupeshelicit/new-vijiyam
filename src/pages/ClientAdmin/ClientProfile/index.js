import React, { useEffect ,useState} from "react";
import ProfileDetail from "./Profile";
import Setting from "./Settings";
import Profile from "./Profile/Profile";
import Residency from "./Residency";
import OtherDetails from "./Other";

import AccountDetails from "./AccountDetails";
import { ClientProfileSection } from "styles/pages/SuperAdmin/user";
import { Card } from "antd";
import useGet from "hooks/useGet";
import { ProfileDetails } from "constants/api";


const PersonalProfile = () =>
{
  const loginUsers = JSON.parse( localStorage.getItem( "userDetails" ) );
  const id = loginUsers.id;
  const { mutateAsync: GetProfile } = useGet();
  const [ profileDetails, setProfileDetails ] = useState();

  const FeatchData = () =>
  {
    GetProfile( {
      url: ProfileDetails+ id,
      type: "details",
      token: true,
    } )
      .then( ( res ) =>
      {
        setProfileDetails( res )       
      } )
      .catch( ( err ) => { } );
  };
  useEffect( () =>
  {
    FeatchData()
  }, [] )

  return (
    <ClientProfileSection>
      <div className="p-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <div className="space-y-6">
              <ProfileDetail profileDetails={ profileDetails } />

              <Setting profileDetails={ profileDetails } />
            </div>

         
            <div className="space-y-6-details">
              <Profile profileDetails={profileDetails} />
             
              <div className="mt-[20px]">
                
              <Card>
                  <AccountDetails profileDetails={ profileDetails } />
                  <Residency profileDetails={ profileDetails } />

                  <OtherDetails profileDetails={ profileDetails } />
                  </Card>
              </div>
             
            </div>
            
           
          </div>
        </div>
      </div>
    </ClientProfileSection>
  );
};

export default PersonalProfile;
