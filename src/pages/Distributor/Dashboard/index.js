import { Card, Col, Row } from "antd";
import React, { useState } from "react";
import { Container } from "styles/components/Layout";
import { DashboardSection } from "styles/pages/ClientAdmin/Dashboard";
import ServeyCards from "./ServeyCards";
import TotalMoneyIcon from "assets/svg/totalMoneyIcon";
import InvesmentIcon from "assets/svg/invesmentIcon";
import RemaningIcon from "assets/svg/remaningIcon";
import MyCards from "./MyCards";
import TotalInvestmentChart from "components/Graphs/SuperAdmin/InvestmentChart";
import RevenuChart from "components/Graphs/SuperAdmin/MonthlyRevenueChart";
import DeleteModal from "components/common/Action/DeleteModal";

const DistributorDashboard = () => {
    const [isModalOpen,setIsModalOpen]=useState(true)
  return (
    <DashboardSection>
      <Container>
        <Row className="flex justify-between items-center">
          <h3
            className=" text-[22px] font-semibold mb-[20px] "
            style={{ marginBottom: "10px" }}
          >
            Dashboard
          </h3>
        </Row>
        <div className="cards"></div>
        <Row gutter={"16"}>
          <Col span={8}>
            <ServeyCards
              title={"Total Earn"}
              NumberAmount={"₹150,000"}
              iconBackgrondColor={"#DCFAF8"}
              icon={<TotalMoneyIcon />}
            />
          </Col>
          <Col span={8}>
            <ServeyCards
              title={"Number of Investments"}
              NumberAmount={"₹150,000"}
              iconBackgrondColor={"#FFE0EB"}
              icon={<InvesmentIcon />}
            />
          </Col>
          <Col span={8}>
            <ServeyCards
              title={"Remaining Amount"}
              NumberAmount={"₹ 500,00"}
              iconBackgrondColor={"#E7EDFF"}
              icon={<RemaningIcon />}
            />
          </Col>
        </Row>
        <MyCards />
        <Row gutter={"16"} className="mt-[60px] mb-[30px]">
          <Col span={12}>
            <label className="text-[22px] font-semibold text-[#333B69] ">
              Yearly Total Investment
            </label>
            <Card className="mt-[15px] [box-shadow:0px_4px_4px_0px_#00000040] ">
              <TotalInvestmentChart />
            </Card>
          </Col>
          <Col span={12}>
            <label className="text-[22px] font-semibold text-[#333B69] ">
              Monthly Revenue
            </label>
            <Card className="mt-[15px] [box-shadow:0px_4px_4px_0px_#00000040] ">
              <RevenuChart />
            </Card>
          </Col>
        </Row>
          </Container>
          <DeleteModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
    </DashboardSection>
  );
};

export default DistributorDashboard;
