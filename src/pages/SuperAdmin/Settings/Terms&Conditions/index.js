import React, { useEffect, useState, useCallback } from "react";
import { Button, List } from "antd";
import {
  FileTextOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { GET_TERMS_CONDITIONS_LIST } from "constants/api";
import useGet from "hooks/useGet";
  import { useNavigate } from "react-router-dom";
import ViewComponent from "components/common/Action/View";
import DeleteComponent from "components/common/Action/Delete";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const { mutateAsync: fetchTermConditionList } = useGet();
  const [guidelines, setGuidelines] = useState([]);

  // Fetch the terms and conditions list
  const getTermConditionList = useCallback(async () => {
    try {
      const res = await fetchTermConditionList({
        url: GET_TERMS_CONDITIONS_LIST,
        type: "details",
        token: true,
      });
      if (res) {
        setGuidelines(res);
      } else {
        console.warn("No items found in response.");
      }
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
    }
  }, [fetchTermConditionList]);

  useEffect(() => {
    getTermConditionList();
  }, [getTermConditionList]);
  console.log(guidelines, "guidelines");
  return (
    <div className="mx-auto">
      {guidelines.length > 0 ? (
        <>
          <List
            dataSource={guidelines}
            renderItem={(item) => (
              <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0 [box-shadow:0px_2px_8px_0px_#00000022] mt-[10px] mb-[10px] p-[15px] rounded-[8px] ">
                <div className="flex items-center gap-3">
                  <FileTextOutlined className="text-gray-600 text-xl" />
                  <span className="text-sm font-medium">
                    {item?.role?.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
               
                  <button
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="View guidelines"
                    onClick={() => console.log("Viewing item:", item)}
                  >
                    <ViewComponent roleType={'termsCondition'} record={item} />
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Delete guidelines"
                    onClick={() => console.log("Deleting item:", item)}
                  >
                    <DeleteComponent roleType={"termsCondition"} record={item} />
                  </button>
                </div>
              </div>
            )}
          />
          <div className="flex justify-center  add-terms-condition mt-[50px]">
            <Button
              onClick={() => navigate("/upload-terms-conditions")}
              className="p-[15px] rounded-[8px] h-[40px] text-[white] bg-[#55418d] hover:text-[#55418d] hover:border-[#55418d] hover:bg-white"
            >
              Add Terms&Condition
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="text-center text-gray-500 py-5 ">
              No terms & conditions available.
            </div>
            </div>
            <div className="flex justify-center  add-terms-condition  mt-[50px]">
            <Button
              onClick={() => navigate("/upload-terms-conditions")}
              className="p-[15px] rounded-[8px] h-[40px] text-[white] bg-[#55418d] hover:text-[#55418d] hover:border-[#55418d] hover:bg-white"
            >
              Add Terms&Condition
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TermsAndConditions;
