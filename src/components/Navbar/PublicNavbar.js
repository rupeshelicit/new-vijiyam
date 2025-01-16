import React, { useState } from "react";
import { PublicHeader, Container } from "styles/components/common/Navbar";
import WrightLogo from "assets/svg/wright_logo.svg";
import SearchIcon from "assets/images/search-icon.png";
import LoginShortcut from "pages/common/Login/loginShortcut";

const PublicNavbar = () => {
  const [loginShort, setLoginShort] = useState(false);

  const openLogin = () => {
    setLoginShort(true);
  };
  return (
    <PublicHeader>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <img src={WrightLogo} />
          </div>
          <div
            className="search-box"
            style={{ display: "flex", padding: "25px 0" }}
          >
            <span
              className="login"
              style={{ cursor: "pointer" }}
              onClick={openLogin}
            >
              Log in
            </span>
            <div className="search-feild">
              <span className="search-icons">
                <img src={SearchIcon} />
              </span>

              <input type="text" placeholder="Search" />
            </div>
          </div>
        </div>
        <LoginShortcut open={loginShort} setOpen={setLoginShort} />
      </Container>
    </PublicHeader>
  );
};

export default PublicNavbar;
