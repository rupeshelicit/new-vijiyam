import { SaveOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const ViewComponent = (record, roleType) => {
  const handleUpdate = () => {};

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
