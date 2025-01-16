import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "styles/components/common/Layout";
import { TextMessagesContainer } from "styles/pages/ClientAdmin/SendMessages";
import { Button, Card, Form, Input, Upload } from "antd";
import FormInput from "components/common/FormControl/FormInput";
import UploadFile from "components/common/FormControl/UploadFile";
import AddDynamicField from "components/common/FormControl/AddDynamicFiled";
import BackArrow from "assets/svg/backArrow";

const TextMessages = () => {
  const nevigate = useNavigate();
  const [uploadSymbol, setUploadSymbol] = useState();
  const [candidateImage, setCandidateImage] = useState();
  const [loading, setLoading] = useState(false);
  console.log(candidateImage, "candidateImage");
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
  const UploadIcon = () => (
    <svg
      width="50"
      height="40"
      viewBox="0 0 70 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.306 9.45713C55.6002 3.93341 66.2299 10.3731 66.2299 17.1161C66.2299 21.4711 64.5621 23.1793 61.9791 24.9999C75.0065 31.9734 69.1105 47.3982 57.7453 49.9999H18.0512C-0.59142 49.9999 -7.48693 24.719 12.3629 18.594C8.64003 3.74236 37.7326 -9.66514 48.306 9.45713ZM30.3598 39.0761V30.1528H22.3805L34.8969 15.082L47.4132 30.1528H39.434V39.0761H30.3598Z"
        fill="black"
        fillOpacity="0.5"
      />
    </svg>
  );
  return (
    <TextMessagesContainer>
      <Container>
        <div className="header">
          <h3 className="text-[22px] font-semibold mb-[13px] mt-[20px]">
            Bulk Text Messages Messages
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
        <Card className="[box-shadow:0px_4px_4px_0px_#00000040] rounded-[16px] mt-[20px] mb-[20px] p-0  ">
          <div className="mobile-slip-settingContent flex justify-between">
            <div className="genrate-slip-setting  w-full ">
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
                <Form.Item label="Message Tittle">
                  <FormInput placeholder="" name="messageTittle" />
                </Form.Item>
                <Form.Item
                  name="messages"
                  rules={[
                    {
                      required: true,
                      message: "Please provide a Messages!",
                      whitespace: true,
                    },
                  ]}
                  className="mb-10 max-width: 490px; mb-[32px] "
                  label="Messages"
                >
                  <div>
                    <Input.TextArea
                      rows={4}
                      placeholder="Messages"
                      style={{
                        background: "#f9f9f9",
                        borderRadius: "5px",
                        padding: "10px",
                        fontSize: "14px",
                        color: "#000",
                      }}
                    />
                  </div>
                </Form.Item>

                <Form.Item className="upload-file mb-[32px] ">
                  <div className="max-w-[45%]">
                    <UploadFile
                      inputName={"mobileNoList"}
                      setFile={setUploadSymbol}
                      inputLable={"Upload Mobile Number Excel Sheet"}
                      //   recommend={"Recommend 300*300 and blow  100kb"}
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <AddDynamicField />
                </Form.Item>

                <Form.Item className="mt-[100px]">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="sigin-btn text-[16px] font-[700] h-[48px] bg-[#54408C] max-w-[200px] mt-[100px]"
                    style={{ width: "100%" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#432C6A")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#54408C")
                    }
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Card>
      </Container>
    </TextMessagesContainer>
  );
};

export default TextMessages;
