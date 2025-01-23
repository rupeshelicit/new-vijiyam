import React, { useState, useCallback } from "react";
import { Form, Button, Progress, Card } from "antd";
import { InboxOutlined, CloseOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import { ADD_NEW_TERMS_CONDITION } from "constants/api";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

export default function TermsAndConditions() {
  const [files, setFiles] = useState([]);
  const [currentUploadingFile, setCurrentUploadingFile] = useState(null);
  const [lastUploadedFile, setLastUploadedFile] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const usersRole = JSON.parse(localStorage.getItem("roleList")) || [];

  const { mutateAsync: uploadTermsAndConditions } = useMutation(
    async (data) => {
      const response = await fetch(ADD_NEW_TERMS_CONDITION, {
        method: "POST",
        body: data,
      });
      if (!response.ok) throw new Error("Upload failed");
      return response.json();
    }
  );

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
      setLastUploadedFile(file.name);
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
    if (lastUploadedFile === fileName) {
      setLastUploadedFile(null);
    }
  };

  const handleUploadTermsAndCondition = async (creds) => {
    if (creds && files.length > 0) {
      const formData = new FormData();
      formData.append("key", "rules");
      formData.append("roleId", creds.roleId);
      files.forEach((fileObj) => formData.append("files", fileObj.file)); // Pass binary file here
  
      try {
        setLoading(true);
        await uploadTermsAndConditions(formData);
        toast.success("Files uploaded successfully!", { position: "top-right" });
        form.resetFields();
        setFiles([]);
      } catch (err) {
        toast.error("Files not uploaded!", { position: "top-right" });
      } finally {
        setLoading(false);
      }
    } else {
      toast.warn("Please select a role and upload files!", {
        position: "top-right",
      });
    }
  };
  const progressFile =
    files.find((file) => file.name === currentUploadingFile) ||
    files.find((file) => file.name === lastUploadedFile);

  return (
    <Card className="mt-[50px] w-full max-w-[65%]">
      <div className="single-excel-upload-content mt-[30px]">
        <h3 className="head text-[20px] font-semibold text-[#54408c] flex justify-center mb-[35px]">
          Terms And Condition
        </h3>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleUploadTermsAndCondition}
        >
          <div className="content pt-[20px] bg-[#EEEEEE63] p-[15px] rounded-[8px]">
            <Form.Item
              name="roleId"
              label="Select Role"
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
                  status={progressFile.progress === 100 ? "success" : "active"}
                  strokeColor="#52c41a"
                />
                <label className="block text-gray-700 mt-2">
                  {currentUploadingFile
                    ? `Uploading: ${progressFile.name}`
                    : `Last Uploaded: ${progressFile.name}`}
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
                  <span className="text-gray-800 font-medium">{file.name}</span>
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
              className="sigin-btn text-[16px] font-[500] h-[48px] bg-[#54408C]"
              style={{ width: "100%" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#432C6A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#54408C")
              }
              disabled={files.length === 0 || loading}
            >
              {loading ? "Uploading..." : "Upload Files"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
}
