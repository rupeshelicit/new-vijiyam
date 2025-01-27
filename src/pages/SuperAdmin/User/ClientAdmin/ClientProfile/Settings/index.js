import { Card, Switch } from "antd";
import { useMetaDataContext } from "context/metaData";
import React from "react";
import { Container } from "styles/components/common/Layout";

const Setting = () => {
  const { clientProfileData } = useMetaDataContext();

  const { status, isPermission, isSurveyAssign, image } =
    clientProfileData || {};
  return (
    <Container>
      <Card title="Settings" className="shadow-sm switch-button">
        <div className="space-y-4 ">
          <div className="flex items-center justify-between">
            <span className="text-sm ">status</span>
            <Switch
              checked={status}
              size="large"
              defaultChecked
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled={true}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">SurveyAssign</span>
            <Switch
              checked={isSurveyAssign}
              size="large"
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled={true}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Permission</span>
            <Switch
              checked={isPermission}
              size="large"
              defaultChecked
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled={true}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">with Candidate Image</span>
            <Switch
              checked={image !== null ? true : false}
              size="large"
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled={true}
            />
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
