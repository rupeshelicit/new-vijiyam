import React, { useState } from "react";
import { Card, Tabs } from "antd";
import { Container } from "styles/components/common/Layout";
import SingleExcelUploadForm from "./SingleExcelUploadForm";
import MultipleExcelUploadForm from "./MultipleExcelUploadForm";
import { UploadVoterListComponent } from "styles/pages/SuperAdmin/UploadVoterList";
import HeaderButtons from "./HeaderButtons";

const { TabPane } = Tabs;

const UploadKarykarta = () => {
  const [seletedAssembly, setSeletedAssembly] = useState([]);
  const [selectClientAdmin, setSelectClientAdmin] = useState([]);
 
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
            <Tabs className="custom-tabs p-[40px]" defaultActiveKey="1">
              <TabPane tab="Single Excel Upload" key="1">
                <SingleExcelUploadForm
                  setSeletedAssembly={setSeletedAssembly}
                  setUploadFile={setUploadFile}
                  setSelectClientAdmin={setSelectClientAdmin}
                  
                />
              </TabPane>
              <TabPane tab="Multiple Excel Sheet" key="2">
                <MultipleExcelUploadForm
                  setMultipleUpload={setMultipleUpload}
                  setSelectClientAdmin={setSelectClientAdmin}
                  multipleUpload={multipleUpload}
                  
                />
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </Container>
    </UploadVoterListComponent>
  );
};

export default UploadKarykarta;
