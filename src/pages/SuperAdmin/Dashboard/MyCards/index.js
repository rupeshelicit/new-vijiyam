import React from "react";
import { Card, Col, Row } from "antd";
import { Container } from "styles/components/Layout";
import { MyCardsComponent } from "styles/pages/SuperAdmin/Dashboard";
import PropTypes from "prop-types";
import CardChipIcont from "assets/images/Chip_Card.png";
import Card2Icon from "assets/images/Chip_Card (1).png";
import CardIcon from "assets/svg/cardIcon";
import CardDolerIcon from "assets/svg/cardDolerIcon";
import PayPal from "assets/svg/payPal";

const cardIconSVG = (fillColor) => (
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

const CardDetails = ({ balance, cardHolder, validThru, cardNumber, icon, cardIcon }) => (
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
    <div className="card-number flex justify-between absolute px-[20px] rounded-br-[10px] py-[15px] bg-[#1677ff66] bottom-[0] w-[100%] max-w-[315px] left-[0] right-[0] rounded-bl-[10px]">
      <p className="text-[22px] font-semibold">{cardNumber}</p>
      <div className="icon">{icon}</div>
    </div>
  </Card>
);

CardDetails.propTypes = {
  balance: PropTypes.string.isRequired,
  cardHolder: PropTypes.string.isRequired,
  validThru: PropTypes.string.isRequired,
  cardNumber: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  cardIcon: PropTypes.string.isRequired,
};

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
      <p className={`text-[20px] font-normal ${amount < 1000 ? "text-red-500" : "text-green-500"}`}>
        ₹{amount}
      </p>
    </div>
  </div>
);

TransactionHistory.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  bgColor: PropTypes.string.isRequired,
};

const transactions = [
  {
    icon: <CardIcon />,
    title: "Deposit from my Card",
    date: "28 January 2024",
    amount: 850,
    bgColor: "bg-[#FFF5D9]",
  },
  {
    icon: <PayPal />,
    title: "Deposit Paypal",
    date: "25 January 2024",
    amount: 1550,
    bgColor: "bg-[#E7EDFF]",
  },
  {
    icon: <CardDolerIcon />,
    title: "Jemi Wilson",
    date: "21 January 2024",
    amount: 1850,
    bgColor: "bg-[#DCFAF8]",
  },
];

const MyCards = () => (
  <MyCardsComponent>
    <Container>
      <Row gutter={16}>
        <Col className="cards gutter-row" span={8}>
          <h3 className="text-[22px] font-semibold text-[#343C6A] mb-[15px] mt-[30px]">My Cards</h3>
          <CardDetails
            balance="₹5,756"
            cardHolder="Eddy Cusuma"
            validThru="12/22"
            cardNumber="3778 **** **** 1234"
            icon={cardIconSVG("white")}
            cardIcon={CardChipIcont}
          />
        </Col>
        <Col className="gutter-row h-[250px]" span={8}>
          <div className="text-right">
            <button className="text-[17px] font-semibold text-[#343C6A] mb-[15px] mt-[30px]">See All</button>
          </div>
          <div className="card-second">
            <CardDetails
              balance="₹5,756"
              cardHolder="Eddy Cusuma"
              validThru="12/22"
              cardNumber="3778 **** **** 1234"
              icon={cardIconSVG("#9199AF")}
              cardIcon={Card2Icon}
            />
          </div>
        </Col>
        <Col className="gutter-row h-[250px] payment-history" span={8}>
          <div className="text-right">
            <button className="text-[17px] font-semibold text-[#343C6A] mb-[15px] mt-[30px]">Recent Transactions</button>
          </div>
          <Card className="relative">
            {transactions.map((transaction, index) => (
              <TransactionHistory key={index} {...transaction} />
            ))}
          </Card>
        </Col>
      </Row>
    </Container>
  </MyCardsComponent>
);

export default MyCards;
