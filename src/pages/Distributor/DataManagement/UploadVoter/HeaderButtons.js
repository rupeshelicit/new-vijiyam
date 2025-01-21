import React from "react";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import ExcelIcons from "assets/svg/excelIcons";
import { useNavigate } from "react-router-dom";
import ExportToExcel from "components/common/ExportToExcel";
import ExcelColum from "Data/DummyDataExcelColum";

const HeaderButtons = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ justifyContent: "end" }}
      className="head-section flex px-[15px] py-[10px] [box-shadow:0px_2px_8px_0px_#00000022] rounded-[8px] mt-[30px]"
    >
      <div className="flex gap-[30px]">
        <ButtonComponent
          text={"Voter List"}
          onClick={() => navigate("/voter-list")}
        />
        <ExportToExcel buttonText={"Blank Demo Export"} Icons={<ExcelIcons />} columns={ExcelColum} />
      </div>
    </div>
  );
};

export default HeaderButtons;
