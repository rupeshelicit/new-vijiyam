import React, { useState } from "react";
import { Button, Form, Modal, Upload } from "antd";
import styled from "styled-components";
import usePost from "hooks/usePost";
import { GET_ELECTION_PARTY, UPLOAD_KARYKARTA_LIST } from "constants/api";
import { toast } from "react-toastify";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    text-align: center;
  }
`;

const UploadLabel = styled.label`
  background: white;
  color: black;
  font-weight: bold;
  max-width: 355px;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed black;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
  font-family: sans-serif;

  input {
    display: none;
  }

  svg {
    width: 50px;
    height: 50px;
    fill: black;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  background-color: #54408c;
  color: white;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #432c6a;
  }
`;

const AddNewKaryaKarta = ({ setIsModalOpen, isModalOpen }) => {
  const [excelSheet, setExcelSheet] = useState();
  const [loading, setLoading] = useState(false);
  const { mutateAsync: UploadKaryakarta } = usePost();
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExcelSheet(file);
  };

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
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("No file selected for upload.");
    }
  };


  return (
    <StyledModal
      title="Upload KaryaKarta List"
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
    >
      <Form
        onFinish={handleUploadExcel}
        style={{ maxWidth: "375px", paddingTop: "30px", margin: "0 auto" }}
      >
        <Form.Item>
          <UploadLabel htmlFor="uploadFile1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
              <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
            </svg>
            Mobile No. excel sheet upload
            <input
              type="file"
              id="uploadFile1"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileChange}
            />
          </UploadLabel>
        </Form.Item>

        <Form.Item>
          <StyledButton type="primary" htmlType="submit" loading={loading}>
            Submit
          </StyledButton>
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

export default AddNewKaryaKarta;
