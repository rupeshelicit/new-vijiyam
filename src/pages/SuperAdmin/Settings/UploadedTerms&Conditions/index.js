import React, { useState, useCallback } from "react";
import { Form, Button, Progress, Card } from "antd";
import { InboxOutlined, CloseOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import { ADD_NEW_TERMS_CONDITION } from "constants/api";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import usePost from "hooks/usePost";
import Item from "antd/es/list/Item";

export default function UploadGuidelinesAndTerms() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUploadingFile, setCurrentUploadingFile] = useState(null);

  const usersRole = [
    {
      id: 1,
      name: "Authorized User",
    },
    {
      id: 2,
      name: "Standard User",
    },
    {
      id: 3,
      name: "Client Admin",
    },
    {
      id: 4,
      name: "Distributor",
    },
  ];

  const { mutateAsync: uploadTermsAndConditions } = usePost();

  const simulateUpload = (file) => {
    setCurrentUploadingFile(file.name);

    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.name === file.name && f.progress < 100) {
            return { ...f, progress: f.progress + 20 };
          }
          return f;
        })
      );
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setCurrentUploadingFile(null);
    }, 3000);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file) => simulateUpload(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });

  const removeFile = (fileName) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
    if (currentUploadingFile === fileName) {
      setCurrentUploadingFile(null);
    }
  };

  const handleUpload = async (creds) => {
    const user = usersRole.map((Item) => Item?.id === creds?.id);
    if (files?.length === 0) {
      console.warn("No files to upload.");
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("description", file?.raw);
    });

    formData.append("roleId", creds?.roleId);
    formData.append("title", `${user?.name}terms and Condition`);
    try {
      setLoading(true);
      const response = await uploadTermsAndConditions;
      ({
        url: ADD_NEW_TERMS_CONDITION,
        type: "details",
        payload: formData,
        token: true,
        file: true,
      });
      if (response) {
        toast.success("Files uploaded successfully!", {
          position: "top-right",
        });
        form.resetFields();
        setFiles([]);
      }
    } catch (err) {
      console.error("Error uploading files:", err);
    } finally {
      setLoading(false);
    }
  };

  const progressFile = files.find((file) => file.name === currentUploadingFile);

  return (
    <>
      <h3 className="head text-[20px] font-semibold text-[#54408c] flex justify-start mb-[15px] mt-[15px]">
        Terms And Condition
      </h3>
      <Card className="mt-[2  0px] w-full max-w-[65%]">
        <div className="single-excel-upload-content mt-[30px]">
          <Form layout="vertical" onFinish={handleUpload}>
            <div className="content pt-[20px] bg-[#EEEEEE63] p-[15px] rounded-[8px]">
              <Form.Item
                name="roleId"
                label="Select User Role"
                rules={[{ required: true, message: "Please Select Role" }]}
              >
                <DropdownSelect
                  name="roleId"
                  options={usersRole}
                  placeholder="Please Select Role"
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
                        Drag & drop files or{" "}
                        <span className="underline">Browse</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Supported formats: PDF
                      </p>
                    </div>
                  </div>
                </div>
              </Form.Item>

              {progressFile && (
                <div className="mb-4 w-[100%]">
                  <Progress
                    percent={progressFile.progress}
                    size="small"
                    status={
                      progressFile.progress === 100 ? "success" : "active"
                    }
                    strokeColor="#52c41a"
                  />
                  <label className="block text-gray-700 mt-2">
                    {`Uploading: ${progressFile.name}`}
                  </label>
                </div>
              )}

              <label>Uploaded Files</label>
              {files.map((file) => (
                <div
                  key={file.name}
                  className="bg-white border border-green-500 rounded-md mb-5 max-w-[445px] w-[100%] upload-file"
                >
                  <div className="flex items-center justify-between p-[5px]">
                    <span className="text-gray-800 font-medium">
                      {file.name}
                    </span>
                    <Button
                      type="text"
                      icon={<CloseOutlined />}
                      onClick={() => removeFile(file.name)}
                      className="text-red-500 hover:text-red-700"
                      disabled={file.name === currentUploadingFile}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Form.Item className="mt-6">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="sigin-btn text-[16px] font-[700] h-[48px] bg-[#54408C] mt-[50px]"
                style={{ width: "100%" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#432C6A")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#54408C")
                }
              >
                Upload Files
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </>
  );
}
