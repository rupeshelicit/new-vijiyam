import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Select, Space } from "antd";
import { MultiSelectDropdownContainer } from "styles/components/common/FormControl";

const smileIcon = <SmileOutlined />;

const MultiSelectDropdown = ({
  selectOption,
  setSelectOption,
  options = [],
  title,
}) => {
  console.log(options, "Options passed to MultiSelectDropdown");

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    setSelectOption(value);
  };

  return (
    <MultiSelectDropdownContainer>
      <Space direction="vertical" style={{ width: "100%" }}>
        <label className="!text-[12px] font-normal leading-[19px] !text-[#333333]">
          {title}
        </label>
        <Select
          suffixIcon={smileIcon}
          value={selectOption}
          mode="multiple"
          style={{ width: "100%" }}
          onChange={handleChange}
          options={options.map((item) => ({ label: item, value: item }))}
          placeholder="Select options"
          showSearch
          optionFilterProp="label" 
          filterOption={(input, option) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          } 
        />
      </Space>
    </MultiSelectDropdownContainer>
  );
};

export default MultiSelectDropdown;
