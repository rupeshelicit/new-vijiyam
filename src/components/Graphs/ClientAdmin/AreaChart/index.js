import React, { useState } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const SurveyCard = ({ title, value, subtitle, graphColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  const data = [
    { value: 15 },
    { value: 25 },
    { value: 18 },
    { value: 35 },
    { value: 28 },
    { value: 40 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-0 w-full">
      <div className="pl-[22px] pt-[22px] pr-[22px]">
        <div className="flex items-center justify-start mb-4">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white`}
            style={{ backgroundColor: graphColor }}
          >
            <span className="text-lg">
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2768 16.7751V15.1113C15.2768 13.2735 13.6806 11.7837 11.7115 11.7837H4.58093C2.61187 11.7837 1.01563 13.2735 1.01562 15.1113V16.7751"
                  stroke={"#fff"}
                  fill={"#fff"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M8.14733 8.2185C10.1164 8.2185 11.7126 6.62226 11.7126 4.65319C11.7126 2.68413 10.1164 1.08789 8.14733 1.08789C6.17827 1.08789 4.58203 2.68413 4.58203 4.65319C4.58203 6.62226 6.17827 8.2185 8.14733 8.2185Z"
                  stroke={"#fff"}
                  fill={"#fff"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.9811 16.7751V15.0745C20.9799 13.5244 19.807 12.1712 18.1289 11.7837"
                  stroke={"#fff"}
                  fill={"#fff"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5625 1.08789C16.2409 1.46315 17.4147 2.78377 17.4147 4.29666C17.4147 5.80955 16.2409 7.13018 14.5625 7.50544"
                  stroke={"#fff"}
                  fill={"#fff"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        <h2 className="text-[25px] font-semibold">{value}</h2>

        {/* Paragraph with hover events */}
        <p
          className="text-[14px] font-normal text-[#2C2C2C] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {title}
        </p>

        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      </div>

      <div
        className={`h-20 mt-3 transition-transform duration-500 ease-in-out ${
          isHovered ? "transform translate-y-[-10px]" : ""
        }`}
      >
        {/* Graph with hover effect */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <Area
              type="monotone"
              dataKey="value"
              stroke={graphColor}
              fill={graphColor}
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SurveyCard;