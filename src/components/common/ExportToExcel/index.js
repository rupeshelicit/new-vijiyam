import { useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ButtonComponent from "components/common/FormControl/ButtonComponent";

const ExportToExcel = ({
  data = [],
  columns = [],
  Icons,
  buttonText,
  type,
  excelName
}) => {
  const [loading, setLoading] = useState(false);

  const handleExportExcel = () => {
    if (!Array.isArray(columns) || columns.length === 0) {
      alert("Columns are not defined properly!");
      return;
    }

    setLoading(true);
    setTimeout(() => setLoading(false), 3000);

    const columnHeaders = columns.map((col) => col.title);

    const formattedData =
      data.length > 0
        ? data.map((item, index) => {
            const row = { "S.NO": index + 1 };
            columns.forEach((col) => {
              row[col.title] = item[col.dataIndex] || "";
            });
            return row;
          })
        : [
            {
              "S.NO": "",
              ...columnHeaders.reduce(
                (acc, title) => ({ ...acc, [title]: "" }),
                {}
              ),
            },
          ];

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");
    XLSX.writeFile(workbook, `${excelName?excelName:'ExcelSheet'}.xlsx`);
  };

  const handleExportPDF = () => {
    if (!Array.isArray(columns) || columns.length === 0) {
      alert("Columns are not defined properly!");
      return;
    }

    setLoading(true);
    setTimeout(() => setLoading(false), 3000);

    const doc = new jsPDF();
    const headers = columns.map((col) => col.title);

    const formattedData =
      data.length > 0
        ? data.map((item, index) => {
            const row = [index + 1];
            columns.forEach((col) => {
              row.push(item[col.dataIndex] || "");
            });
            return row;
          })
        : [[...headers.map(() => "")]];

    doc.text("Exported Data", 10, 10);
    doc.autoTable({
      head: [headers],
      body: formattedData,
    });

    doc.save("ExportedData.pdf");
  };

  const handleExport = () => {
    if (type === "pdf") {
      handleExportPDF();
    } else {
      handleExportExcel();
    }
  };

  return (
    <ButtonComponent
      loading={loading}
      text={buttonText}
      onClick={handleExport}
      Icons={Icons}
    />
  );
};

export default ExportToExcel;
