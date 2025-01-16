"use client";

import React, { useState, useCallback } from "react";
import { Form, Button } from "antd";
import { InboxOutlined, CloseOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import { UPLOAD_VOTER_EXCEL } from "constants/api";
import usePost from "hooks/usePost";

export default function ExcelUpload() {
  const [files, setFiles] = useState([]);
  const [currentUploadingFile, setCurrentUploadingFile] = useState(null);
  const [lastUploadedFile, setLastUploadedFile] = useState(null);
  const { mutateAsync: UploadVotersExcel } = usePost();
  const [loading, setLoading] = useState(false);
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const [form] = Form.useForm();

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
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

  const onFinish = async () => {
    const payload = files.map((file) => ({
      name: file.name,
    }));
    
    console.log("Uploaded Files: ", payload);

    if (payload) {
      const upladeFileName = payload;
      const formData = new FormData();
      formData.append("excelFile", upladeFileName);
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
      console.warn("No file select");
    }
  };

  return (
    <div className="single-excel-upload-content mt-[30px]">
      <h3 className="head text-[20px] font-semibold text-[#54408c]">
        Upload Karyakarta list
      </h3>

      <Form form={form} layout="vertical" onFinish={onFinish}>
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

          <label>Uploaded Files</label>
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-white border border-green-500 rounded-md mb-5 w-[100%] max-w-[445px] upload-file"
            >
              <div className="flex items-center justify-between p-[5px] w-[100%]">
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
}
