import { Switch } from "antd";
import React from "react";

const SwitchComponent = ({
  switchStates,
  setSwitchStates,
  record,
  disabled,
}) => {
  if (!record || !record.id) {
    // console.error("Record is not defined or missing id:", record);
    return null;
  }

  return (
    <Switch
      disabled={disabled}
      onChange={(checked) => {
        const updatedState = {
          ...switchStates,
          [record.isPermission]: {
            isPermission: record.isPermission ? "on" : "off",
            status: checked ? "on" : "off",
          },
        };
        setSwitchStates(updatedState);
      }}
      defaultValue={record.isPermission}
    />
  );
};

export default SwitchComponent;
