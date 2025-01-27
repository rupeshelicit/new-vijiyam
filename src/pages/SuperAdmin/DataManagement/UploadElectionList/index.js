import React, { useState } from "react";
import { Card, Tabs, Progress, message, Button } from "antd";
import { Container } from "styles/components/common/Layout";
import SingleExcelUploadForm from "./SingleExcelUploadForm";
import { UploadVoterListComponent } from "styles/pages/SuperAdmin/UploadVoterList";
import HeaderButtons from "./HeaderButtons";

const { TabPane } = Tabs;

const UploadElectionList = () => {
  const [selectedAssembly, setSelectedAssembly] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [multipleUpload, setMultipleUpload] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [fileName, setFileName] = useState(""); // Store file name

  const handleFileChange = (file) => {
    setFileName(file.name);

    const uploadInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        } else {
          clearInterval(uploadInterval);
          message.success("File uploaded successfully!");
          return 100;
        }
      });
    }, 500);
  };

  const handleDelete = () => {
    setUploadFile(null);
    setUploadProgress(0);
    setFileName("");
    message.info("File deleted successfully.");
  };

  return (
    <UploadVoterListComponent>
      <Container>
        <HeaderButtons />
        <div className="content-section mt-[15px]">
          <Card className="[box-shadow:0px_4px_4px_0px_#00000040]">
            <Tabs className="custom-tabs p-[0px]" defaultActiveKey="1">
              <TabPane tab="Single Excel Upload" key="1">
                <SingleExcelUploadForm
                  setSelectedAssembly={setSelectedAssembly}
                  setUploadFile={setUploadFile}
                  onFileChange={handleFileChange}
                />
              </TabPane>
            </Tabs>

            {/* Progress bar, file name, percentage, and delete option */}
            {uploadFile && (
              <div className="mt-[15px]">
                <Progress percent={uploadProgress} />
                <div className="file-info mt-[10px] text-center">
                  <div className="file-name">
                    <strong>{fileName || "No file selected"}</strong>
                  </div>
                  <div className="file-percentage">
                    <strong>{uploadProgress}%</strong>
                  </div>
                  <Button
                    type="danger"
                    onClick={handleDelete}
                    className="mt-[10px]"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </Container>
    </UploadVoterListComponent>
  );
};

export default UploadElectionList;
