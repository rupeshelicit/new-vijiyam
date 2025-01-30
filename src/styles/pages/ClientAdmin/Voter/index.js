import styled from "styled-components";
export const VoterListSection = styled.div`
  .voter-search-list-buttons button.active span {
    color: #ffff;
  }
  .ant-card-bordered {
    border: none;
  }
  .bkklIU {
    width: 100%;
    box-shadow: none;
  }
   {
    border: none;
    margin: 0px;
    border-radius: 0px;
    box-shadow: none;
  }
  .ant-table-content table tr th {
    background-color: #eaecf0;
  }
  .ant-table-wrapper {
    padding: 0px;
  }
  button.active svg path {
    stroke: white;
  }
  .ant-modal-footer {
    display: none;
  }
  @media (max-width: 450px) {
  }

  @media (max-width: 768px) {
    button span {
      font-size: 10px;
    }
  }
  @media (max-width: 991px) {
    .voter-search-list-buttons {
      flex-wrap: wrap;
    }
  }
`;
export const FileUploadModal = styled.div`
  div#\:r21\: {
    padding-bottom: 20px;
  }
  .ant-form-item-control-input-content .ant-upload.ant-upload-select {
    width: 375px;
    height: 235px;
  }
  .ant-modal .ant-modal-footer {
    display: "none";
  }
  .ant-upload.ant-upload-select {
    width: 100%;
    height: 100%;
    max-width: 350px;
    height: 350px;
  }
`;

export const ExportTables = styled.div`
  .ant-drawer-header {
    background: #f3f3f3 !important;
  }
  .ant-col.ant-form-item-label {
    width: 100% !important;
    text-align: left !important;
  }
  .ant-row.ant-form-item-row {
    display: flex;
    flex-flow: row wrap;
    min-width: 0;
    flex-direction: column;
  }
  .ant-row {
    flex-direction: column !important;
  }
  .ant-select {
    box-shadow: none;
  }
  .ant-drawer-content.drowr lable {
    color: #000000b5 !important;
    font-size: 12px !important;
  }
`;
