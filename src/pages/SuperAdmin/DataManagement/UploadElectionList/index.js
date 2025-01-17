import React, { useState } from "react";
import { Card, Tabs } from "antd";
import { Container } from "styles/components/common/Layout";
import SingleExcelUploadForm from "./SingleExcelUploadForm";
import { UploadVoterListComponent } from "styles/pages/SuperAdmin/UploadVoterList";
import HeaderButtons from "./HeaderButtons";

const { TabPane } = Tabs;

const UploadElectionList = () => {
  const [seletedAssembly, setSeletedAssembly] = useState([]);
  const [uploadFile, setUploadFile] = useState();
  const [multipleUpload, setMultipleUpload] = useState([
    "document-name.Excel",
    "image-name-goes-here.Excel",
  ]);

  return (
    <UploadVoterListComponent>
      <Container>
        <HeaderButtons />
        <div className="content-section mt-[15px]">
          <Card className="[box-shadow:0px_4px_4px_0px_#00000040]">
            <Tabs className="custom-tabs p-[0px]" defaultActiveKey="1">
              <TabPane tab="Single Excel Upload" key="1">
                <SingleExcelUploadForm
                  setSeletedAssembly={setSeletedAssembly}
                  setUploadFile={setUploadFile}
                />
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </Container>
    </UploadVoterListComponent>
  );
};

export default UploadElectionList;
