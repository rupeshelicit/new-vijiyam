import React from "react";
import { Form, Input } from "antd";
import { FormInputFeild } from "styles/components/common/FormControl";
import { type } from "@testing-library/user-event/dist/type";

const FormInput = ({
  name,
  type,
  label,
  rules = [],
  value,
  required,
  onchange,
  disabled,
  defaultValue,
  placeholder = "",
  ...rest
}) => {
  return (
    <FormInputFeild>
      <Form.Item
        name={name}
        label={label}
        rules={[
          ...(required
            ? [{ required: true, message: `Please enter ${name}!` }]
            : []),
          ...rules,
        ]}
      >
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          {...rest}
          onChange={onchange}
          disabled={disabled}
        />
      </Form.Item>
    </FormInputFeild>
  );
};

export default FormInput;
