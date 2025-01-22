import React, { useState, useCallback, useEffect } from "react";
import { Form, Button, Progress, Card } from "antd";
import { InboxOutlined, CloseOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import ExportToExcel from "components/common/ExportToExcel";
import ExcelIcons from "assets/svg/excelIcons";
import columns from "Data/Vidhansabha";
import { useNavigate } from "react-router-dom";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
import { GET_STATE_LIST, UPLOAD_VIDHANSABHA_BY_EXCEL } from "constants/api";
import useGet from "hooks/useGet";
import usePost from "hooks/usePost";
import { toast } from "react-toastify";

const UploadVidhansabha = () => {
  const [file, setFile] = useState(null); // Store file object
  const navigate = useNavigate();
  const [currentUploadingFile, setCurrentUploadingFile] = useState(null);
  const [lastUploadedFile, setLastUploadedFile] = useState(null);
  const { mutateAsync: GetStateList } = useGet();
  const { mutateAsync: AddVidhansabha } = usePost();
  const [states, setStates] = useState([]);
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const simulateUpload = (file) => {
    setCurrentUploadingFile(file.name);

    const interval = setInterval(() => {
      setFile((prev) => {
        if (prev?.name === file.name && prev.progress < 100) {
          return { ...prev, progress: prev.progress + 20 };
        }
        return prev;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setLastUploadedFile(file.name);
      setCurrentUploadingFile(null);
    }, 3000);
  };

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const newFile = {
      file: acceptedFiles[0], 
      name: acceptedFiles[0].name,
      progress: 0,
    };

    setFile(newFile);
    simulateUpload(newFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: false, 
  });

  const getStateList = async () => {
    await GetStateList({
      url: GET_STATE_LIST,
      type: "details",
    })
      .then((res) => {
        if (res) {
          setStates(res && res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUploadExcel = async (creds) => {
    if (file) {
      try {
        const selectedFile = file;

        const formData = new FormData();
        formData.append("excelFile", selectedFile.file, selectedFile.file.name); // Append the actual file in binary format
        formData.append("stateId", creds.stateId); // Append state ID

        setLoading(true);

        // Perform the file upload request
        const response = await AddVidhansabha({
          url: UPLOAD_VIDHANSABHA_BY_EXCEL,
          type: "details",
          payload: formData,
          token: true,
          file: true,
        });

        if (response) {
          toast.success("Files uploaded successfully!", {
            position: "top-right",
          });
          setFile(null); // Clear the file
          form.resetFields(); // Reset the form
        }
      } catch (err) {
        console.error("Error uploading file:", err);
        toast.error("Error uploading files. Please try again.", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.warn("No file selected for upload.", {
        position: "top-right",
      });
    }
  };

  // Fetch state list on component mount
  useEffect(() => {
    getStateList();
  }, []);

  // Remove uploaded file
  const removeFile = () => {
    setFile(null);
    setCurrentUploadingFile(null);
    setLastUploadedFile(null);
  };

  return (
    <>
      <div
        style={{ justifyContent: "end" }}
        className="!flex !justify-between px-[15px] py-[10px] [box-shadow:0px_2px_8px_0px_#00000022] rounded-[8px] mt-[30px]"
      >
        <h3 className="head text-[20px] font-semibold text-[#54408c] ">
          Upload Vidhansabha List
        </h3>
        <div>
          <div className="flex gap-[30px]">
            <ButtonComponent
              text={"Vidhansabha List"}
              onClick={() => navigate("/voter-list")}
            />
            <ExportToExcel
              buttonText={"Export Demo Excel"}
              Icons={<ExcelIcons />}
              columns={columns}
              excelName="Vidhansabha"
            />
          </div>
        </div>
      </div>

      <Card className="mt-[30px] max-w-[65%]">
        <div className="single-excel-upload-content mt-[0px] ">
          <Form form={form} layout="vertical" onFinish={handleUploadExcel}>
            <div className="content pt-[20px] bg-[#EEEEEE63] p-[15px] rounded-[8px]">
              <Form.Item
                name="stateId"
                label="Select State"
                rules={[{ required: true, message: "Please Select Role" }]}
              >
                <DropdownSelect
                  name="stateId"
                  options={states}
                  placeholder="Please Select State"
                />
              </Form.Item>

              <Form.Item>
                <div
                  {...getRootProps()}
                  className="bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="border-2 border-dashed border-[#54408C] rounded-lg p-8 cursor-pointer">
                    <input {...getInputProps()} />
                    <div className="text-center">
                      <InboxOutlined className="text-4xl text-[#54408C]" />
                      <p className="text-[#54408C] mt-2">
                        Drag & drop a file or{" "}
                        <span className="underline">Browse</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Supported formats: Excel
                      </p>
                    </div>
                  </div>
                </div>
              </Form.Item>

              {file && (
                <div className="mb-4 w-[100%]">
                  <Progress
                    percent={file.progress}
                    size="small"
                    status={file.progress === 100 ? "success" : "active"}
                    strokeColor="#52c41a"
                  />
                  <label className="block text-gray-700 mt-2">
                    {currentUploadingFile
                      ? `Uploading: ${file.name}`
                      : `Last Uploaded: ${file.name}`}
                  </label>
                  <div className="bg-white border border-green-500 rounded-md mb-5 max-w-[445px] w-[100%] upload-file">
                    <div className="flex items-center justify-between p-[5px]">
                      <span className="text-gray-800 font-medium">
                        {file.name}
                      </span>
                      <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={removeFile}
                        className="text-red-500 hover:text-red-700"
                        disabled={file.name === currentUploadingFile}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Form.Item className="mt-6">
              <Button
                type="primary"
                loading={loading}
                htmlType="submit"
                className="sigin-btn text-[16px] font-[500] h-[48px] bg-[#54408C]"
                style={{ width: "100%" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#432C6A")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#54408C")
                }
              >
                Upload File
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </>
  );
};

export default UploadVidhansabha;
