import React, { useEffect, useState } from "react";
import { Button, Drawer, Form } from "antd"; // Import Ant Design's Form
import { ExportTables } from "styles/pages/ClientAdmin/Voter";
import MultiSelectDropdown from "components/common/FormControl/MultiSelectDropdown";
import FormInput from "components/common/FormControl/FormInput";
import useGet from "hooks/useGet";
import {
  ASSIGN_SURVEY,
  GET_BOOATH_LIST_ASSIGN_SURVEY,
  GET_VIDHANSABHA_LIST_ASSIGN_SURVEY,
} from "constants/api";
import { toast } from "react-toastify";

const AssignSurvey = ({ setOpen, open, title, data }) => {
  const [vidhanSabhaOption, setVidhanSabhaOption] = useState([]);
  const [selectVidhanSabha, setSelectVidhanSabha] = useState([]);
  const [boothPartOption, setBoothPartOption] = useState([]);
  const [selectBoothPart, setSelectBoothPart] = useState([]);

  const { mutateAsync: GetVidhansabha } = useGet();
  const { mutateAsync: GetBooth } = useGet();
  const { mutateAsync: SurveyAssignAuthUsers } = useGet();
  const loginUsers = JSON.parse(localStorage.getItem("userDetails"));

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      const newVidhanSabhaOptions = data.map((item) => item.vidhansabha || "");
      setVidhanSabhaOption(newVidhanSabhaOptions);

      const newBoothPartOptions = data.map((item) => item.boothPart || "");
      setBoothPartOption(newBoothPartOptions);
    }
  }, [data]);

  const onFinish = (values) => {
    // console.log("Form Submitted: ", values);
  };

  useEffect(() => {
    GetVidhansabhaList();
    {
      selectVidhanSabha && GetBoothList();
    }
  }, []);

  const GetVidhansabhaList = async () => {
    const id = loginUsers.id;
    await GetVidhansabha({
      url: GET_VIDHANSABHA_LIST_ASSIGN_SURVEY + id,
      type: "details",
      token: true,
    })
      .then((res) => {
        if (res) {
          setVidhanSabhaOption(res?.res);
        }
      })
      .catch((error) =>
        toast.error(`Error! ${error?.response?.data?.message}`, {
          position: "top-right",
        })
      );
  };

  const GetBoothList = async () => {
    const id = loginUsers.id;
    await GetBooth({
      url: GET_BOOATH_LIST_ASSIGN_SURVEY + selectVidhanSabha,
      type: "details",
      token: true,
    })
      .then((res) => {
        if (res) {
          setVidhanSabhaOption(res?.res);
        }
      })
      .catch((error) => console.log(error));
  };

  const handlAssignSurvey = async () => {
    const payload = {
      assignById: "192eba6d-388a-40b0-ac92-b4f0cff70961",
      userId: [
        "c4b0a7f0-e7de-4fa4-a387-09aa128e7534",
        "a3598304-a288-4907-a09b-8afc84945833",
      ],
      vidhansabha: ["indore 01", "indore 02"],
      booth: ["indore", "indore1", "indore2"],
      member: 34,
    };
    await SurveyAssignAuthUsers({
      url: ASSIGN_SURVEY,
      type: "details",
      payload: payload,
    })
      .then((res) => {
        if (res) {
          console.log(res?.res);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleAddNewKaryakarta = () => {
    // setAddNew(true);
  };

  return (
    <ExportTables>
      <Drawer title={title} onClose={onClose} open={open}>
        <Form
          name="assignSurvey"
          onFinish={handlAssignSurvey}
          autoComplete="off"
          layout="vertical"
        >
          <MultiSelectDropdown
            title={"Vidhan Sabha Assign"}
            options={vidhanSabhaOption}
            placeholder="Select Vidhan Sabha"
            selectOption={selectVidhanSabha}
            setSelectOption={setSelectVidhanSabha}
          />

          <MultiSelectDropdown
            title={"Select Booth Part"}
            options={boothPartOption}
            placeholder="Select Booth Part"
            selectOption={selectBoothPart}
            setSelectOption={setSelectBoothPart}
          />

          <FormInput
            name={"assignMember"}
            label={"Assign Member"}
            required={false}
            placeholder="Assign Member"
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
