import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "styles/components/common/Layout";
import { MobileSlipsSettingsContainer } from "styles/pages/ClientAdmin/SlipSettings";
import BackArrow from "assets/svg/backArrow";
import { Button, Card, Form, Input } from "antd";
import FormInput from "components/common/FormControl/FormInput";
import UploadFile from "components/common/FormControl/UploadFile";
import profileImage from "assets/images/profileImage.png";
import BJPIcon from "assets/svg/bjpPartyIcon.svg";
import useGet from "hooks/useGet";
import { GET_ELECTION_PARTY } from "constants/api";
const MobileSlipsSettings = () => {
  const nevigate = useNavigate();
  const [uploadSymbol, setUploadSymbol] = useState();
  const [candidateImage, setCandidateImage] = useState();
  const [loading, setLoading] = useState(false);
  const { mutateAsync: GetPartyList } = useGet();
  const [party, setParty] = useState([]);
  const onFinish = (creds) => {
    console.log("Slip Settings:", { ...creds, uploadSymbol, candidateImage });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    // getElectionParty();
  }, []);

  const getElectionParty = async () => {
    await GetPartyList({
      url: GET_ELECTION_PARTY,
      type: "details",
    })
      .then((res) => {
        if (res) {
          setParty(res && res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <MobileSlipsSettingsContainer>
      <Container>
        <div className="header">
          <h3 className="text-[22px] font-semibold mb-[13px] mt-[20px]">
            Slip Settings{" "}
          </h3>
          <div
            onClick={() => nevigate("/")}
            className="flex gap-[5px] cursor-pointer"
          >
            <span>
              <BackArrow />
            </span>
            <b className="text-[14px] font-medium">Back</b>
          </div>
        </div>
        <Card className="[box-shadow:0px_4px_4px_0px_#00000040] rounded-[16px] mt-[20px] mb-[20px] p-0 overflow-hidden">
          <div className="mobile-slip-settingContent flex justify-between">
            <div className="genrate-slip-setting">
              <Form
                layout="vertical"
                className="pt-[35px] pr-[0] pb-[60px] pl-[35px]"
                name="filterForm"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item label="Slip Tittle">
                  <FormInput placeholder="" name="slipTittle" />
                </Form.Item>

                <Form.Item label="Candidate  Name">
                  <FormInput placeholder="" name="candidateName" />
                </Form.Item>

                <Form.Item label="Party Name">
                  <FormInput placeholder="" name="partyName" />
                  
                </Form.Item>
                <Form.Item>
                  <div>
                    <UploadFile
                      inputName={"symbol"}
                      setFile={setUploadSymbol}
                      inputLable={"symbol"}
                      recommend={"Recommend 300*300 and blow  100kb"}
                    />
                  </div>
                  <div>
                    <UploadFile
                      inputName={"candidateImage"}
                      inputLable={"Upload Candidate image"}
                      recommend={"Recommend 300*300 and blow  100kb"}
                      setFile={setCandidateImage}
                    />
                  </div>
                </Form.Item>

                <Form.Item className="mt-[100px]">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="sigin-btn text-[16px] font-[700] h-[48px] bg-[#54408C]"
                    style={{ width: "100%" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#432C6A")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#54408C")
                    }
                  >
                    Save Slip
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="preview-slip-setting max-w-[375px] border-[1px]  border-[solid] border-[#0000001A] [box-shadow:0px_4px_4px_0px_#00000040]">
              <div className="heading mb-[25px] pl-[20px] pr-[0] py-[0] border-b border-black/20">
                <h3 className="text-[22px] font-semibold mb-[13px] mt-[20px] ">
                  Slip Preview
                </h3>
              </div>
              <div className="content pl-[37px] pr-[86px] py-[0] border-l-[1px_solid_#ababab] ">
                <div className="profile flex justify-center ">
                  <img src={profileImage} />
                </div>
                <div className="details pt-[40px]">
                  <h3 className="text-[20px] font-semibold mb-[10px]">
                    Assembly : Indore-1
                  </h3>
                  <span className="text-[20px] font-medium mb-[10px]">
                    Candidate: Shubham
                  </span>
                  <div className="flex gap-[10px]">
                    <p className="text-[16px] font-normalmb-[20px] ">
                      Party Name: BJP
                    </p>{" "}
                    <img
                      src={BJPIcon}
                      height={"24px"}
                      width={"24px"}
                      className="mt-[-13px]"
                    />
                  </div>
                </div>
              </div>
              <div className="voter-details">
                <h3 className="text-center text-[16px] font-semibold">
                  Voter Details
                </h3>
                <div className="details pl-[37px]  py-[0] max-w[300px] ">
                  <h3 className="text-[20px] font-semibold mb-[10px]">
                    Name : ***
                  </h3>
                  <h3 className="text-[20px] font-semibold mb-[10px]">
                    Father/Husband: ***
                  </h3>
                  <p className="text-[16px] font-normal mb-[10px]">
                    Part no: 01
                  </p>
                  <p className="text-[16px] font-normal mb-[10px]">
                    Voter Id: TPE565465
                  </p>
                  <p className="text-[16px] font-normal mb-[10px]">
                    house No: 1/285
                  </p>
                  <p className="text-[16px] font-normal mb-[10px]">
                    Part no: 01
                  </p>

                  <b className="text-[16px] font-medium mb-[20px] ">
                    Booth no: 1- indore vijay nage medanta road
                  </b>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </MobileSlipsSettingsContainer>
  );
};

export default MobileSlipsSettings;
