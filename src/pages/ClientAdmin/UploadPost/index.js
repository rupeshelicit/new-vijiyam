import React, { useState } from "react";
import { Button, Col, Input, Row, Upload, Form, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import userProfileImg from "assets/images/userimage.png";
import backgroundImg from "assets/images/profile-background.png";
import { Container } from "styles/components/common/Layout";
import { UploadPostContainer } from "styles/pages/ClientAdmin/UploadPost";
import { useNavigate } from "react-router-dom";
import BackArrow from "assets/svg/backArrow";

const HeaderSection = ({ userProfile, background }) => (
  <div
    className="header w-[100%] relative bg-blend-overlay bg-cover bg-center h-[100px] flex items-center p-[10px]"
    style={{ backgroundImage: `url(${background})` }}
  >
    <div className="user-details flex items-center gap-5 absolute top-[60px] left-[25px]">
      <div className="img rounded-[50%]">
        <img
          src={userProfile}
          alt="profile-img"
          width={"85px"}
          height={"85px"}
        />
      </div>
      <div className="name-email">
        <strong className="text-[20px] font-medium">Alexa Rawles</strong>
        <p className="text-[16px] font-normal text-[#606060]">
          alexarawles@gmail.com
        </p>
      </div>
    </div>
  </div>
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

const UploadPost = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [form] = Form.useForm();
  const nevigate = useNavigate();
  console.log(imageUrls, "imageUrls");
  const handleUpload = (info) => {
    const files = Array.from(info.fileList);

    if (!files.length) {
      message.error("No files selected. Please try again.");
      return false;
    }

    const invalidFiles = files.filter(
      (file) => !file.type?.startsWith("image/")
    );
    if (invalidFiles.length) {
      message.error("Only image files are allowed!");
      return false;
    }

    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({
              id: Date.now() + Math.random(),
              url: reader.result,
              file: file.originFileObj,
            });
          reader.onerror = reject;
          reader.readAsDataURL(file.originFileObj);
        });
      })
    )
      .then((newImages) => {
        setImageUrls(newImages);
        form.setFieldValue("photos", [...imageUrls, ...newImages]);
        form.validateFields(["photos"]);
        message.success(`${files.length} images uploaded successfully!`);
      })
      .catch(() => {
        message.error("Error reading files. Please try again.");
      });

    return false;
  };

  const handleDelete = (id) => {
    setImageUrls((prev) => prev.filter((img) => img.id !== id));
    const updatedImages = imageUrls.filter((img) => img.id !== id);
    form.setFieldValue("photos", updatedImages);
    message.success("Image removed successfully!");
  };

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
    <UploadPostContainer>
      <Container>
        <h3 className="text-[22px] font-semibold mb-[20px] mt-[20px]">
          Upload Post
        </h3>
        <div
          onClick={() => nevigate("/")}
          className="flex gap-[5px] cursor-pointer mb-[20px]"
        >
          <span>
            <BackArrow />
          </span>
          <b className="text-[14px] font-medium">Back</b>
        </div>
        <Row className="form-section rounded-[15px] [box-shadow:0px_4px_4px_0px_#00000040]">
          <HeaderSection
            userProfile={userProfileImg}
            background={backgroundImg}
          />

          <Form
            form={form}
            name="uploadPostForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="pt-[75px] pr-[0] pb-[20px] pl-[45px]"
            style={{ width: "70%" }}
          >
            <Form.Item
              name="photos"
              rules={[
                {
                  required: true,
                  message: "Please upload at least one photo!",
                  validator: (_, value) => {
                    if (!imageUrls.length) {
                      return Promise.reject(
                        "Please upload at least one photo!"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              className="mb-1"
            >
              <div>
                <div className="text-[16px] font-normal pb-[16px]">
                  Add Photos
                </div>
                <div className="flex justify-between gap-[50px]">
                  <Upload
                    multiple
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={handleUpload}
                    onChange={handleUpload}
                  >
                    <UploadIcon />
                  </Upload>
                  {imageUrls.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-4">
                      {imageUrls.map((img) => (
                        <div key={img.id} className="relative">
                          <img
                            src={img.url}
                            alt="preview"
                            className="w-[150px] h-[150px] object-cover rounded-[8px]"
                          />

                          <Button
                            type="text"
                            icon={<DeleteOutlined style={{ color: "red" }} />}
                            className="absolute top-1 right-1 bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(img.id);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Form.Item>

            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please provide a description!",
                  whitespace: true,
                },
              ]}
              className="mb-10"
            >
              <div>
                <div className="text-[16px] font-normal pb-[16px]">
                  Description
                </div>
                <Input.TextArea
                  rows={4}
                  placeholder="Description"
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="sigin-btn text-[16px] font-[700] h-[48px] bg-[#54408C] max-w-[200px]"
                style={{ width: "100%" }}
                loading={loading}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#432C6A")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#54408C")
                }
              >
                {loading ? "Uploading..." : "Upload Post"}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Container>
    </UploadPostContainer>
  );
};

export default UploadPost;
