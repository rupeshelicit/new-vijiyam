import styled from "styled-components";

export const FormDatePickerBox = styled.div`
  .ant-picker-outlined {
    box-shadow: 0px 1.5px 4px -1px #9c9c9f;
    font-family: "Inter", sans-serif;
    height: 48px;
    font-size: 14px;
    width: 100%;
    border: none;
  }
  label {
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }
`;

export const RadioBtnBox = styled.div`
  label {
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }
`;

export const FormInputFeild = styled.div`
  input {
    font-family: "Poppins", sans-serif;
    height: 40px;
    font-size: 14px;
    border: 1px solid #dddddd;
  }
  label {
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }

  .ant-input-outlined:hover {
    border-color: #55418d;
  }
  .ant-input-outlined:focus-within {
    border-color: #55418d;
  }
`;

export const FormSelect = styled.div`
  .ant-select {
    font-family: "Inter", sans-serif;
    height: 40px;
    font-size: 14px;
    border: 1px solid #dddddd;
    border-radius: 8px;
  }
  label {
    font-size: 12px !important;
    font-weight: 400;
    line-height: 19px;
    color: #333333 !important;
    font-family: "Inter", sans-serif;
    display: inline-block;
  }
  .ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
    border: 0px solid #d9d9d9;
  }

  .ant-select-selector:hover {
    border: 1px solid #55418d !important;
    box-shadow: none;
  }
  .ant-select-selector:focus-visible {
    border: none !important;
  }
`;

export const MultiSelectDropdownContainer = styled.div`
  .ant-select-selector {
    border: 1px solid #000;
    padding: 5px 12px;
    background: #ffffff;
    font-size: 14px;
    border-radius: 8px;
  }
  .ant-select {
    font-family: "Inter", sans-serif;
    border: none;
    font-size: 14px;
    border-radius: 8px;
    min-height: 40px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .ant-select-focused.ant-select-outlined:not(.ant-select-disabled):not(
      .ant-select-customize-input
    ):not(.ant-pagination-size-changer)
    .ant-select-selector {
    border-color: #54408c;
    /* box-shadow: 0 0 0 2px rgb(84 64 140); */
    outline: 0;
  }
`;

export const UploadFileComponent = styled.div`
  span {
    position: absolute;
    bottom: -30px;
    font-size: 12px;
    text-align: left;
    left: 0;
    color: #d33b3b;
    font-weight: 400;
  }
  label {
    position: relative;
  }
`;

export const AddDynamicFieldComponent = styled.div`
  .add-field .ant-form-item {
    margin-bottom: 0px !important;
    margin-top: 0px !important;
  }
`;
