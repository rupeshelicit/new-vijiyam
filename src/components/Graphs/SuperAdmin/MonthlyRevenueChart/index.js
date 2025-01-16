import React from "react";
import ApexCharts from "react-apexcharts";

const RevenuChart = () => {
  const options = {
    series: [
      {
        name: "Sales",
        data: [10000,20000,30000,40000],
      },
    ],
    chart: {
      height: 280,
      type: "line",
    },
    forecastDataPoints: {
      count: 7,
    },
    stroke: {
      width: 5,
      curve: "smooth", // Smooth line
    },
    xaxis: {
        type: "datetime",
        categories: [
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2022",
       
        ],
        tickAmount: 6,
        labels: {
          formatter: function (value, timestamp, opts) {
            const year = new Date(timestamp).getFullYear(); // Extracts the year from the timestamp
            return year;
          },
        },
      },
      
    title: {
      text: "",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
    fill: {
      type: "solid", 
      colors: ["#FF5733"], 
    },
  };

  return (
    <div id="chart">
      <ApexCharts options={options} series={options.series} type="line" height={280} />
    </div>
  );
};

export default RevenuChart;
