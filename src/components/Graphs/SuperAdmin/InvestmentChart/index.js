import React from "react";
import Chart from "react-apexcharts";

const TotalInvestmentChart = ({ 
  chartTitle = "", 
  data =  [ 10000, 20000, 30000, 40000],
  labels = [
    "2017", "2018", "2019", "2020", "2021", "2022" 
  ],
  annotations = {
    yaxis: [
      {
        y: 8500,
        borderColor: "#00E396",
        label: {
          borderColor: "#00E396",
          style: {
            color: "#fff",
            background: "#00E396",
          },
          text: "Support",
        },
      },
    ],
    xaxis: [
      {
        x: new Date("23 Nov 2017").getTime(),
        borderColor: "#775DD0",
        label: {
          borderColor: "#775DD0",
          style: {
            color: "#fff",
            background: "#775DD0",
          },
          text: "Anno Test",
        },
      },
    ],
    points: [
      {
        x: new Date("01 Dec 2017").getTime(),
        y: 8600,
        marker: {
          size: 8,
          fillColor: "#fff",
          strokeColor: "red",
          radius: 2,
        },
        label: {
          borderColor: "#FF4560",
          style: {
            color: "#fff",
            background: "#FF4560",
          },
          text: "Point Annotation",
        },
      },
    ],
  } 
}) => {
  const options = {
    chart: {
      height: 280,
      type: "line",
      id: "areachart-2",
    },
    annotations: annotations, 
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      padding: {
        right: 30,
        left: 20,
      },
    },
    title: {
      text: chartTitle, 
      align: "left",
    },
    labels: labels, 
    xaxis: {
      type: "datetime",
    },
  };

  const series = [
    {
      data: data, 
    },
  ];

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={280} />
    </div>
  );
};

export default TotalInvestmentChart;
