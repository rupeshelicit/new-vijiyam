import { Card, Col, Row } from "antd";
import React from "react";
import { Container } from "styles/components/Layout";
import CardChipIcont from "assets/images/Chip_Card.png";
import { MyCardsComponent } from "styles/pages/SuperAdmin/Dashboard";
import Card2Icon from "assets/images/Chip_Card (1).png";
import CardIcon from "assets/svg/cardIcon";
import CardDolerIcon from "assets/svg/cardDolerIcon";
import PayPal from "assets/svg/payPal";

const cardIcon = (fillColor) => (
  <svg
    width="44"
    height="30"
    viewBox="0 0 44 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="15" cy="15" r="15" fill={fillColor} fillOpacity="0.5" />
    <circle cx="29" cy="15" r="15" fill={fillColor} fillOpacity="0.5" />
  </svg>
);

const CardDetails = ({
  balance,
  cardHolder,
  validThru,
  cardNumber,
  icon,
  cardIcon,
}) => (
  <Card className="relative">
    <div className="balance-icon flex justify-between w-full items-center pb-[25px]">
      <div>
        <p className="text-[12px] font-normal">Balance</p>
        <p className="text-[20px] font-normal">{balance}</p>
      </div>
      <div className="icon">
        <img src={cardIcon} alt="Card Icon" />
      </div>
    </div>
    <div className="balance-icon flex gap-[30%] w-full items-center pb-[25px]">
      <div>
        <p className="text-[12px] font-normal">CARD HOLDER</p>
        <p className="text-[20px] font-normal">{cardHolder}</p>
      </div>
      <div className="valid-card">
        <p className="text-[12px] font-normal">VALID THRU</p>
        <p className="text-[15px] font-normal">{validThru}</p>
      </div>
    </div>
    <div className="card-number flex justify-between absolute px-[20px] rounded-br-[10px] w-[100%] max-w-[420px] py-[15px] bg-[#1677ff66] bottom-[0]  left-[0] right-[0] rounded-bl-[10px]">
      <p className="text-[22px] font-semibold">{cardNumber}</p>
      <div className="icon">{icon}</div>
    </div>
  </Card>
);

const TransactionHistory = ({ icon, title, date, amount, bgColor }) => (
  <div className="balance-icon flex justify-between w-full items-center pb-[25px]">
    <div
      className={`icon h-[55px] w-[55px] justify-center flex items-center rounded-[50px] ${bgColor}`}
    >
      {icon}
    </div>
    <div className="history">
      <p className="text-[16px] font-normal">{title}</p>
      <p className="text-[12px] font-normal text-[#718EBF]">{date}</p>
    </div>
    <div className="amount">
      <p
        className="text-[20px] font-normal"
        style={amount < 1000 ? { color: "red" } : { color: "green" }}
      >
        ₹{amount}
      </p>
    </div>
  </div>
);

const MyCards = () => {
  return (
    <MyCardsComponent>
      <Container>
        <Row gutter={16}>
          <Col className="cards gutter-row" span={8}>
            <h3 className="text-[22px] font-semibold text-[#343C6A] mb-[15px] mt-[30px]">
              My Cards
            </h3>
            <CardDetails
              balance="₹5,756"
              cardHolder="Eddy Cusuma"
              validThru="12/22"
              cardNumber="3778 **** **** 1234"
              icon={cardIcon("white")}
              cardIcon={CardChipIcont}
            />
          </Col>

          <Col className="gutter-row h-[250px]" span={8}>
            <div className="text-right">
              <button className="text-[17px] font-semibold text-[#343C6A] mb-[15px] mt-[30px]">
                See All
              </button>
            </div>
            <div className="card-second">
              <CardDetails
                balance="₹5,756"
                cardHolder="Eddy Cusuma"
                validThru="12/22"
                cardNumber="3778 **** **** 1234"
                icon={cardIcon("#9199AF")}
                cardIcon={Card2Icon}
              />
            </div>
          </Col>

          <Col className="gutter-row h-[250px] payment-history" span={8}>
            <div className="text-right">
              <button className="text-[17px] font-semibold text-[#343C6A] mb-[15px] mt-[30px]">
                Recent Transaction
              </button>
            </div>
            <Card className="relative">
              <TransactionHistory
                icon={<CardIcon />}
                title="Deposit from my Card"
                date="28 January 2024"
                amount="850"
                bgColor="bg-[#FFF5D9]"
              />
              <TransactionHistory
                icon={<PayPal />}
                title="Deposit Paypal"
                date="25 January 2024"
                amount="1550"
                bgColor="bg-[#E7EDFF]"
              />
              <TransactionHistory
                icon={<CardDolerIcon />}
                title="Jemi Wilson"
                date="21 January 2024"
                amount="1850"
                bgColor="bg-[#DCFAF8]"
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </MyCardsComponent>
  );
};

export default MyCards;
