"use client";

import React, { useState } from "react";
import {
  DownOutlined,
  UpOutlined,
  FilterOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Card, Select, Input, Slider, Form, Tag } from "antd";
import FormInput from "components/common/FormControl/FormInput";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
// import { VoterFilterContainer } from "styles/components/FiltersComponent";
import ButtonComponent from "components/common/FormControl/ButtonComponent";
import { VoterFilterContainer } from "styles/components/common/FiltersComponent";

const { Option } = Select;

export default function VoterFilter() {
  const [form] = Form.useForm();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState([]);
  const [age, setAge] = useState([18, 100]);
  const updateFilter = (field, value) => {
    if (!value || (typeof value === "string" && !value.trim())) {
      setFilters((current) =>
        current.filter((filter) => filter.field !== field)
      );
      return;
    }

    setFilters((current) => {
      const newFilters = current.filter((filter) => filter.field !== field);
      const displayValue = Array.isArray(value)
        ? `${value[0]}-${value[1]}`
        : value.trim();
      return [
        ...newFilters,
        {
          field,
          value: displayValue,
          display: `${field}: ${displayValue}`,
        },
      ];
    });
  };

  const removeFilter = (field) => {
    setFilters(filters.filter((filter) => filter.field !== field));
    form.setFieldsValue({ [field]: undefined });
  };

  const clearAllFilters = () => {
    setFilters([]);
    form.resetFields();
    setAge([18, 100]);
  };

  const handleValuesChange = (changedValues, allValues) => {
    Object.entries(changedValues).forEach(([field, value]) => {
      if (value !== undefined) {
        updateFilter(field, value);
      }
    });
  };

  const handleSubmit = (values) => {
    console.log("Applying filters:", filters);
  };

  return (
    <VoterFilterContainer>
      <div className="voterFilter w-full mx-auto [box-shadow:0px_2px_8px_0px_#00000022] rounded-[8px] mb-[24px] ">
        <Card className="w-full bg-white shadow-sm">
          <div className="">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-center gap-2">
                <FilterOutlined className="text-lg" />
                <h3 className="text-xl font-bold">Filters</h3>
              </div>
              <svg
                className={ `transition-[0.3s] ${ isExpanded ? '-rotate-180' : '' }` }
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.1984 0.416992L11.8799 1.14279L6.88099 6.46719C6.75887 6.59533 6.59546 6.66699 6.42537 6.66699C6.25528 6.66699 6.09187 6.59533 5.96976 6.46719L0.970825 1.14279L1.65296 0.416992L6.42537 5.49968L11.1984 0.416992Z"
                  fill="#000"
                />
              </svg>
            </div>

            {filters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {filters.map((filter) => (
                  <Tag
                    key={filter.field}
                    closable
                    onClose={() => removeFilter(filter.field)}
                    className="flex items-center gap-1 bg-gray-100 text-gray-700 py-1 px-2"
                  >
                    {filter.display}
                  </Tag>
                ))}
                <Button
                  type="link"
                  className="text-red-500 h-6 px-2 hover:text-red-600"
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
              </div>
            )}

            {isExpanded && (
              <Form
                form={form}
                layout="vertical"
                onValuesChange={handleValuesChange}
                onFinish={handleSubmit}
                className="mt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Form.Item name="Name">
                    <FormInput
                      name="name"
                      placeholder="By Name "
                      required={false}
                    />
                  </Form.Item>
                  <Form.Item name="Mobile">
                    <FormInput
                      name="mobileNumber"
                      placeholder="Mobile number "
                      required={false}
                    />
                  </Form.Item>
                  <Form.Item name="Village">
                    <DropdownSelect
                      name="Village"
                      placeholder="Select village"
                      options={["Kanadiya", "Mushakhedi", "Mangliya"]}
                      required={false}
                    />
                  </Form.Item>
                  <Form.Item name="Gender">
                    <DropdownSelect
                      name="Gender"
                      placeholder="Select gender"
                      options={["Male", "Female", "Other"]}
                      required={false}
                    />
                  </Form.Item>
                  <Form.Item name="Caste">
                    <DropdownSelect
                      name="Caste"
                      placeholder="Select caste"
                      options={["Rajput", "Maliviya", "Choudhari"]}
                      required={false}
                    />
                  </Form.Item>
                  <Form.Item name="Address">
                    <FormInput
                      name="address"
                      placeholder="Enter address "
                      required={false}
                    />
                  </Form.Item>
                  <Form.Item name="Part/Booth">
                    <DropdownSelect
                      name="Part/Booth"
                      placeholder="Select part/booth"
                      options={["Indore 121", "Indore 12", "Indore 123"]}
                      required={false}
                    />
                  </Form.Item>
                  <Form.Item name="Important">
                    <DropdownSelect
                      name="Important"
                      placeholder="Select importance"
                      options={["Yes", "No"]}
                      required={false}
                    />
                  </Form.Item>
                  <Form.Item name="Looksabha">
                    <DropdownSelect
                      name="Looksabha"
                      placeholder="Select Looksabha"
                      options={["Indore-1", "Indore-2", "Indore-3"]}
                      required={false}
                    />
                  </Form.Item>
                  <Form.Item name="Vidhansabha">
                    <DropdownSelect
                      name="Vidhansabha"
                      placeholder="Select Vidhansabha"
                      options={["Indore-1", "Indore-2", "Indore-3"]}
                      required={false}
                    />
                  </Form.Item>

                  <Form.Item className="col-span-4">
                    <Slider
                      range
                      min={18}
                      max={100}
                      value={age}
                      onChange={(value) => {
                        setAge(value);
                        updateFilter("Age", value);
                      }}
                      className="max-w-[30%]"
                    />
                    <div className="text-sm text-gray-600 mt-2">
                      Age: {age[0]} - {age[1]} years
                    </div>
                  </Form.Item>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <ButtonComponent text={"Reste"} onClick={clearAllFilters} />
                  <ButtonComponent text={"Filter List"} />
                </div>
              </Form>
            )}
          </div>
        </Card>
      </div>
    </VoterFilterContainer>
  );
}
