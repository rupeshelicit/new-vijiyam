import React, { useState } from "react";
import { Button, Col, Input, Row, Upload, Form, message, Switch } from "antd";
import userProfileImg from "assets/images/userimage.png";
import backgroundImg from "assets/images/display-profile-background.png";
import { Container } from "styles/components/common/Layout";
import { useNavigate } from "react-router-dom";
import BackArrow from "assets/svg/backArrow";
import FormInput from "components/common/FormControl/FormInput";
import DropdownSelect from "components/common/FormControl/DropdownSelect";
import { DisplayProfileComponent } from "styles/pages/ClientAdmin/DisplayMyProfile";

const HeaderSection = ({ userProfile, background }) => (
  <div
    className="header w-[100%] relative bg-blend-overlay bg-cover bg-center h-[100px] flex items-center p-[10px] "
    style={{ backgroundImage: `url(${background})` }}
  ></div>
);

const UploadIcon = () => (
  <svg
    width="70"
    height="50"
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

const ClientEditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [form] = Form.useForm();
  const nevigate = useNavigate();

  const handleUpload = (info) => {};

  const onFinish = (values) => {
    if (!imageUrls.length) {
      message.error("Please upload at least one photo!");
      return;
    }

    setLoading(true);
    console.log("Form values:", { ...values, photos: imageUrls });

    setTimeout(() => {
      setLoading(false);
      message.success("Post uploaded successfully!");
      form.resetFields();
      setImageUrls([]);
    }, 3000);
  };

  const onFinishFailed = (errorInfo) => {
    const errors = [];
    if (!imageUrls.length) errors.push("Please upload at least one photo!");
    if (!form.getFieldValue("description"))
      errors.push("Please provide a description!");

    errors.forEach((error) => message.error(error));
  };

  return (
    <DisplayProfileComponent className=" display-profile">
      <Container>
        <h3 className="text-[22px] font-semibold mb-[20px] mt-[20px] ">
          Client Profile
        </h3>
      
        <Row className="form-section rounded-[15px] [box-shadow:0px_4px_4px_0px_#00000040] overflow-hidden mb-[30px]">
          <HeaderSection
            userProfile={userProfileImg}
            background={backgroundImg}
          />
          <div className="p-[25px] w-[100%]">
            <div className="user-details flex items-center  justify-between w-full ">
              <div className="profile flex justify-between gap-[20px] items-center">
                {" "}
                <div className="img rounded-[50%]">
                  <img
                    src={userProfileImg}
                    alt="profile-img"
                    width={"85px"}
                    height={"85px"}
                  />
                </div>
                <div className="name-email">
                  <strong className="text-[20px] font-medium">
                    Alexa Rawles
                  </strong>
                  <p className="text-[16px] font-normal text-[#606060]">
                    alexarawles@gmail.com
                  </p>
                </div>
              </div>
              <div className="edit-button">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="sigin-btn text-[16px] font-[400] px-[37px] py-[9px] bg-[#54408C] max-w-[200px]"
                  style={{ width: "100%" }}
                  loading={loading}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#432C6A")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#54408C")
                  }
                >
                  Edit
                </Button>
              </div>
            </div>
            <Form
              form={form}
              name="displayProfile"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="pt-[25px] pr-[0] pb-[20px] "
              style={{ width: "100%" }}
            >
              <Row gutter={16} className="input-row">
                <Col span={12}>
                  <Form.Item>
                    <label className="text-[16px] font-normal pb-[16px]">
                      Your First Name
                    </label>
                    <FormInput
                      name="firstName"
                      placeholder="First Name "
                      required={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <label className="text-[16px] font-normal pb-[16px]">
                      Father Name
                    </label>
                    <FormInput
                      name="fatherName"
                      placeholder="Father Name "
                      required={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <label className="text-[16px] font-normal pb-[16px]">
                      Voter Id
                    </label>
                    <FormInput
                      name="voterId"
                      placeholder="Voter Id Number "
                      required={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <label className="text-[16px] font-normal pb-[16px]">
                      Gender
                    </label>
                    <DropdownSelect
                      name={"gender"}
                      placeholder="By Gender"
                      options={["Male", "Female", "Other"]}
                      required={false}
                    />{" "}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <label className="text-[16px] font-normal pb-[16px]">
                      DOB
                    </label>
                    <FormInput
                      name="BirthDate"
                      placeholder="DD-MM-YYYY "
                      required={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <label className="text-[16px] font-normal pb-[16px]">
                      Assembly
                    </label>
                    <DropdownSelect
                      name={"Assembly"}
                      placeholder="Assembly"
                      options={["Inoore1", "Inoore2", "Inoore3"]}
                      required={false}
                    />{" "}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <label className="text-[16px] font-normal pb-[16px]">
                      Address
                    </label>
                    <FormInput
                      name="address"
                      placeholder="Address"
                      required={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <label className="text-[16px] font-normal pb-[16px]">
                      State
                    </label>
                    <DropdownSelect
                      name={"state"}
                      placeholder="State"
                      options={["Madhya Pradesh", "Punjab", "Gujrat"]}
                      required={false}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item>
                    <label className="text-[16px] font-normal pb-[16px]">
                      Party Name
                    </label>
                    <DropdownSelect
                      name={"partyName"}
                      placeholder="Party Name"
                      options={["BJP", "BJP", "BJP"]}
                      required={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <label className="text-[16px] font-normal pb-[16px]">
                      Last Designation/Role
                    </label>
                    <DropdownSelect
                      name={"lastDesignation"}
                      placeholder="Important Voter"
                      options={["MLA", "MP", "Ward Member"]}
                      required={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={14}>
                  <Form.Item
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please provide a description!",
                        whitespace: true,
                      },
                    ]}
                    className=" max-w-[680px] w-[100%]"
                  >
                    <label className="text-[16px] font-normal mt-[20px]">
                      About US
                    </label>
                    <Input.TextArea
                      rows={4}
                      placeholder="About Details"
                      name="aboutMessage"
                      style={{
                        background: "#f9f9f9",
                        borderRadius: "5px",
                        padding: "10px",
                        fontSize: "14px",
                        color: "#000",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="photos" className="mb-1 image-upload">
                    <label className="text-[16px] font-normal mb-[20px]">
                      Image Upload
                    </label>
                    <div className="flex justify-between gap-[50px]">
                      <Upload
                        className="max-w-[140px] h-[110px]"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={handleUpload}
                        onChange={handleUpload}
                      >
                        <UploadIcon />
                      </Upload>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <h4
              className="text-[18px] font-semibold mb-[5px] text-[#54408C] mt-[10px]"
              style={{ marginBottom: "10px" }}
            >
              Settings
            </h4>
            <Row
              gutter={[16, 16]}
              className="bg-[#EEEEEE63] rounded-[5px] px-[15px] py-[20px]"
            >
              <Col span={8}>
                <div className="flex gap-[50px] items-center mb-[10px]">
                  <div className="settings ">
                    <Switch />
                  </div>
                  <label className="text-[20px] font-semibold items-center">
                    Slip Settings{" "}
                  </label>
                </div>
                <div className="flex gap-[50px] items-center mb-[10px]">
                  <div className="settings ">
                    <Switch />
                  </div>
                  <label className="text-[20px] font-semibold items-center">
                    Wnpm ith Candidate Image
                  </label>
                </div>
                <div className="flex gap-[50px] items-center mb-[10px]">
                  <div className="settings ">
                    <Switch />
                  </div>
                  <label className="text-[20px] font-semibold items-center">
                    Slip Settings{" "}
                  </label>
                </div>
                <div className="flex gap-[50px] items-center mb-[10px]">
                  <div className="settings ">
                    <Switch />
                  </div>
                  <label className="text-[20px] font-semibold items-center">
                    Slip Settings{" "}
                  </label>
                </div>
              </Col>
            </Row>
              <Form.Item className="">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="sigin-btn text-[16px] font-[500] h-[48px] bg-[#54408C] max-w-[200px] mt-[30px]"
                  style={{ width: "100%" }}
                  loading={loading}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#432C6A")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#54408C")
                  }
                >
                  Save All Details
                </Button>
              </Form.Item>
              
            </Form>
            
          </div>
        </Row>
      </Container>
    </DisplayProfileComponent>
  );
};

export default ClientEditProfile;
