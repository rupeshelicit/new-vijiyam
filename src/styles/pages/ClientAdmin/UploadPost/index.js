import styled from "styled-components";
import headerBackground from "assets/images/profile-background.png";

export const UploadPostContainer = styled.div`
  .upload-section {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .description {
    margin-bottom: 20px;
  }
  .ant-upload-wrapper .ant-upload.ant-upload-select {
    width: 180px;
    height: 180px;
    text-align: center;
    vertical-align: top;
    background-color: rgba(0, 0, 0, 0.02);
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.3s;
  }
  .ant-form-item-control-input-content textarea {
    background-color: #6a41cb;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    &:hover {
      background-color: #5531a8;
    }
  }
  
`;
