import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Snackbar from "./ui-containers/SnackBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { mapDispatchToProps } from "./ui-utils/commons";
import MainRoutes from "./ui-routes/MainRoutes";
import { connect } from "react-redux";
import "./App.css";
import { httpRequest } from "./ui-utils/api";
import LoadingOverlay from "react-loading-overlay";

const App = props => {
  const { userInfo } = props;
  const [loader, setLoader] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hasAccess_token =
    window.location.href.includes("access_token") || false;

  console.log("access token", hasAccess_token);
  console.log("setDrawerOpen", drawerOpen);

  useEffect(() => {
    if (hasAccess_token) {
      let tempLocation = window.location.href.split("&")?.[0].split("=") || "";
      localStorage.setItem("access_token", tempLocation[1]);
      getAuthInfo(tempLocation[1]);
    }
  }, [hasAccess_token]);

  const getAuthInfo = async access_token => {
    setLoader(true);
    try {
      await httpRequest({
        endPoint: "api/Account/UserInfo",
        method: "get",
        instance: "instanceOne",
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then(response => {
        console.log("userInfo", response);
        if (response?.isregistered === true) {
          localStorage.setItem("validityResponse", JSON.stringify(response));
          props.setAppData("userInfo", response);
          setLoader(false);
          props.history.push("/Yardstix/user-home");
        } else {
          setLoader(false);
          props.setAppData("userInfo", response);
          props.history.push("/Yardstix/login");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  console.log("setDraw", drawerOpen);

  return (
    <LoadingOverlay
      spinner={<CircularProgress />}
      styles={{
        overlay: base => ({
          ...base,
          backgroundColor: "rgba(0, 0, 0, 0.16)",
          backdropFilter: "blur(2px)"
        })
      }}
      active={loader}
    >
      <div>
        <MainRoutes />
        <Snackbar />
      </div>
    </LoadingOverlay>
  );
};

const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { spinner = false, userInfo, menuList = [] } = preparedFinalObject;
  return { spinner, userInfo, menuList };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
