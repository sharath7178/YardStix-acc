import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const SecuredRoute = props => {
  const access_token = localStorage.getItem("access_token", false);
  localStorage.setItem("loggedIn", access_token ? true : false);
  // console.log("access_token", access_token);
  return (
    <Route
      path={props.path}
      render={data =>
        localStorage.getItem("loggedIn") === "true" ? (
          <props.component {...data}> </props.component>
        ) : (
          <Redirect to={{ pathname: "/Yardstix/login" }}></Redirect>
        )
      }
    ></Route>
  );
};

const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { loggedIn } = preparedFinalObject;
  return { loggedIn };
};
export default connect(mapStateToProps, null)(SecuredRoute);
