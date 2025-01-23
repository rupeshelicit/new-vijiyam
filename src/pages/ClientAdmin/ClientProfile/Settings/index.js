import { Card, Switch } from "antd";
import React from "react";
import { Container } from "styles/components/common/Layout";

const Setting = () => {
  return (
    <Container>
      <Card title="Settings" className="shadow-sm switch-button" >
      <div className="space-y-4 ">
          <div className="flex items-center justify-between">
            <span className="text-sm ">Bio Settings</span>
            <Switch
              size="large"
              defaultChecked
              checkedChildren="On"
              unCheckedChildren="Off"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">with Candidate Image</span>
            <Switch size="large" checkedChildren="On" unCheckedChildren="Off" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">with Candidate Image</span>
            <Switch
              size="large"
              defaultChecked
              checkedChildren="On"
              unCheckedChildren="Off"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">with Candidate Image</span>
            <Switch size="large" checkedChildren="On" unCheckedChildren="Off" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">with Candidate Image</span>
            <Switch
              size="large"
              defaultChecked
              checkedChildren="On"
              unCheckedChildren="Off"
            />
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Setting;
