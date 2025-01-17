import React from "react";
import { Form, Select } from "antd";
import { FormSelect } from "styles/components/common/FormControl";

const { Option } = Select;

const DropdownSelect = ({
  disabled,
  name,
  label,
  rules = [],
  required,
  placeholder = "",
  options = [],
  setSelectState,
  defaultOption,
  ...rest
}) => {
  console.log(options, "-------------------->");
  return (
    <FormSelect>
      <Form.Item
        name={name}
        rules={[
          ...(required
            ? [{ required: true, message: `Please enter ${name}!` }]
            : []),
          ...rules,
        ]}
      >
        <label className="!text-[12px] font-normal leading-[19px] mb-2 !text-[#333333]">
          {label}
        </label>
        <Select
          disabled={disabled}
          onSelect={(e) => (setSelectState ? setSelectState(e) : "")}
          placeholder={placeholder}
          {...rest}
          style={{ width: "100%" }}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          allowClear
        >
          {options &&
            options?.map((option) => (
              <Option key={option?.id} value={option?.id}>
                {option.name}
              </Option>
            ))}
          {defaultOption && (
            <Option key={0} value="">
              {defaultOption}
            </Option>
          )}
        </Select>
      </Form.Item>
    </FormSelect>
  );
};

export default DropdownSelect;
