import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import rightArrow from "assets/svg/right-arrow-icon.svg";
import { LoginPage } from "styles/pages/Login";
import sideImg from "assets/images/sideImgFpassword.png";
import Logo from "assets/svg/logo.svg";
import { UPDATE_PASSWORD } from "constants/api";
import usePost from "hooks/usePost";
import usePatch from "hooks/usePatch";
import { toast } from "react-toastify";
const NewPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { mutateAsync: ChangePassword } = usePatch();
  const Users = JSON.parse(localStorage.getItem("userDetails"));
  const onFinish = (creds) => {
    console.log(creds);
    if (creds && creds?.NewPassword) {
      const payloads = { id: Users.id, password: creds.NewPassword };
      ChangePassword({
        url: UPDATE_PASSWORD,
        type: "details",
        payload: payloads,
      })
        .then((res) => {
          if (res) {
            toast.success("Success! Your Password is successfuly Updated Please Login", {
              position: "top-right",
            });
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const onFinishFailed = () => {};
  return (
    <LoginPage>
      <div className="flex flex-wrap items-center min-h-[100vh]">
        <div className="w-[50%] mobile-responcive form">
          <div className="flex justify-center width-[100%] mb-[20px] ">
            <img src={Logo} className="w-[70px] " />
          </div>
          <div className="max-w-[330px] mx-auto">
            <span
              className="flex items-center text-[16px]  font-[500] pb-[24px] cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={rightArrow} />
              <b>Back to login</b>
            </span>
            <h3 className="sigin-title text-[26px] font-[600]">New Password</h3>
            <p className="text-[14px] font-[400] pb-[24px]">
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
            </p>
            <div>
              <Form
                className="login-form"
                name="basic"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="NewPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters long!",
                    },
                  ]}
                  className="mb-10"
                >
                  <Input.Password
                    placeholder="Password"
                    className="text-[16px] font-[400] h-[48px]"
                    onClick={(e) => setPassword(e.target.value)}
                    style={{
                      borderWidth: "1px",
                      borderColor: "#d9d9d9",
                    }}
                    onFocus={(e) =>
                      (e.target.parentElement.style.borderColor = "#54408C")
                    }
                    onBlur={(e) =>
                      (e.target.parentElement.style.borderColor = "#d9d9d9")
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="ConfirmPassword"
                  dependencies={["NewPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("NewPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match!")
                        );
                      },
                    }),
                  ]}
                  className="mb-10"
                >
                  <Input.Password
                    placeholder="Password"
                    onClick={(e) => setConfirmPassword(e.target.value)}
                    className="text-[16px] font-[400] h-[48px]"
                    style={{
                      borderWidth: "1px",
                      borderColor: "#d9d9d9",
                    }}
                    onFocus={(e) =>
                      (e.target.parentElement.style.borderColor = "#54408C")
                    }
                    onBlur={(e) =>
                      (e.target.parentElement.style.borderColor = "#d9d9d9")
                    }
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    span: 24,
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="Send OTP"
                    loading={loading}
                    className="sigin-btn text-[16px] font-[700] h-[48px] bg-[#54408C]"
                    style={{ width: "100%" }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div className="w-[50%] mobile-responcive">
          <div className="side-img flex ">
            <img src={sideImg} className="md:h-[100vh] ml-auto" />
          </div>
        </div>
      </div>
      <div></div>
    </LoginPage>
  );
};
export default NewPassword;
