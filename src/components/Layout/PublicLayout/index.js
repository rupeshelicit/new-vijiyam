import React, { useState } from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";


const { Content } = Layout;

const PublicLayout = ({ children }) => {
 
  const [userDetails, setUserDetails] = useState({});

  const childrenToRender = React.Children.toArray(children);

  return (
    <div style={{ overflow: "hidden" }}>
      <Layout className="handle-sidebar">
        <Layout className="layout-composition" style={{ minHeight: "100vh" }}>
          <Content
            className="mob-layout"
            style={{
              overflow: "auto",
              padding: 0,
              minHeight: 280,
              background: "#fff",
            }}
          >
            {childrenToRender.map((child) =>
              React.cloneElement(child, {
                userDetails,
                setUserDetails,
              })
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

PublicLayout.prototype = {
  collapsed: PropTypes.bool.isRequired,
};
export default PublicLayout;
