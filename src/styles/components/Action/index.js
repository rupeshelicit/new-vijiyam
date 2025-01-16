import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React from "react";

const Actions = ({ record }) => {
  const handleAction = (action, record) => {
    if (action === "view") {
      console.log("View action for:", record);
    } else if (action === "edit") {
      console.log("Edit action for:", record);
    } else if (action === "delete") {
      console.log("Delete action for:", record);
    }
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => handleAction("view", record)}>
        View
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleAction("edit", record)}>
        Edit
      </Menu.Item>
      <Menu.Item key="3" onClick={() => handleAction("delete", record)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <EllipsisOutlined
        style={{ fontSize: "24px", cursor: "pointer" }}
        onClick={(e) => e.stopPropagation()}
      />
    </Dropdown>
  );
};

export default Actions;
