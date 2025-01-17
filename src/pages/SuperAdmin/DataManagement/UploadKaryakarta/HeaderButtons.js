import React from "react";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import ExcelIcons from "assets/svg/excelIcons";
import { useNavigate } from "react-router-dom";
import ExportToExcel from "components/common/ExportToExcel";

const HeaderButtons = () => {
  const navigate = useNavigate();
  const Democolumns = [
    {
      title: "name",
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
  ];
  return (
    <div
      style={{ justifyContent: "end" }}
      className="head-section flex px-[15px] py-[10px] [box-shadow:0px_2px_8px_0px_#00000022] rounded-[8px] mt-[30px]"
    >
      <div className="flex gap-[30px]">
        <ButtonComponent
          text={"Karyakarta  List"}
          onClick={() => navigate("/karyaKarta-list")}
        />
        <div className="export-file">
          <ExportToExcel
            buttonText={" Export Blank Excel"}
            Icons={<ExcelIcons />}
            columns={Democolumns}
            excelName="KaryaKartaDemo"
            // subText={" for Demo add Member list"}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderButtons;
