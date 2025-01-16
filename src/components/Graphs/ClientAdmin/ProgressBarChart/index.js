import React from "react";
import ReactApexChart from "react-apexcharts";

const ProgressChart = () => {
  const options = {
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 0,
            fontSize: "22px",
            fontWeight: "bold",
            color: "#333",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    grid: {
      padding: {
        top: 10,
      },
    },
    colors: ["#FF4560"],
    labels: ["Completed Survey"],
    series: [80],
  };

  return (
    <div
      id="chart"
      style={{ maxWidth: "420px", height: "420px", margin: "0 auto" }}
    >
      <ReactApexChart
        options={options}
        series={options.series}
        type="radialBar"
        height={400}
        width={400}
      />
    </div>
  );
};

export default ProgressChart;
