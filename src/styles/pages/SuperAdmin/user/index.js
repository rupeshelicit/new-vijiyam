import styled from "styled-components";

export const ClientAdminComponent = styled.div`
  .ant-upload.ant-upload-select {
    width: 225px !important;
    height: 150px !important;
  }
  .ant-upload-wrapper.ant-upload-picture-card-wrappe {
    width: 225px;
    height: 150px;
  }
  .ant-form-item-control-input-content input {
    padding: 10px 10px 10px 10px;
  }
  .ant-form-item {
    margin: 0px !important;
  }
  .ant-col.ant-form-item-label label {
    font-size: 16px !important;
    font-weight: 400;
    color: #4f4f4f !important;
  }

  .ant-switch.ant-switch-checked {
    background: #55418d !important;
  }
  button.ant-switch {
    background: rgb(85 65 141 / 70%);
  }
  .ant-form-item {
    margin: 0px !important;
  }

  .ant-form-item-control-input-content input {
    padding: 5px 10px 5px 10px !important;
  }
  .ant-picker-outlined:hover {
    border-color: #55418d;
    background-color: #ffffff;
  }
  .client-upload-input-filed label {
    max-width: 232px !important;
    height: 150px !important;
  }
`;
export const ClientListSection = styled.div`
  .client-search-list-buttons button.active span {
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
    .client-search-list-buttons {
      flex-wrap: wrap;
    }
  }
`;
export const ClientProfileSection = styled.div`
  .space-y-6-details label {
    font-size: 22px;
    font-weight: 700;
    color: #455a5c;
  }

  .space-y-6-details span.text-gray-600 {
    font-size: 17px;
    font-weight: 600;
    color: #455a5c;
  }
  .space-y-6-details span {
    font-size: 15px;
    font-weight: 600;
    color: #a6a8a8;
  }
  .ant-switch-checked {
    background-color: #55418d !important; /* Set a clear, consistent color for the "checked" state */
  }
  .ant-card-body {
    background: #00000024;
    border-radius: 0px;

    box-shadow: 0px 8.79px 10.99px 1.1px #00000024;
    border-radius: 8px;
  }

  .switch-button .ant-card-body {
    border-radius: 0 0px 10px 11px;
  }
  .ant-card-head {
    background: #00000024;
  }
  .ant-switch {
    background-color: rgba(
      85,
      65,
      141,
      0.5
    ); /* Use rgba for better readability and percentage transparency */
  }
`;
