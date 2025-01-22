import React from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const EditComponent = ({ record, roleType }) => {
  const handleEdit = () => {
    // if (onEdit) {
    //   onEdit(record);
    // }
  };

  return (
    <div>
      <Button
        icon={<EditOutlined />}
        onClick={handleEdit}
        size="small"
        style={{ marginRight: 8 }}
      />
    </div>
  );
};

export default EditComponent;
