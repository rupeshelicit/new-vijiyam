import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import useMetaData from "context/metaData";
import { LoginPage } from "styles/pages/Login";
import sideImg from "assets/images/side right.png";
import Logo from "assets/svg/logo.svg";
import usePost from "hooks/usePost";
import { LOGIN } from "constants/api";
const Login = () => {
  const [userDetails, setUserDetails] = useState("");
  console.log(userDetails, setUserDetails);

  const navigate = useNavigate();
  const { setCustmerDetails } = useMetaData();
  const [loading, setLoading] = useState(false);
  const { mutateAsync: UserLogin } = usePost();

  const onFinish = (creds) => {
    if (creds && creds?.useremail && creds?.password) {
      const payloads = { username: creds.useremail, password: creds.password };
      UserLogin({
        url: LOGIN,
        type: "details",
        payload: payloads,
      })
        .then((res) => {
          if (res) {
            console.log(res,"responcedata")
            localStorage.setItem("account_type", res.role);
            const roleId = res.role;
            const token = res.token;
            setCustmerDetails({ account_type: res.role });
            localStorage.setItem("roleId", roleId);
            localStorage.setItem("token", token);
            localStorage.setItem("userDetails", JSON.stringify(res));
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

  //     localStorage.setItem(
  //       "token",
  //       "ex.12332wmkmdnndwjhqiwejqejwasdjbsjdsdsnjdbsd.ewew.23.2njnedbsn"
  //     );
  
  //     if (creds.useremail === "superadmin@gmail") {
  //       localStorage.setItem("account_type", "super_admin_login");
  //       localStorage.setItem("roleId", "1");
  //       setCustmerDetails({ account_type: "super_admin_login" });
  //     } else if (creds.useremail === "client@gmail.com") {
  //       localStorage.setItem("account_type", "client_login");
  //       localStorage.setItem("roleId", "2");
  //       setCustmerDetails({ account_type: "client_login" });
  //     } else if (creds.useremail === "distributor@gmail") { 
  //       localStorage.setItem("account_type", "distributor_login");
  //       localStorage.setItem("roleId", "3");


  //     } else{
  //       localStorage.setItem("account_type", "unknown_login");
  //       localStorage.setItem("roleId", "0");
  //       setCustmerDetails({ account_type: "unknown_login" });
  //     }
  
  //     navigate("/");
  
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false);
  //       window.location.reload();
  //     }, 3000);
  //   } else {
  //     console.error("Invalid credentials! Please enter valid email and password.");
  //   }
  // };
  
  const onFinishFailed = () => {};

  return (
    <LoginPage>
      <div className="flex flex-wrap items-center min-h-[100vh]">
        <div className="w-[50%] mobile-responcive form">
          <div className="flex justify-center width-[100%] mb-[20px] ">
            <img src={Logo} className="w-[70px] " />
          </div>
          <div className="max-w-[330px] mx-auto">
            <h3 className="sigin-title text-[26px] font-[600] mb-[5px]">
              Login
            </h3>
            <p className="text-[14px] font-[400] pb-[24px]  mb-[0px] text-[#313131]">
              Login to access your travelwise account
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
                  name="useremail"
                  rules={[
                    {
                      required: true,
                      message: "Please input your useremail!",
                    },
                  ]}
                  className="mb-[16px]"
                >
                  <Input
                    placeholder="Email"
                    type="email"
                    className="text-[16px] font-[400] h-[48px]"
                    style={{
                      borderWidth: "1px",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#54408C")}
                    onBlur={(e) => (e.target.style.borderColor = "#d9d9d9")}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  className="mb-9"
                >
                  <Input.Password
                    placeholder="Password"
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
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <p className="text-[14px] font-[400]">
                Forgot password ?
                <b
                  className="text-[14px] font-[700] text-[#54408C] cursor-pointer "
                  onClick={() => navigate("/forgotpassword")}
                >
                  {" "}
                  Click here
                </b>
              </p>
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
export default Login;
