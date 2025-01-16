
import React, { useState, useCallback } from "react";
import { Form, Button, Progress, Card } from "antd";
import { InboxOutlined, CloseOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";

export default function VVPATDemo() {
  const [files, setFiles] = useState([]);
  const [currentUploadingFile, setCurrentUploadingFile] = useState(null);
  const [lastUploadedFile, setLastUploadedFile] = useState(null); 
  const [form] = Form.useForm();

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
      name: file.name,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file) => simulateUpload(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
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

  const getProgressFile = () => {
    if (currentUploadingFile) {
      return files.find((file) => file.name === currentUploadingFile);
    }
    if (lastUploadedFile) {
      return files.find((file) => file.name === lastUploadedFile);
    }
    return null;
  };

  const progressFile = getProgressFile();

  return (
    <Card className="mt-[50px] w-full max-w-[65%]">
    <div className="single-excel-upload-content mt-[30px]">
      <h3 className="head text-[20px] font-semibold text-[#54408c] flex justify-center mb-[35px]">
VVPAT Demo Video Upload
      </h3>

      <Form form={form} layout="vertical">
        <div className="content pt-[20px] bg-[#EEEEEE63] p-[15px] rounded-[8px]">
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
                    Supported formats: Excel
                  </p>
                </div>
              </div>
            </div>
          </Form.Item>

          {progressFile && (
            <div className="mb-4  w-[100%]">
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
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-white border border-green-500 rounded-md mb-5 max-w-[445px] w-[100%] upload-file"
            >
              <div className="flex items-center justify-between p-[5px] ">
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
            className="sigin-btn text-[16px] font-[500] h-[48px] bg-[#54408C] "
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

  );
}
