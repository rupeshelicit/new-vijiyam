import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useIsFetching, useIsMutating } from "react-query";
import { Spin } from "antd";

import useLoader, { LoaderProvider } from "context/loader";
import routes from "constants/routes";
import PrivateLayout from "components/Layout/PrivateLayout";
import PublicLayout from "components/Layout/PublicLayout";
import { MetaDataProvider } from "context/metaData";

export const RenderRoutes = () => {
  const accountType = localStorage.getItem("account_type");
  const accessToken = localStorage.getItem("token");
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const { loader, setLoader } = useLoader();

  useEffect(() => {
    if (isFetching || isMutating) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [isFetching, isMutating]);

  if (accessToken) {
    return (
      <Routes>
        {routes[accountType].map((route, index) => {
          const { component: Component, path, roleId } = route;
          return (
            <Route
              key={index}
              path={path}
              roleId={roleId}
              element={
                <>
                  <Spin
                    className={`${loader && "custom-loader"}`}
                    size="large"
                    spinning={loader}
                  >
                  <PrivateLayout>
                    <Component />
                    </PrivateLayout>
                    </Spin>
                </>
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        {routes["UN_AUTH_ROUTES"].map((route, index) => {
          const { component: Component, path, roleId } = route;
          return (
            <Route
              key={index}
              path={path}
              roleId={roleId}
              element={
                <PublicLayout>
                  <Spin
                    className={`${loader && "custom-loader"}`}
                    size="large"
                    spinning={loader}
                  ></Spin>
                  <Component />
                </PublicLayout>
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
};

const AppRoutes = () => {
  return (
    <LoaderProvider>
      <MetaDataProvider>
        {/* <Routing /> */}
        <RenderRoutes />
      </MetaDataProvider>
    </LoaderProvider>
  );
};

export default AppRoutes;
