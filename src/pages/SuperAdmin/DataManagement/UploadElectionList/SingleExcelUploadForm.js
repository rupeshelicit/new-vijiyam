import React, { useState } from "react";
import { Form, Button } from "antd";
import MultiSelectDropdown from "components/common/FormControl/MultiSelectDropdown";
import UploadFile from "components/common/FormControl/UploadFile";
import usePost from "hooks/usePost";
import { UPLOAD_ELECTION_EXCEL } from "constants/api";
import { toast } from "react-toastify";

const SingleExcelUploadForm = ({ setSeletedAssembly }) => {
  const [loading, setLoading] = useState(false);
  const [excelSheet, setExcelSheet] = useState(null); // Ensures clarity on the state type
  const { mutateAsync: uploadElection } = usePost();
  const loginUser = JSON.parse(localStorage.getItem("userDetails"));

  // Handle File Upload
  const handleUploadExcel = async () => {
    if (!excelSheet) {
      toast.warn("Please select a file to upload.", {
        position: "top-right",
      });
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", excelSheet);
    formData.append("createdBy", loginUser.id);

    try {
      setLoading(true);

      const response = await uploadElection({
        url: UPLOAD_ELECTION_EXCEL,
        type: "details",
        payload: formData,
        token: true,
        file: true,
      });

      if (response) {
        toast.success("File uploaded successfully!", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Failed to upload the file. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="single-excel-upload-content mt-[30px]">
      {/* Header */}
      <h3 className="head text-[20px] font-semibold text-[#54408c]">
        Upload Election List
      </h3>

      <Form onFinish={handleUploadExcel}>
        {/* Content Section */}
        <div className="content pt-[20px] bg-[#EEEEEE63] p-[15px] rounded-[8px]">
          {/* Dropdown Section */}
          <Form.Item className="max-w-[850px]">
            <MultiSelectDropdown
              title="Assembly Name"
              setSelectOption={setSeletedAssembly}
              options={["Indore-1", "Indore-2", "Indore-3"]}
            />
          </Form.Item>

          {/* File Upload Section */}
          <Form.Item>
            <label>Upload Election List</label>
            <div className="flex pt-[10px] upload-file">
              <UploadFile
                inputName="electionList"
                setFile={setExcelSheet}
                inputLable="Drag & drop files or Browse"
                recommend="Supported formats: Excel (.xlsx)"
              />
            </div>
            {/* Show Uploaded File Name */}
          </Form.Item>
        </div>
        {excelSheet && (
          <div className="uploaded-file-name mt-[10px] text-[#54408c] font-medium">
            Uploaded File: {excelSheet.name}
          </div>
        )}
        {/* Submit Button */}
        <Form.Item className="mt-[30px]">
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="sigin-btn text-[16px] font-[500] h-[48px] bg-[#54408C] max-w-[200px]"
            style={{ width: "100%" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#432C6A")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#54408C")
            }
          >
            Submit Sheet
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SingleExcelUploadForm;
