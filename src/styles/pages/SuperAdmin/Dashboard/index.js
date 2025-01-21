import styled from "styled-components";

export const ServeyCardsComponent = styled.div`
  .ant-card-body {
    padding: 25px 0 25px 45px;
    width: 350px;
  }
  .ant-card.ant-card-bordered {
    border-radius: 15px;
    box-shadow: 0px 2px 8px 0px #00000022;
  }
`;

export const MyCardsComponent = styled.div`
  .ant-card-body {
    padding: 25px 25px 25px 25px;
    max-width: 350px;
    width:100%;
    height: 260px;
  }
  .cards .ant-card.ant-card-bordered {
    border-radius: 15px;
    color: white;
    background: #396aff;
    box-shadow: 0px 2px 8px 0px #0000;
  }
  .ant-card.ant-card-bordered {
    border-radius: 15px;
    box-shadow: 0px 2px 8px 0px #00000022;
  }
  .payment-history .ant-card-body {
    padding: 25px 15px 15px 15px;
  }

  .card-second .card-number {
    background: white;
  }

  .card-number {
    width: 100%;
    max-width: 420px;
  }
`;
