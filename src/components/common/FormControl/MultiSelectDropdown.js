import React, { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Select, Space } from "antd";
import { MultiSelectDropdownContainer } from "styles/components/common/FormControl";

const MultiSelectDropdown = ({
  selectOption,
  setSelectOption,
  options = [],
  title,
  name,
}) => {
  const [open, setOpen] = useState(false); // Track the dropdown open state

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    setSelectOption(value);
  };

  const handleDropdownVisibleChange = (open) => {
    setOpen(open); // Set open state when dropdown visibility changes
  };

  return (
    <MultiSelectDropdownContainer>
      <Space direction="vertical" style={{ width: "100%" }}>
        <label className="!text-[12px] font-normal leading-[19px] !text-[#333333]">
          {title}
        </label>
        <Select
          name={name}
          suffixIcon={open ? <UpOutlined /> : <DownOutlined />} // Toggle the icon based on open state
          value={selectOption}
          mode="multiple"
          style={{ width: "100%" }}
          onChange={handleChange}
          onDropdownVisibleChange={handleDropdownVisibleChange} // Track dropdown visibility
          options={options.map((item) => ({
            label: item?.name,
            value: item?.id,
          }))}
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
