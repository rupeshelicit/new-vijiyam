import { Row, Col, Select, Button } from "antd";
import React, { useState } from "react";
import { DashboardSection } from "styles/pages/ClientAdmin/Dashboard";
import { Container } from "styles/components/common/Layout";
import { DashboardCard } from "styles/pages/ClientAdmin/Dashboard";
import SurveyCard from "components/Graphs/ClientAdmin/AreaChart";
// import Filters from "./Filters";
import SurveyResultChart from "components/Graphs/ClientAdmin/PieCharts";
import ProgressChart from "components/Graphs/ClientAdmin/ProgressBarChart";
import TableComponent from "components/common/Table";
import SwitchComponet from "components/common/SwitchComponent";
import Actions from "components/common/Action";
import { useNavigate } from "react-router-dom";

const Survey = () => {
  const navigate = useNavigate();
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;
  const [accountStatus, setAccountStatus] = useState({});
  const options = [
    { value: "1", label: "Last 7 days" },
    { value: "2", label: "Last 15 days" },
    { value: "3", label: "Last 30 days" },
  ];
  const surveyDetails = [
    {
      heading: "Total Survey",
      data: 605462,
    },
    {
      heading: "Important Voter",
      data: 500000,
    },
    {
      heading: "Total Karyakarta",
      data: 600,
    },
    {
      heading: "Total Active User",
      data: 400,
    },
    {
      heading: "Total Survey  ",
      data: 605462,
    },
  ];
  const surveyData = [
    {
      title: "Total Survey",
      value: "92.6k",
      subtitle: "",
      graphColor: "#8B5CF6",
    },
    {
      title: "Important Voters",
      value: "45.5K",
      subtitle: "",
      graphColor: "#34D399",
    },
    {
      title: "Our Voters",
      value: "36%",
      subtitle: "",
      graphColor: "#F87171",
    },
    {
      title: "Opposition Voters",
      value: "17.5K",
      subtitle: "",
      graphColor: "#FBBF24",
    },
  ];

  console.log(accountStatus, "accountStatus");
  const columns = [
    {
      title: "Status",
      dataIndex: "switch",
      key: "sadio",
      render: (text, record) => (
        <SwitchComponet
          record={record}
          switchStates={accountStatus}
          setSwitchStates={setAccountStatus}
          text={text}
        />
      ),
      width: 50,
    },
    {
      title: "No. of Surve",
      dataIndex: "noOfSurve",
      key: "noOfSurve",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "acion",
      align: "center",
      render: (text, record) => <Actions record={record} text={text} />,
    },
  ];

  const data = [
    {
      key: "1",
      noOfSurve: "200",
      name: "David",
      mobileNumber: 9031221053,
    },
    {
      key: "2",
      noOfSurve: "250",
      name: "David",
      mobileNumber: 9031221053,
    },
    {
      key: "3",
      noOfSurve: "230",
      name: "David",
      mobileNumber: 9031221053,
    },
    {
      key: "4",
      noOfSurve: "200",
      name: "David",
      mobileNumber: 9031221053,
    },
    {
      key: "5",
      noOfSurve: "230",
      name: "Patrice",
      mobileNumber: 9039321053,
    },
  ];

  return (
    <>
      <DashboardSection>
        <Container>
          <Row className="flex justify-between items-center">
            <h3
              className=" text-[22px] font-semibold mb-[20px] "
              style={{ marginBottom: "10px" }}
            >
              Survey
            </h3>

            {/* <div>
              <Filters />
            </div> */}
          </Row>

          <Row
            className="flex justify-between  [box-shadow:0px_4px_4px_0px_#00000040]  px-[14px] mb-[40px]
                py-[28px] rounded-[8px] border-[1px] border-[solid] border-[#0000001A]"
          >
            <Col>
              <div>
                <h3 className="heading text-[18px] font-semibold pb-5">
                  Today
                </h3>
                <p className="data text-[18px] font-semibold text-[#5E4C93] m-0">
                  {currentDate}
                </p>
              </div>
            </Col>
            {surveyDetails &&
              surveyDetails.map((item, index) => (
                <Col key={index}>
                  <div className="pl-[28px] border-l-2 border-gray-500">
                    <h3 className="heading text-[15px] font-semibold text-[#ADADAD] pb-5">
                      {item.heading}
                    </h3>
                    <p className="data text-[16px] font-semibold text-[#000000] m-0">
                      {item.data}
                    </p>
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
        <DashboardCard>
          <Container>
            <Row gutter={16}>
              <div className="flex flex-wrap gap-5  pb-[10px] justify-center w-full ">
                {surveyData.map((item, index) => (
                  <div key={index} className="w-full sm:w-[23%]">
                    <SurveyCard
                      title={item.title}
                      value={item.value}
                      subtitle={item.subtitle}
                      graphColor={item.graphColor}
                    />
                  </div>
                ))}
              </div>
            </Row>
            <Row gutter={12}>
              <div className="flex flex-wrap gap-5  pb-[10px] justify-center w-full ">
                <div
                  className="total-survey [box-shadow:0px_2px_8px_0px_#00000022] w-[60%] px-[20px] py-[15px]  rounded-[8px] 
"
                >
                  <div
                    className=" w-[100%] flex w-full justify-between
"
                  >
                    <h1>Total Survey </h1>
                    <Select className=" max-w-[118px]">
                      {options.map((item) => {
                        return (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </Select>
                  </div>
                  <div>
                    <ProgressChart />
                  </div>
                  <div
                    className="flex justify-between
"
                  >
                    <div className="total-survey">
                      <span
                        className="text-[12px] font-normal text-[#606060] 
"
                      >
                        Total Survey
                      </span>
                      <p className="pt-2">
                        <b
                          className="text-[20px] text-[#606060]
"
                        >
                          105200
                        </b>
                      </p>
                    </div>
                    <div className="total-survey">
                      {" "}
                      <span
                        className="text-[12px] font-normal text-[#606060] 
"
                      >
                        Total Survey
                      </span>
                      <p className="pt-2">
                        <b
                          className="text-[20px] text-[#606060]
"
                        >
                          1000
                        </b>
                      </p>
                    </div>
                    <div className="response- time">
                      <span
                        className="text-[12px] font-normal text-[#606060] 
"
                      >
                        Response Time
                      </span>
                      <p className="pt-2">
                        {" "}
                        <b
                          className="text-[20px] text-[#606060]
"
                        >
                          1d
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="survey-result [box-shadow:0px_2px_8px_0px_#00000022] pt-[18px] pr-[22px] pb-[0] pl-[22px]  rounded-[8px] w-[36%]">
                  <h1>Survey Result </h1>

                  <SurveyResultChart />
                </div>
              </div>
            </Row>
          </Container>
        </DashboardCard>
      </DashboardSection>
    </>
  );
};

export default Survey;
