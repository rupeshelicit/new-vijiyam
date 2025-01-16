import styled from "styled-components";

export const VoterFilterContainer = styled.div`
  .ant-form-item {
    margin-bottom: 0px;
  }

  .ant-slider .ant-slider-track {
    background-color: #574494;
    border-radius: 2px;
  }

  .ant-slider .ant-slider-handle::after {
    box-shadow: 0 0 0 2px #564290;
  }

  .voterFilter .export-file button {
    padding-left: 75px !important;
    padding-right: 75px !important;
  }

  .voterFilter .export-file button.active span {
    color: white;
  }
  .ant-select-selector:hover {
    border-color: #574494;
  }

  .ant-select-focused.ant-select-outlined:not(.ant-select-disabled):not(
      .ant-select-customize-input
    ):not(.ant-pagination-size-changer)
    .ant-select-selector {
    border: 1px solid #574494;
    border-color: #574494;
    box-shadow: none;
    outline: 0;
  }
  span.anticon.anticon-filter.text-lg svg {
    margin-top: -11px;
  }
`;
