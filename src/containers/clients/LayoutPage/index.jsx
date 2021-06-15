import React from "react";
import "./index.scss";
import { Switch, Route } from "react-router-dom";

import { homeRoutes } from "../../../routes";

// components
import HeaderPage from "../../../components/clients/Layouts/Header";
import FooterPage from "../../../components/clients/Layouts/Footer";

const ClientLayoutPage = (props) => {
  return (
    <>
      <HeaderPage />

      <Switch>
        {homeRoutes &&
          homeRoutes.length > 0 &&
          homeRoutes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => <route.component {...props} />}
                />
              )
            );
          })}
        {/* <Redirect from="/" to="/admin/dashboard" /> */}
      </Switch>

      <FooterPage />
    </>
  );
};

export default ClientLayoutPage;
