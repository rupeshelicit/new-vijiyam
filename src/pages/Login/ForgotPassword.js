import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { LoginPage } from "styles/pages/Login";
import sideImg from "assets/images/sideImgFpassword.png";
import verifysideImg from "assets/images/side-right-verify.png";
import rightArrow from "assets/svg/right-arrow-icon.svg";
import Logo from "assets/svg/logo.svg";
import { useNavigate } from "react-router-dom";
import usePost from "hooks/usePost";
import { FORGOT_PASSWORD, VERIFY_OTP } from "constants/api";
import NewPassword from "./NewPassword";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState();
  const [isOpenForgotPasswor, setOpenForgotPassword] = useState();

  const { mutateAsync: ForgetPassword } = usePost();
  const { mutateAsync: VerifyOtp } = usePost();
  const onFinish = (creds) => {
    if (creds && creds?.useremail) {
      const payloads = { username: creds.useremail };
      setEmail(creds.useremail);
      ForgetPassword({
        url: FORGOT_PASSWORD,
        type: "details",
        payload: payloads,
      })
        .then((res) => {
          if (res) {
            setLoading(true);
            setVerify(true);
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

  const handleVerifyOtp = () => {
    if (otp) {
      const payloads = { mobileNumber: email, otp: otp };

      VerifyOtp({
        url: VERIFY_OTP,
        type: "details",
        payload: payloads,
      })
        .then((res) => {
          if (res) {
            setOpenForgotPassword(res);

            setLoading(true);

            toast.success("Success! Otp is verified!", {
              position: "top-right",
            });
            localStorage.setItem("userDetails", JSON.stringify(res));
            navigate("/updatePassword");
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

  const isonClick = verify ? handleVerifyOtp : onFinish;
  return (
    <LoginPage>
      <div className="flex flex-wrap items-center min-h-[100vh]">
        <div className="w-[50%] mobile-responcive form">
          <div className="flex justify-center width-[100%] mb-[20px] ">
            <img src={Logo} className="w-[70px] " />
          </div>
          <div className="max-w-[330px] mx-auto ">
            <span
              className="flex !flex-row items-center text-[16px]  font-[500] pb-[24px] cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={rightArrow} />
              <b className="text-[14px] font-normal font-['Poppins'] ">
                Back to login
              </b>
            </span>
            <h3 className="sigin-title text-[26px] font-[600]">
              {verify ? "Verify" : "Forgot your password? "}
            </h3>
            <p className="text-[14px] font-[400] pb-[24px] text-[#313131] mb-[0px]">
              {verify
                ? "An authentication code has been sent to your email."
                : " Don’t worry, happens to all of us. Enter your email below torecover your password"}
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
                onFinish={isonClick}
                autoComplete="off"
              >
                {verify ? (
                  <>
                    <Form.Item
                      name="otp"
                      rules={[
                        {
                          required: true,
                          message: "Please input otp!",
                        },
                      ]}
                      className="mb-4"
                    >
                      <Input
                        placeholder="OTP"
                        type="text"
                        className="text-[16px] font-[400] h-[48px]  "
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      className=""
                      wrapperCol={{
                        span: 24,
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        onClick={handleVerifyOtp}
                        className="sigin-btn text-[16px] font-[700] h-[48px] bg-[#54408C]"
                        style={{ width: "100%" }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </>
                ) : (
                  <>
                    <Form.Item
                      name="useremail"
                      rules={[
                        {
                          required: true,
                          message: "Please input your useremail!",
                        },
                      ]}
                      className="mb-[36px]"
                    >
                      <Input
                        classNames="mb-[36px]"
                        placeholder="Email"
                        type="email"
                        style={{
                          borderWidth: "1px",
                          borderColor: "#d9d9d9", // Default border color
                          borderRadius: "4px", // Optional: Add border radius for a smooth effect
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#54408C"; // Change input's border color
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#d9d9d9"; // Reset to default
                        }}
                        className="text-[16px] font-[400] h-[48px] "
                      />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        span: 24,
                      }}
                    >
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
                        Send OTP
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="w-[50%] mobile-responcive">
          <div className="side-img flex ">
            <img
              src={verify ? verifysideImg : sideImg}
              className="md:h-[100vh] ml-auto"
            />
          </div>
        </div>
      </div>
    </LoginPage>
  );
};
export default ForgotPassword;
