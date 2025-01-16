import React, { useState } from "react";
import { Form, Button } from "antd";
import MultiSelectDropdown from "components/common/FormControl/MultiSelectDropdown";
import UploadFile from "components/common/FormControl/UploadFile";
import usePost from "hooks/usePost";
import { UPLOAD_KARYKARTA_LIST } from "constants/api";
import { toast } from "react-toastify";

const SingleExcelUploadForm = ({
  setSeletedAssembly,
  setSelectClientAdmin,
}) => {
  const [loading, setLoading] = useState(false);
  const { mutateAsync: UploadKaryakarta } = usePost();
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const [excelSheet, setExcelSheet] = useState();
  const handleUploadExcel = async () => {
    if (excelSheet) {
      console.log(excelSheet);
      const upladeFileName = excelSheet;
      const formData = new FormData();
      formData.append("excelFile", excelSheet);
      formData.append("createdBy", loginUsers.id);

      try {
        setLoading(true);

        const response = await UploadKaryakarta({
          url: UPLOAD_KARYKARTA_LIST,
          type: "details",
          payload: formData,
          token: true,
          file: true,
        });

        if (response) {
          toast.success("Files uploaded successfully!", {
            position: "top-right",
          });
          setIsModalOpen(false);
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

  return (
    <div className="single-excel-upload-content mt-[30px]">
      <h3 className="head text-[20px] font-semibold text-[#54408c]">
        Upload Karyakarta list
      </h3>
      <Form onFinish={handleUploadExcel}>
        <div
          className="content pt-[20px] bg-[#EEEEEE63] p-[15px] rounded-[8px]
"
        >
          <div className="flex justify-between gap-[30px]">
            {" "}
            <Form.Item className="w-[100%]">
              <MultiSelectDropdown
                title={"Assembly Name"}
                setSelectOption={setSeletedAssembly}
                options={["Indore-1", "Indore-2", "Indore-3"]}
              />
            </Form.Item>
            <Form.Item className="w-[100%]">
              <MultiSelectDropdown
                title={"Client Admin Name"}
                setSelectOption={setSelectClientAdmin}
                options={["Indore-1", "Indore-2", "Indore-3"]}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <label>Upload Excel Sheet</label>
            <div className="display: flex pt-[10px] upload-file">
              <UploadFile
                inputName={"mobileNoList"}
                setFile={setExcelSheet}
                inputLable={"Drag & drop files or Browse"}
                recommend={"Supported formats: Excel"}
              />
            </div>
          </Form.Item>
        </div>
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
