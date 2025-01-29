import React, { useState } from "react";
import filterIcon from "assets/svg/filter-icon.svg";
import { Button, Drawer, Form } from "antd";
import FormInput from "components/common/FormControl/FormInput";
import DropdownSelect from "components/common/FormControl/DropdownSelect";

const Filters = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const onFinish = (creds) => {
    console.log("Filter Applied:", creds);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {/* Filter Button */}
      <div className="text-center flex-row-reverse ">
        <Button
          type="primary"
          htmlType="button"
          className="sigin-btn text-[12px] font-[500] h-[30px] bg-[#54408C] mb-[16px] px-[18px] py-[8px]"
          style={{ width: "100%", maxWidth: "100px" }}
          onClick={toggleDrawer}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#432C6A")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#54408C")
          }
        >
          <img
            src={filterIcon}
            className="w-[10px] h-[11px] mr-2 "
            alt="Filter"
          />
          FILTER
        </Button>
      </div>

      {/* Ant Design Drawer */}
      <Drawer
        title="Filters"
        placement="right"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        width={400}
        headerStyle={{ background: "#F3F3F3", padding: "15px 25px" }}
        closeIcon={
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        }
      >
        {/* Filter Form */}
        <Form
          name="filterForm"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="villageName" className="mb-1">
            <FormInput name="name" placeholder="By Name" required={false} />
          </Form.Item>

          <Form.Item name="mobileNumber" className="mb-1">
            <FormInput
              name="mobileNumber"
              placeholder="Mobile Number"
              required={false}
            />
          </Form.Item>

          <Form.Item name="village" className="mb-1">
            <DropdownSelect
              name="village"
              placeholder="By Village"
              options={["Kanadiya", "Mushakhedi", "Mangliya"]}
              required={false}
            />
          </Form.Item>

          <Form.Item name="gender" className="mb-1">
            <DropdownSelect
              name="gender"
              placeholder="By Gender"
              options={[
                { id: "Male", name: "Male" },
                { id: "Female", name: "Female" },
                { id: "Other", name: "Other" },
              ]}
              required={false}
            />
          </Form.Item>

          <Form.Item name="caste" className="mb-1">
            <DropdownSelect
              name="caste"
              placeholder="By Caste"
              options={["Rajput", "Maliviya", "Choudhari"]}
              required={false}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="sigin-btn text-[16px] font-[700] h-[48px] bg-[#54408C]"
              style={{ width: "100%" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#432C6A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#54408C")
              }
            >
              Apply Filter
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Filters;
