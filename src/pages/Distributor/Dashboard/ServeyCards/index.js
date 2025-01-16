import { Card, Col, Row } from "antd";
import React from "react";
import { Container } from "styles/components/common/Layout";
import TotalMoneyIcon from "assets/svg/totalMoneyIcon";
import { ServeyCardsComponent } from "styles/pages/SuperAdmin/Dashboard";
const ServeyCards = ({ title, NumberAmount, iconBackgrondColor, icon }) => {
  return (
    <ServeyCardsComponent>
      <Container>
        <Card>
          <div className="flex gap-[11px] items-center">
            <div
              className="icon h-[70px] w-[70px] flex justify-center items-center  rounded-[50%]"
              style={{ backgroundColor: iconBackgrondColor }}
            >
              {icon}
            </div>
            <div className="content">
              <h6 className="text-[16px] font-normal text-[#718EBF]">{title}</h6>
              <b className="text-[20px] font-normal ">{NumberAmount}</b>
            </div>
          </div>
        </Card>
      </Container>
    </ServeyCardsComponent>
  );
};

export default ServeyCards;
