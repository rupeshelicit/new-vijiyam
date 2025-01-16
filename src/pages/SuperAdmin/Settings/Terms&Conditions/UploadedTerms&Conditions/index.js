import React from "react";
import { Container } from "styles/components/common/Layout";
import ListIcons from "assets/svg/listIcons";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
const TermsAndConditionsList = () => {
  return (
    <Container>
      <div className="flex justify-between p-[20px] flex-wrap [box-shadow:0px_2px_8px_0px_#00000022] rounded-[8px] mb-[20px] mt-[20px]">
        <div>
          <span>{ListIcons}</span>
          <div>Uploaded Condition for Client c</div>
        </div>
        <div className="flex gap-[25px]">
          <div className="edit max-w-[100px]">
            <EditFilled />
          </div>
          <div className="view max-w-[100px]">View</div>
          <div className="max-w-[100px]">
            <DeleteFilled />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TermsAndConditionsList;
