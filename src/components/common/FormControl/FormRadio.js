import React from "react";
import { Form, Radio } from "antd";
import { RadioBtnBox } from "styles/components/common/FormControl";

const FormRadio = ({
  name,
  label,
  rules = [],
  required,
  options = [],
  ...rest
}) => {
  return (
    <RadioBtnBox>
      <Form.Item
        name={name}
        label={label}
        rules={[
          ...(required
            ? [{ required: true, message: `Please select ${name}!` }]
            : []),
          ...rules,
        ]}
      >
        <Radio.Group {...rest}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </RadioBtnBox>
  );
};

export default FormRadio;
