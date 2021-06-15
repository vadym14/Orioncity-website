/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect } from "react";
import "./index.scss";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  // Redirect,
  Route,
  Switch,
  // useRouteMatch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CContainer } from "@coreui/react";

import { TheSidebar, TheHeader, TheFooter, TheAside } from "../../../templates";

// import { adminRoutes } from "../../../routes";

import Dashboard from "../Dashboard";
import Users from "../Users";

// action
import { getProfileApi } from "../../../stores/reducers/userSlice";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const AdminDashboard = (props) => {
  const darkMode = useSelector((state) => state.darkMode);
  const classes = classNames(
    "c-app c-default-layout",
    darkMode && "c-dark-theme"
  );
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (!user) {
      dispatch(getProfileApi());
    }
  }, [dispatch]);

  return (
    <div className={classes}>
      <ToastContainer />

      <TheSidebar />
      <TheAside />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          {/* <TheContent/> */}
          <main className="c-main">
            <CContainer fluid>
              <Suspense fallback={loading}>
                <Switch>
                  <Route path="/users" component={Users} exact={false} />
                  <Route path="/" component={Dashboard} exact={false} />
                </Switch>
              </Suspense>
            </CContainer>
          </main>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default AdminDashboard;

// export default React.memo(AdminDashboard);
