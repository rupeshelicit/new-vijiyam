import { List } from "antd";
import {
  FileTextOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { GET_TERMS_CONDITIONS_LIST } from "constants/api";
import { useCallback, useEffect, useState } from "react";
import useGet from "hooks/useGet";
import { useNavigate } from "react-router-dom";

const guidelines = [
  {
    title: "Upload Guidelines for Client Admin",
    status: "Added",
    roleId: 3,
  },
  {
    title: "Upload Guidelines for Distributors",
    status: "Added",
    roleId: 4,
  },
  {
    title: "Upload Guidelines for Karykarta",
    status: "Added",
    roleId: 1,
  },
  {
    title: "Upload Guidelines for Standard User",
    status: "Not Added",
    roleId: 2,
  },
];

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const { mutateAsync: GetTermConditionList } = useGet();
  const [guidelinesData, setGuidelinesData] = useState();
  useEffect(() => {
    getTermConditionList();
  }, []);

  const getTermConditionList = async () => {
    await GetTermConditionList({
      url: GET_TERMS_CONDITIONS_LIST,
      type: "details",
      token: true,
    })
      .then((res) => {
        if (res) {
          setGuidelinesData(res);
        }
      })
      .catch((error) => console.log(error));
  };


  // Corrected version
  const updatedGuidelines = guidelines.map((item) => {
    const matchedItem = guidelinesData?.find(
      (apiItem) => apiItem.roleId === item.roleId
    );

    return {
      ...item,
      status: matchedItem ? "Added" : "notAdd",
    };
  });

  console.log("Updated Guidelines:", updatedGuidelines);

  return (
    <div className=" mx-auto">
      <List
        dataSource={updatedGuidelines}
        renderItem={(item) => (
          <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center gap-3">
              <FileTextOutlined className="text-gray-600 text-xl" />
              <span className="text-sm font-medium">{item.title}</span>
            </div>
            <div className="flex items-center gap-3">
              {item.status === "Added" ? (
                <>
                  <button
                    onClick={() => navigate("/upload-guidlines")}
                    className=" hover:text-gray-600 transition-colors bg-[#7DC87D96] text-[black] px-[15px] py-[5px] rounded-[8px]"
                    aria-label="View guidelines"
                  >
                    Added
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="View guidelines"
                  >
                    <EyeOutlined />
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Delete guidelines"
                  >
                    <DeleteOutlined />
                  </button>
                </>
              ) : (
                <button
                  className=" hover:text-gray-600 transition-colors bg-[#C89A7D96] text-[black] px-[15px] py-[5px] rounded-[8px]"
                  aria-label="View guidelines"
                >
                  Not Added
                </button>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default TermsAndConditions;
