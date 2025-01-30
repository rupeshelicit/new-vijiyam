import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Tag } from "antd"; // Import Ant Design's Form
import { ExportTables } from "styles/pages/ClientAdmin/Voter";
import MultiSelectDropdown from "components/common/FormControl/MultiSelectDropdown";
import FormInput from "components/common/FormControl/FormInput";
import useGet from "hooks/useGet";
import {
  ASSIGN_SURVEY,
  GET_BOOATH_LIST_ASSIGN_SURVEY,
  GET_CITY_LIST_BY_CLIENT_ID,
  GET_VILLAGE_LIST,
} from "constants/api";
import { toast } from "react-toastify";
import usePost from "hooks/usePost";
import UserIcon from "assets/svg/userIcon";

const AssignSurvey = ({ setOpen, open, title, data, usersId }) => {
  const [valageList, setSetVilageList] = useState([]);
  const [boothList, setBoothList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectBooth, setSelectBooth] = useState([]);
  const [selectVillage, setSelectVillage] = useState([]);
  const [selectCity, setSelectCity] = useState([]);
  const { mutateAsync: GetValageList } = useGet();
  const { mutateAsync: GetBooth } = useGet();
  const { mutateAsync: GetCity } = useGet();
  const { mutateAsync: SurveyAssignAuthUsers } = usePost();
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));

  const onClose = () => {
    setOpen(false);
  };
  console.log(data, "-------------->data");
  useEffect(() => {
    if (open) {
      getBoothList();
      getVilageList();
      getCityList();
    }
  }, [open]);

  const getBoothList = async () => {
    const id = loginUsers.id;
    try {
      const res = await GetBooth({
        url: GET_BOOATH_LIST_ASSIGN_SURVEY + id,
        type: "details",
        token: true,
      });

      if (res) {
        const booth = res.map((item) => ({
          id: item.booth,
          name: item.booth,
        }));
        setBoothList(booth ? booth : []);
      }
    } catch (error) {
      console.error("Error fetching booth list:", error);
    }
  };

  const getVilageList = async () => {
    const id = loginUsers.id;
    await GetValageList({
      url: GET_VILLAGE_LIST + id,
      type: "details",
      token: true,
    })
      .then((res) => {
        if (res) {
          setSetVilageList(res?.res);

          const village = res.map((item) => ({
            id: item.village,
            name: item.village,
          }));
          setSetVilageList(village ? village : []);
        }
      })
      .catch((error) => console.log(error));
  };

  const getCityList = async () => {
    const id = loginUsers.id;
    await GetCity({
      url: GET_CITY_LIST_BY_CLIENT_ID + id,
      type: "details",
      token: true,
    })
      .then((res) => {
        if (res) {
          const city = res.map((item) => ({
            id: item.city,
            name: item.city,
          }));
          setCityList(city ? city : []);
        }
      })
      .catch((error) => console.log(error));
  };

  const handlAssignSurvey = async (creds) => {
    const loginUserId = loginUsers?.id;
    const payload = {
      assignById: loginUserId,
      userId: usersId,
      city: selectCity,
      booth: selectBooth,
      member: creds?.member,
    };
    await SurveyAssignAuthUsers({
      url: ASSIGN_SURVEY,
      type: "details",
      payload: payload,
      token: true,
    })
      .then((res) => {
        if (res) {
          toast.success("Success! You have successfully assign survey", {
            position: "top-right",
          });
          updateEditState("karyakarta", true);
          setOpen(false);
        }
      })
      .catch((error) => {
        toast.error(`Error! ${error?.response?.data?.message}`, {
          position: "top-right",
        });
      });
  };

  return (
    <ExportTables>
      <Drawer title={title} onClose={onClose} open={open} className="drowr">
        <Form
          name="assignSurvey"
          onFinish={handlAssignSurvey}
          autoComplete="off"
          layout="vertical"
        >
          <div className="mb-[10px] ">
            {/* User Icon */}
            <div className="userName h-[50px] mb-[15px] w-[50px] bg-[#2f244d59] flex justify-center items-center rounded-[50px] mb-[20px]">
              <UserIcon />
            </div>
            <div className="flex flex-wrap justify-start">
            {data?.map((item, index) => (
              <>
                <Tag
                  key={'name'}
                 
                  className="flex items-center gap-1 bg-gray-100 text-gray-700 py-1 px-2"
                >
                  name:{item?.name}
                </Tag>
              </>
            ))}
          </div>
          </div>

          {/* Displaying the name in a list */}
          

          <MultiSelectDropdown
            name={"villageName"}
            title={"Assign Village"}
            options={valageList}
            placeholder="Select Village"
            setSelectOption={setSelectVillage}
            selectOption={selectVillage}
          />
          <MultiSelectDropdown
            name={"city"}
            title={"Assign City"}
            options={cityList}
            placeholder="Select City"
            selectOption={selectCity}
            setSelectOption={setSelectCity}
          />

          <MultiSelectDropdown
            name={"booth"}
            title={"Select Booth Part"}
            options={boothList}
            placeholder="Select Booth Part"
            selectOption={selectBooth}
            setSelectOption={setSelectBooth}
          />
          <FormInput
            name={"member"}
            label={"Assign Voter Range "}
            required={false}
            placeholder=" 0-100"
          />

          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            className="sigin-btn text-[16px] font-[700] h-[48px] bg-[#54408C]"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#432C6A")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#54408C")
            }
          >
            Submit
          </Button>
        </Form>
      </Drawer>
    </ExportTables>
  );
};

export default AssignSurvey;
