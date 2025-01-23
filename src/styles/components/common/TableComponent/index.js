import styled from "styled-components";

export const TableContainer = styled.div`
  // border: 1px solid #ececec;
  width: 100%;
  margin: 20px 0 10px;
  border-radius: 10px;
  overflow: hidden;
  // box-shadow: 0px 2px 8px 0px #00000022;
  // border-radius: 8px;
  // .ant-table-wrapper {
  //   padding: 20px 20px 45px 20px;
  // }
  p{
    text-align: left !important;
  }
  .ant-table {
    overflow: auto;
  }
  .ant-table-content table {
    tr th {
      background-color: #eaecf0;
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
      color: #667085;
    }
    tr td {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: #667085;
    }
  }

  .ant-pagination-item-active a{
      color: #074f7d;
  }
      .ant-pagination-item-active{
          border-color: #55418d;
      }
  .ant-pagination-next {
    span {
      background-color: #55418d;
      display: inline;
      padding: 10px 20px;
      border-radius: 8px;
    }
    span::after {
      color: #fff;
      content: "Next";
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
    }
    button {
      position: relative;
    }
  
    svg {
      display: none;
    }
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #54408c;
    border-color: #54408c;
  }
  span.ant-checkbox.ant-wave-target.css-dev-only-do-not-override-qnu6hi.ant-checkbox-checked {
    background-color: #54408c;
    border-color: #54408c;
  }
  .ant-pagination-prev {
    button {
      position: relative;
    }

    span {
      background-color: #55418d;
      display: inline;
      padding: 10px 20px;
      border-radius: 8px;
    }

    span:after {
      color: #fff;
      content: "Prev";
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
    }
    svg {
      display: none;
    }
  }
  button.ant-switch {
    box-shadow: inset 0px 4px 4px 0px #00000040;
  }
  button.ant-switch.ant-switch-checked {
    background: #37cd3721;
  }
  button.ant-switch.ant-switch-checked .ant-switch-handle::before {
    background-color: #37cd37;
  }
  button.ant-switch {
    background: #c0000057;
  }
  button.ant-switch .ant-switch-handle::before {
    background: #c00000;
  }
  .ant-switch.ant-switch-checked:hover {
    background: #fff;
  }
  .ant-switch:hover {
    background: rgb(0 0 0 / 21%);
  }
`;
export const Tabletitle = styled.h4`
  // background: linear-gradient(161.5deg, #36affb -15.49%, #065281 98.81%);
  font-family: "Inter", sans-serif;
  font-size: 18px;
  margin: 0px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.2px;
  text-align: left;
  color: #000000;
  padding: 7px 7px;
`;
