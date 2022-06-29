import React from "react";
import { Route } from "react-router";
import Loadable from "react-loadable";
import Loading from "../ui-molecules/Loading";
import SecuredRoute from "./SecuredRoute";

const Login = Loadable({
  loader: () => import("../ui-pages/Login"),
  loading: Loading
});
// const Favicon = Loadable({
//   loader: () => import("public/favicon.ico"),
//   loading: Loading
// });
const UserHome = Loadable({
  loader: () => import("../ui-pages/UserHome"),
  loading: Loading
});

const MainRoutes = () => {
  return (
    <div>
      <Route exact path="/Yardstix" component={Login} />
      <Route path="/Yardstix/login" component={Login} />
      {/* <Route path = "/Yardstix/favicon.ico" component={Favicon} /> */}
      <SecuredRoute path="/Yardstix/user-home" component={UserHome} />
    </div>
  );
};

export default MainRoutes;
