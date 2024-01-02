import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "./routes";
import { CSpinner, useColorModes } from "@coreui/react";
import "./scss/style.scss";
import "devextreme/dist/css/dx.light.css";
import ErrorBoundary from "./components/ErrorComponent";

// Containers
const Home = React.lazy(() => import("./layout/home/Index"));
const DashboardHome = React.lazy(
  () => import("./dashboard/pages/DashboardHome")
);
// Pages
const Login = React.lazy(() => import("./layout/Login"));
// const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import("./layout/Page404"));
const Page500 = React.lazy(() => import("./layout/Page500"));

const RegisterUser = React.lazy(() => import("./dashboard/pages/auth/RegisterUser"));
const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes(
    "coreui-free-react-admin-template-theme"
  );
  const storedTheme = useSelector((state) => state.theme);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const theme =
      urlParams.get("theme") &&
      urlParams.get("theme").match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            <Route path="/" name="Home" element={<Home />} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              exact
              path="/dashboardhome"
              name="Dashboard Home"
              element={<DashboardHome />}
            >
              <Route exact path="/dashboardhome/register" name="register" element={<RegisterUser />} />
              {routes.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<route.element />}
                    />
                  )
                );
              })}
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
