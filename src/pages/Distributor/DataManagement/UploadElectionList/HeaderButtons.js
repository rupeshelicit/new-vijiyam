import React from "react";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import ExcelIcons from "assets/svg/excelIcons";
import { useNavigate } from "react-router-dom";
import ExportToExcel from "components/common/ExportToExcel";

const HeaderButtons = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ justifyContent: "end" }}
      className="head-section flex px-[15px] py-[10px] [box-shadow:0px_2px_8px_0px_#00000022] rounded-[8px] mt-[30px]"
    >
      <div className="flex gap-[30px]">
        <ButtonComponent
          text={"Election List"}
          onClick={() => navigate("/elections-list")}
        />
        {/* <ButtonComponent text={"Blank Excel Export"} Icons={<ExcelIcons />} /> */}
        <ExportToExcel buttonText={"Blank Excel Export"} Icons={<ExcelIcons />}/>
      </div>
    </div>
  );
};

export default HeaderButtons;
