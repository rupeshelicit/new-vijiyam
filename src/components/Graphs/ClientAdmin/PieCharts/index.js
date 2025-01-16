import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const PieChartWrapper = styled.div`
  position: relative;
  margin: 0 auto;

  /* Custom legend styling */
  .apexcharts-legend {
    position: absolute;
    bottom: 0;
    left: 0;
    right: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const SurveyResultChart = () => {
  const colors = ["#745FF9", "#FF943B", "#E74A4B"];

  const [chartState, setChartState] = useState({
    series: [],
    options: {},
  });

  useEffect(() => {
    setChartState({
      series: [58.6, 34.9, 6.5],
      options: {
        chart: {
          type: "donut",
        },
        labels: [`Our-${58.6}%`, `Opposition-${34.9}%`, `Doubtful-${6.5}%`],
        colors: colors,
        legend: {
          position: "bottom",
          horizontalAlign: "left",
          offsetY: 10,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: "Total",
                },
              },
            },
          },
        },
      },
    });
  }, []);

  return (
    <PieChartWrapper>
      <div
        id="chart"
        style={{ maxWidth: "420px", height: "420px", margin: "0 auto" }}
      >
        <ReactApexChart
          options={chartState?.options}
          series={chartState?.series}
          type="donut"
          height={350}
        />
      </div>
    </PieChartWrapper>
  );
};

export default SurveyResultChart;
