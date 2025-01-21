import { List } from "antd";
import {
  FileTextOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { GET_TERMS_CONDITIONS_LIST } from "constants/api";
import { useCallback, useEffect, useState } from "react";
import useGet from "hooks/useGet";

const guidelines = [
  // {
  //   title: "Upload Guidelines for Client Admin",
  //   status: "Added",
  // },
  // {
  //   title: "Upload Guidelines for Distributors",
  //   status: "Added",
  // },
  // {
  //   title: "Upload Guidelines for Karykarta",
  //   status: "Added",
  // },
  // {
  //   title: "Upload Guidelines for Standard User",
  //   status: "Not Added",
  // },
];

const UploadGuidelinesAndTerms = () => {
  const { mutateAsync: GetTermConditionList } = useGet();
  const [guidelines, setGuidelines] = useState();
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
          let newRes = [...guidelines];
          newRes = newRes.concat(res?.items);
          setGuidelines(newRes);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className=" mx-auto">
      <List
        dataSource={guidelines}
        renderItem={(item) => (
          <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center gap-3">
              <FileTextOutlined className="text-gray-600 text-xl" />
              <span className="text-sm font-medium">{item.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-md text-xs font-medium ${
                  item.status === "Added"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {item.status}
              </span>
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
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default UploadGuidelinesAndTerms;
