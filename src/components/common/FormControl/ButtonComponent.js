import React from "react";

const ButtonComponent = ({ text, subText, onClick, Icons ,disabled }) => {
  const handleButtonClick = (e) => {
    const buttons = document.querySelectorAll(".export-file button");
    buttons.forEach((button) => button.classList.remove("active"));

    e.currentTarget.classList.add("active");

    if (onClick) onClick();
  };

  return (
    <div className="custom-button">
      <div className="export-file">
        <button
          disabled={disabled}
          className="flex gap-[5px] items-center border-[1px] border-[#D0D5DD] px-[15px] py-[10px] rounded-[4px]"
          onClick={handleButtonClick}
        >
         
          <div className="text-wrapper">
            <span className="text-[13px] font-medium text-[#344054]">
              {text}
            </span>
            {subText && (
              <p className="text-[9px] text-[#A1A0A0] mb-0">{subText}</p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ButtonComponent;
