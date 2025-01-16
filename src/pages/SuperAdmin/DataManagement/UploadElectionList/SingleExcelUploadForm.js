import React from "react";
import { Form, Button } from "antd";
import MultiSelectDropdown from "components/common/FormControl/MultiSelectDropdown";
import UploadFile from "components/common/FormControl/UploadFile";

const SingleExcelUploadForm = ({ setSeletedAssembly, setUploadFile }) => {
  return (
    <div className="single-excel-upload-content mt-[30px]">
      <h3 className="head text-[20px] font-semibold text-[#54408c]">
        Upload Election list
      </h3>
      <Form>
        <div className="content pt-[20px] bg-[#EEEEEE63] p-[15px] rounded-[8px]
">
          <Form.Item className="max-w-[850px]">
            <MultiSelectDropdown
              title={"Assembly Name"}
              setSelectOption={setSeletedAssembly}
              options={["Indore-1", "Indore-2", "Indore-3"]}
            />
          </Form.Item>
          <Form.Item>
            <label>Upload Election list </label>
            <div className="display: flex pt-[10px] upload-file">
              <UploadFile
                inputName={"mobileNoList"}
                setFile={setUploadFile}
                inputLable={"Drag & drop files or Browse"}
                recommend={"Supported formats: Excel"}
              />
            </div>
          </Form.Item>
        </div>
        <Form.Item className="mt-[30px]">
          <Button
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
