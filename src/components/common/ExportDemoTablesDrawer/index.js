import React, { useEffect, useState } from "react";
import { Button, Drawer, Form } from "antd";
import { ExportTables } from "styles/pages/ClientAdmin/Voter";
import MultiSelectDropdown from "components/common/FormControl/MultiSelectDropdown";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
import ExportToExcel from "components/common/ExportToExcel";

const ExportTable = ({ setOpen, open, title, columns, data = [] }) => {
  const [headerOptions, setHeaderOptions] = useState([]);
  const [selectHeaders, setselectHeaders] = useState([]);
  const [selectColums, setSelectColums] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [selectType, setSelectType] = useState("excel");
  const [loading, setLoading] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const newHeaderOptions = columns.map((item) => item.title);
    setHeaderOptions(newHeaderOptions);
  }, [columns]);

  useEffect(() => {
    if (data && data.length > 0) {
      const newData = data.map((item) => {
        Object.keys(item).map(function (keyName, keyIndex) {
          return selectHeaders.includes(keyName);
        });
      });
      console.log(newData, "newData");
    }
  }, [selectHeaders, data]);

  const onDownload = (values) => {
    setSelectType(values);
    console.log(values, "ddddd");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const onDownloadFailed = () => {};
  return (
    <ExportTables>
      <Drawer title={title} onClose={onClose} open={open}>
        <Form
          name="filterForm"
          initialValues={{
            remember: true,
          }}
          onFinish={onDownload}
          onFinishFailed={onDownloadFailed}
          autoComplete="off"
        >
          <div className="select-header-option">
            <Form.Item name="selectedHeaders" className="mb-1">
              <MultiSelectDropdown
                options={headerOptions}
                title="Select Header for Print"
                placeholder="Select Header"
                selectOption={selectHeaders}
                setSelectOption={setselectHeaders}
                name="selectedHeaders"
              />
            </Form.Item>
          </div>

          <div className="select-downloading-formate">
            <Form.Item name="downloadType" className="mb-1">
              {/* <label>Select Download Type</label> */}
              <DropdownSelect
                name="downloadType"
                placeholder="Select Download Type"
                options={["Pdf", "Excel"]}
                required={false}
                label={"Select Download Type"}
              />
            </Form.Item>
          </div>

          <ExportToExcel
            buttonText={"Download Table"}
            columns={selectHeaders}
            type="excel"
          />
        </Form>
      </Drawer>
    </ExportTables>
  );
};

export default ExportTable;
