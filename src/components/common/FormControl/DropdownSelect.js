import React from "react";
import { Form, Select } from "antd";
import { FormSelect } from "styles/components/common/FormControl";

const { Option } = Select;

const DropdownSelect = ( {
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
} ) =>
{
  console.log( options, "-------------------->" );

  const handleSelect = ( value ) =>
  {
    // If no id, send the value instead of id
    const selectedOption = options.find(
      ( option ) => option.id === value || option.name === value
    );
    const valueToSend = selectedOption ? selectedOption.id || selectedOption.name : value;
    setSelectState ? setSelectState( valueToSend ) : "";
  };

  return (
    <FormSelect>
      <Form.Item
        name={ name }
        rules={ [
          ...( required
            ? [ { required: true, message: `Please enter ${ name }!` } ]
            : [] ),
          ...rules,
        ] }
      >
        <label className="!text-[12px] font-normal leading-[19px] mb-2 !text-[#333333]">
          { label }
        </label>
        <Select
          disabled={ disabled }
          onSelect={ handleSelect } // Call handleSelect when an option is selected
          placeholder={ placeholder }
          { ...rest }
          style={ { width: "100%" } }
          showSearch
          optionFilterProp="children"
          filterOption={ ( input, option ) =>
            ( option?.children?.toLowerCase() || "" ).includes( input.toLowerCase() )
          }
          allowClear
        >
          { options &&
            options.map( ( option ) => (
              <Option key={ option?.id || option?.name } value={ option?.id || option?.name }>
                { option.name }
              </Option>
            ) ) }
          { defaultOption && (
            <Option key="default" value="">
              { defaultOption }
            </Option>
          ) }
        </Select>
      </Form.Item>
    </FormSelect>
  );
};

export default DropdownSelect;
