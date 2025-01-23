import React from "react";
import ProfileDetail from "./Profile";
import Setting from "./Settings";
import Profile from "./Profile/Profile";
import Residency from "./Residency";
import OtherDetails from "./Other";

import AccountDetails from "./AccountDetails";
import { ClientProfileSection } from "styles/pages/SuperAdmin/user";
import { Card } from "antd";

const ClientProfile = () => {
  return (
    <ClientProfileSection>
      <div className="p-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <div className="space-y-6">
              <ProfileDetail />

              <Setting />
            </div>

         
            <div className="space-y-6-details">
              <Profile />
             
              <div className="mt-[20px]">
                
              <Card>
              <AccountDetails />
              <Residency />

                  <OtherDetails />
                  </Card>
              </div>
             
            </div>
            
           
          </div>
        </div>
      </div>
    </ClientProfileSection>
  );
};

export default ClientProfile;
