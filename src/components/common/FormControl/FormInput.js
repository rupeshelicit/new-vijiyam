import React from "react";
import { Form, Input } from "antd";
import { FormInputFeild } from "styles/components/common/FormControl";

const FormInput = ({
  name,
  label,
  rules = [],
  value,
  required,
  onchange,
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
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          {...rest}
          onChange={onchange}
        />
      </Form.Item>
    </FormInputFeild>
  );
};

export default FormInput;
