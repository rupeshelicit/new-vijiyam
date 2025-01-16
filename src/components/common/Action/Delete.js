import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const DeleteComponet = (record, onDelete) => {
  const handleDelete = () => {
    if (onDelete) {
        onDelete(record);
    }
  };

  return (
    <div>
      <Button
        icon={<DeleteOutlined />}
        onClick={handleDelete}
        size="small"
        danger
      />
    </div>
  );
};

export default DeleteComponet;
