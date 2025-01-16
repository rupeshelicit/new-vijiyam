import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import routes, { LoginRoute, DashboardRoute } from "./routes/routes";
import PrivateLayout from "Component/layout/PrivateLayout/index";
import PublicLayout from "Component/layout/PublicLayout/index";
import { MetadataProvider } from "context/metadata";

const CustomRoute = ({ component: Component, restricted, roleId }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("_role");

  useEffect(() => {
    if (restricted && !token) {
      navigate(LoginRoute.path); // Redirect to login if restricted and no token
    } else if (!restricted && token) {
      navigate(DashboardRoute.path); // Redirect to dashboard if not restricted and token exists
    }
  }, [restricted, token, navigate]); // Add all necessary dependencies

  if (restricted) {
    return (
      <PrivateLayout>
        {roleId?.includes(role) ? (
          <Component />
        ) : (
          <div>Unauthorized Access</div>
        )}
      </PrivateLayout>
    );
  } else {
    return (
      <PublicLayout>
        <Component />
      </PublicLayout>
    );
  }
};

function Routing() {
  return (
    <MetadataProvider>
      <Routes>
        {routes.map((route, index) => {
          const { component, restricted, path, roleId, subRoutes } = route;

          if (subRoutes) {
            // Handle nested routes
            return (
              <Route key={index} path={path} element={<PrivateLayout />}>
                {subRoutes.map((subRoute, subIndex) => (
                  <Route
                    key={subIndex}
                    path={subRoute.path}
                    element={
                      <CustomRoute
                        roleId={roleId}
                        component={subRoute.component}
                        restricted={restricted}
                      />
                    }
                  />
                ))}
              </Route>
            );
          }

          // Handle standalone routes
          return (
            <Route
              key={index}
              path={path}
              element={
                <CustomRoute
                  roleId={roleId}
                  component={component}
                  restricted={restricted}
                />
              }
            />
          );
        })}
      </Routes>
    </MetadataProvider>
  );
}

export default Routing;
