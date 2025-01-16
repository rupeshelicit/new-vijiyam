import React, { useEffect, useState } from "react";
import { NavbarHeader, Container } from "styles/components/common/Navbar";
import profileImage from "assets/images/userimage.png";
import messageIcon from "assets/images/message-square.png";
import emailIcon from "assets/svg/emailIcon.svg";
import calendarIcon from "assets/svg/calenderIcon.svg";
import ratingIcon from "assets/svg/ratingIcon.svg";
import notificationIcon from "assets/svg/notification.svg";
import { Avatar, Button, Popover } from "antd";
import { EditOutlined } from "@ant-design/icons";

const MenuIcons = ({ icons }) => (
  <div className="menu-icons flex space-x-4 gap-[22px]">
    {icons.map((icon, index) => (
      <img
        key={index}
        src={icon}
        alt={`Icon-${index}`}
        className="icon"
        style={{ width: "18px", height: "18px" }}
      />
    ))}
  </div>
);

export default function PrivateNavbar() {
  const menuIcons = [messageIcon, emailIcon, calendarIcon, ratingIcon];
  const [userImage, setUserImage] = useState(profileImage);
  const [notifacion, setNotification] = useState(0);
  const [LoginUser, setLoginUser] = useState();

  useEffect(() => {
    setUserImage(profileImage);
    setNotification(1);

    const loginUsers = JSON.parse(localStorage.getItem("userDetails"));
    if (loginUsers && loginUsers.role === 5) {
      setLoginUser("Super Admin")
    } else if (loginUsers && loginUsers.role === 3) {
      setLoginUser("Client Admin")
    }
    else if (loginUsers && loginUsers.role === 4) {
      setLoginUser("Distributor Admin")
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const content = (
    <div className="user-profile-Modal">
      <div className="profile-iamge">
        {userImage.length > 0 ? (
          <span className="usericon">
            {" "}
            <img src={userImage} />
          </span>
        ) : (
          <Avatar size={70}>{MD}</Avatar>
        )}
        <div className="editicon">
          <Avatar size={25} style={{ backgroundColor: "#fff" }}>
            <EditOutlined style={{ color: "#000" }} />
          </Avatar>
          <input type="file" />
        </div>
      </div>
      <h3 className="userName">Hi, {LoginUser}</h3>
      <Button>Manage Your Account</Button>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
  return (
    <div className="px-4">
      <NavbarHeader>
        <Container>
          <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-[63px] float-right ">
              <div className="flex items-center space-x-6 relative">
                <span className="w-[20px] h-[20px] bg-[red] flex justify-center items-center text-[white] font-bold rounded-[50px] absolute top-[0] right-[160px]">
                  {notifacion}
                </span>
                <div className="notification-icon">
                  <img
                    src={notificationIcon}
                    alt="Notifications"
                    style={{ height: "20px", width: "20px" }}
                  />
                </div>

                <Popover
                  placement="bottom"
                  content={content}
                  trigger="click"
                  overlayClassName="custom-pophover"
                >
                  <span
                    style={{ cursor: "pointer" }}
                    className="flex gap-[15px] justify-center pr-[15px]"
                  >
                    <div>
                      <strong>{LoginUser}</strong>
                      <p className=" flex justify-left items-center gap-[5px]">
                        <span>
                          <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="2.5" cy="2.5" r="2.5" fill="#48F094" />
                          </svg>
                        </span>
                        Available
                      </p>
                    </div>
                    {userImage.length > 0 ? (
                      <span className="usericon">
                        {" "}
                        <img
                          src={userImage}
                          style={{ height: "30px", width: "30px" }}
                        />
                      </span>
                    ) : (
                      <Avatar size={30}>MD</Avatar>
                    )}
                  </span>
                </Popover>
              </div>
            </div>
          </nav>
        </Container>
      </NavbarHeader>
    </div>
  );
}
