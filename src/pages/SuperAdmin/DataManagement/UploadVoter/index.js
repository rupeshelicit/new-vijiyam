import React, { useState } from "react";
import { Card, Tabs } from "antd";
import { Container } from "styles/components/common/Layout";
import SingleExcelUploadForm from "./SingleExcelUploadForm";
import MultipleExcelUploadForm from "./MultipleExcelUploadForm";
import { UploadVoterListComponent } from "styles/pages/SuperAdmin/UploadVoterList";
import HeaderButtons from "./HeaderButtons";
import usePost from "hooks/usePost";
import { UPLOAD_VOTER_EXCEL } from "constants/api";

const { TabPane } = Tabs;

const UploadVoterList = () => {
  const [seletedAssembly, setSeletedAssembly] = useState([]);
  const [uploadFile, setUploadFile] = useState();
  const [loading, setLoading] = useState(false);
  const { mutateAsync: UploadVotersExcel } = usePost();
  const {mutateAsync:UploadMultiplVoterExcel}=usePost()
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const [multipleUpload, setMultipleUpload] = useState([
    "document-name.Excel",
    "image-name-goes-here.Excel",
  ]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadFile(file); // Set the selected file
  };

  const handleUploadeVoterList = async () => {
    if (uploadFile) {
      console.log(uploadFile)
      const upladeFileName=uploadFile
      // Create a FormData object
      const formData = new FormData();
      formData.append("excelFile", uploadFile);
      formData.append("createdBy", loginUsers.id);

      try {
        setLoading(true);

        const response = await UploadVotersExcel({
          url: UPLOAD_VOTER_EXCEL,
          type: "details",
          payload: formData,
          token: true,
          file: true,
        });

        if (response) {
          console.log("File uploaded successfully", response);
        }
      } catch (err) {
        console.error("Error uploading file:", err);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("No file selected for upload.");
    }
  };

  const handleMultipleUploadFile = async() => {
    if (uploadFile) {
      console.log(uploadFile)
      const upladeFileName=uploadFile
      // Create a FormData object
      const formData = new FormData();
      formData.append("excelFile", uploadFile);
      formData.append("createdBy", loginUsers.id);

      try {
        setLoading(true);

        const response = await UploadVotersExcel({
          url: UPLOAD_VOTER_EXCEL,
          type: "details",
          payload: formData,
          token: true,
          file: true,
        });

        if (response) {
          console.log("File uploaded successfully", response);
        }
      } catch (err) {
        console.error("Error uploading file:", err);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("No file selected for upload.");
    }
 }

  return (
    <UploadVoterListComponent>
      <Container>
        <HeaderButtons />
        <div className="content-section mt-[15px]">
          <Card className="[box-shadow:0px_4px_4px_0px_#00000040]">
            <Tabs className="custom-tabs " defaultActiveKey="1">
              <TabPane tab="Single Excel Upload" key="1">
                <SingleExcelUploadForm
                  setSeletedAssembly={setSeletedAssembly}
                  setUploadFile={setUploadFile}s
                  onclick={handleUploadeVoterList}
                  isLoding={loading}
                />
              </TabPane>
              <TabPane tab="Multiple Excel Sheet" key="2">
                <MultipleExcelUploadForm
                  setMultipleUpload={setMultipleUpload}
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

export default UploadVoterList;
