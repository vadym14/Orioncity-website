import React, { Component } from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./templates/TheLayout"));

// Email App
const TheEmailApp = React.lazy(() => import("./views/apps/email/TheEmailApp"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

// clients
const MainPage = React.lazy(() => import("./containers/clients/Main"));

// admin
const AdminMain = React.lazy(() => import("./containers/admin/Main"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            {/* templates pages */}
            <Route
              exact
              path="/admin/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/admin/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/admin/apps/email"
              name="Email App"
              render={(props) => <TheEmailApp {...props} />}
            />
            <Route
              path="/admin"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />

            {/* admin pages */}
            <Route
              exact={true}
              path="/super-admin"
              name="Admin Dashboard"
              render={(props) => <AdminMain {...props} />}
            />

            {/* clients pages */}
            <Route
              path="/"
              name="Main"
              render={(props) => <MainPage {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
