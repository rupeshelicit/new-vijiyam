import React from "react";
import { Form, Select } from "antd";
import { FormSelect } from "styles/components/common/FormControl";

const { Option } = Select;

const DropdownSelect = ({
  name,
  label,
  rules = [],
  required,
  placeholder = "",
  options = [],
  ...rest
}) => {
  return (
    <FormSelect>
      <Form.Item
        name={name}
        // label={label}
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
        <Select placeholder={placeholder} {...rest} style={{ width: "100%" }}>
          {options.map((option) => (
            <Option key={option} value={option.value}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </FormSelect>
  );
};

export default DropdownSelect;
