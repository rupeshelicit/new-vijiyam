import styled from "styled-components";
// import HomeBannerimage from "assets/images/bannerimage.png";

export const DashboardCard = styled.div`
  .ant-card-body {
    background: #eef6ff;
    border-radius: 8px 8px;
  }
  .cardvalue-data {
    display: flex;
    gap: 8px;
    font-size: 10px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.06em;
    color: #121315;
    align-items: center;
  }
  .card-value {
    background-color: #bde5fe;
    color: #1169a0;
    font-family: Inter;
    font-size: 12px;
    font-weight: 475;
    line-height: 18px;
    padding: 0px 6px;
    gap: 2px;
    border-radius: 5px;
  }
  .card-title {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 0px;
    letter-spacing: -0.03em;
  }
  .card-content {
    margin: 24px 0 0px;
    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
    }
  }
  .ant-table {
    margin-top: 20px;
  }
  h4.sc-cHqXqK.jRCjqH {
  }
  @media (max-width: 450px) {
  }
  @media (max-width: 768px) {
    .total-survey {
      width: 100%;
    }
    .survey-result {
      width: 100%;
    }
  }
  @media (max-width: 991px) {
    .total-survey {
      width: 100%;
    }
    .survey-result {
      width: 100%;
    }
  }
`;

export const DashboardSection = styled.div`
  margin-top: 20px;
  .area-chart-card {
    .ant-card-body {
      padding: 24px 10px;
    }
  }
  .graph-card {
    box-shadow: 0px 4px 10px 5px #bebebe33;
    border: none;
  }
  .quick-link {
    border: none;
    .quick-title {
      padding: 20px 20px 15px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      font-weight: 700;
      line-height: 18.94px;
      margin: 0px;
      // border-bottom:0.5px solid #9C9C9F;
      border-bottom: 0.5px solid #9c9c9f59;
    }
    .ant-card-body {
      padding: 10px 0px;
      border-radius: 15px;
      box-shadow: 0px 4px 10px 5px #bebebe33;
    }
    .linkbox {
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
      gap: 16px;

      a {
        border: 0.5px solid #9c9c9f59;
        border-radius: 50px;
        color: #2e2e48;
        font-weight: 400;
        padding: 11px;
        font-size: 15px;
      }
    }
  }
`;

export const DashboardFilterContainer = styled.div``;
