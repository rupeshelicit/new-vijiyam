import { SaveOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const ViewComponent = (onUpdte) => {
  const handleUpdate = () => {
    if (onUpdte) {
      onEdit(record);
    }
  };

  return (
    <div>
      {" "}
      <Button
        icon={<SaveOutlined />}
        onClick={handleUpdate}
        size="small"
        style={{ marginRight: 8 }}
      />
    </div>
  );
};

export default ViewComponent;
