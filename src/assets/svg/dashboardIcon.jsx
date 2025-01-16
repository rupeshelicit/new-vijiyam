import React from "react";

const DashboardIcon = () => {
  return (
    <div>
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        style={{ fill: "#606060", stroke: "#606060" }} // Use object here
      >
        <path
          fillRule="evenodd" 
          clip-rule="evenodd" 
          d="M1.93359 6.4464L8.93359 1.00195L15.9336 6.4464V15.002C15.9336 15.8611 15.2371 16.5575 14.378 16.5575H3.48915C2.63004 16.5575 1.93359 15.8611 1.93359 15.002V6.4464Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path
          d="M6.60156 16.5576V8.77979H11.2682V16.5576"
          stroke="white"
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </div>
  );
};

export default DashboardIcon;
