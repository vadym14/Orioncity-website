import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import { ToastContainer } from "react-toastify";

// action
import { getProfileApi } from "../stores/reducers/userSlice";

// routes config
import { routes } from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (!user) {
      dispatch(getProfileApi());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && user.role && user.role !== "admin") {
      history.push("/");
    }
  }, [user, history]);

  return (
    <main className="c-main">
      <ToastContainer />

      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes &&
              routes.length > 0 &&
              routes.map((route, idx) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <CFade>
                          <route.component {...props} />
                        </CFade>
                      )}
                    />
                  )
                );
              })}
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
