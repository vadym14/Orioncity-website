/* eslint-disable no-unused-vars */
import React, { Suspense, useState } from "react";
import "./index.scss";

import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// routes
import { clientRoutes } from "../../../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Main = (props) => {
  const darkDefault = localStorage.getItem("darkMode");
  if (!darkDefault) {
    localStorage.setItem("darkMode", false);
  }

  const [isDarkMode, setDarkMode] = useState(JSON.parse(darkDefault) || false);

  return (
    <div className={`clientPage ${isDarkMode ? "darkTheme" : "whiteTheme"}`}>
      <ToastContainer />

      <Suspense fallback={loading}>
        <div className="contentCmp">
          <Switch>
            {clientRoutes &&
              clientRoutes.length > 0 &&
              clientRoutes.map((route, idx) => {
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
          </Switch>
        </div>
      </Suspense>
    </div>
  );
};

export default Main;
