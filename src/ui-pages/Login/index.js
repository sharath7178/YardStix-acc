import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { mapDispatchToProps } from "../../ui-utils/commons";
import { connect } from "react-redux";
import { Hidden, Typography, Grid, Button } from "@material-ui/core";
import logoImage from "../../ui-assets/images/logoYardstix.svg";
import rectangle from "../../ui-assets/images/rectangleImage.svg";
import arrow from "../../ui-assets/images/forwardArrow.svg";
import windows from "../../ui-assets/images/windows.svg";
import { httpRequest } from "ui-utils";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    height: "100vh",
    background: "#F8F8F8",
    width: "100%"
  },

  //desktop
  dashboardRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },

  // mobile view
  mobileRoot: {
    padding: 34
  },
  logoImageStyle: {
    display: "flex",
    justifyContent: "center",
    padding: "60px 0px",
    "@media only screen and (min-height:400px) and (max-height:630px)": {
      padding: "20px 0px"
    }
  },
  logoMobiimg: {
    "@media only screen and (min-width:250px) and (max-width:320px)": {
      height: "60px"
    }
  },
  loginheader: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 16,
    padding: "20px 0px",
    color: "#400505",
    "@media only screen and (min-width:200px) and (max-width:300px)": {
      fontSize: 12
    },
    "@media only screen and (min-width:300px) and (max-width:420px)": {
      fontSize: 14
    },
    "@media only screen and (min-height:400px) and (max-height:600px)": {
      padding: "10px 0px"
    }
  },
  loginPinkCard: {
    display: "flex",
    border: "2px solid #FFD6D6",
    background: "#FFD6D6",
    borderRadius: 10,
    justifyContent: "space-between",
    padding: 10
  },
  rectangleImage: {
    height: 30,
    "@media only screen and (min-width:250px) and (max-width:300px)": {
      height: 25
    },
    "@media only screen and (min-width:300px) and (max-width:350px)": {
      height: 25
    }
  },
  textStyle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 17,
    color: "#400505",
    "@media only screen and (min-width:200px) and (max-width:300px)": {
      fontSize: 10
    },
    "@media only screen and (min-width:300px) and (max-width:420px)": {
      fontSize: 13
    }
  },
  heighlightText: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "500",
    color: "#DE0A0A",
    display: "contents",
    "@media only screen and (min-width:200px) and (max-width:330px)": {
      fontSize: 12
    },
    "@media only screen and (min-width:330px) and (max-width:420px)": {
      fontSize: 15
    }
  },
  loginButton: {
    display: "flex",
    border: "2px solid #820505",
    borderRadius: 10,
    margin: "20px 0px 100px 0px",
    "@media only screen and (min-height:400px) and (max-height:650px)": {
      margin: "20px 0px 40px 0px"
    }
  },
  microsoftText: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "#400505",
    display: "contents",
    fontFamily: "Montserrat",
    "@media only screen and (min-width:250px) and (max-width:315px)": {
      fontSize: 10
    },
    "@media only screen and (min-width:315px) and (max-width:350px)": {
      fontSize: 12
    },
    "@media only screen and (min-width:350px) and (max-width:420px)": {
      fontSize: 14
    }
  },
  microsoftAnotherText: {
    fontSize: "16px",
    fontWeight: "400",
    color: "#400505",
    fontFamily: "Montserrat",
    "@media only screen and (min-width:250px) and (max-width:300px)": {
      fontSize: 6
    },
    "@media only screen and (min-width:300px) and (max-width:350px)": {
      fontSize: 10
    },
    "@media only screen and (min-width:350px) and (max-width:420px)": {
      fontSize: 14
    }
  },
  windowsImage: {
    height: "40px",
    "@media only screen and (min-width:250px) and (max-width:300px)": {
      height: 30
    },
    "@media only screen and (min-width:300px) and (max-width:350px)": {
      height: 35
    }
  },

  contactButton: {
    color: "#DE0A0A",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "20px",
    fontFamily: "Montserrat",
    "@media only screen and (min-width:250px) and (max-width:330px)": {
      fontSize: "14px"
    },
    "@media only screen and (min-width:330px) and (max-width:420px)": {
      fontSize: "15px"
    }
  },
  failCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "linear-gradient(262.14deg, #D22222 -4.5%, #820505 91.48%)",
    borderRadius: "0px 0px 30px 30px",
    flexFlow: "column",
    padding: "20px",
    background: "linear-gradient(31.62deg, #D22222 0%, #820505 100%)",
    color: "#fff"
  },
  failText: {
    fontFamily: "Montserrat",
    fontSize: "30px",
    fontWeight: 700,
    padding: "20px"
  },
  failDes: {
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: 700,
    padding: "20px",
    display: "flex",
    textAlign: "center"
  },

  paper: {
    borderRadius: "0px 0px 30px 30px"
  }
};

class Login extends React.Component {
  state = {
    top: false
  };

  componentDidMount = () => {
    if (this.props.userInfo?.isregistered === false) {
      this.setState({ top: true });
    }
  };

  toggleDrawer = value => {
    this.setState({ top: value });
  };

  loginHandler = async () => {
    // debugger;
    try {
      await httpRequest({
        endPoint: `api/Account/ExternalLogins?returnUrl=https://projects.nimble.expert/YardStixApiAcc/&generateState=${true}`,
        method: "get",
        instance: "instanceOne"
      }).then(response => {
        console.log("res", response);
        if (response?.length > 0) {
          let url = response[0]?.Url;

          this.setState({ login: response[0] });
          url = url.replace(
            "https%3A%2F%2Fprojects.nimble.expert%2FYardStixApiAcc%2F",
            window.origin + "/" + "Yardstix" + "/"
          );
          window.location.href = "https://projects.nimble.expert" + url;
        }
      });
    } catch (e) {
      console.log({ e });
    }
  };

  render() {
    const { classes, userInfo } = this.props;

    console.log("users ", userInfo);
    return (
      <div className={classes.root}>
        <Hidden only={"xs"}>
          <div className={classes.dashboardRoot}>dashboard</div>
        </Hidden>
        <Hidden only={["lg", "md", "xl", "sm"]}>
          <div className={classes.mobileRoot}>
            <Drawer
              classes={{ paper: classes.paper }}
              anchor="top"
              open={this.state.top}
              onClose={() => this.toggleDrawer(false)}
            >
              <div
                className={classes.failCard}
                // tabIndex={0}
                // role="button"
                onClick={() => this.toggleDrawer(false)}
                onKeyDown={() => this.toggleDrawer(false)}
              >
                <Typography className={classes.failText}>
                  Login failed
                </Typography>
                <Typography className={classes.failDes}>
                  Sorry, the email address you used to login is not registered.
                  Please try again or get in contact
                </Typography>
              </div>
            </Drawer>
            <div className={classes.logoImageStyle}>
              <img className={classes.logoMobiimg} src={logoImage} alt="logo" />
            </div>
            <div>
              <Typography className={classes.loginheader}>
                Login to the Yardstix platform
              </Typography>
            </div>

            <div className={classes.loginPinkCard}>
              <Grid
                container
                style={{ display: "flex", paddingRight: "5px", gap: "10px" }}
              >
                <Grid item xs={1} alignItems="baseline" justifyContent="center">
                  <img
                    className={classes.rectangleImage}
                    src={rectangle}
                    alt="rectangle"
                  ></img>
                </Grid>
                <Grid item xs={10}>
                  <Typography className={classes.textStyle}>
                    Yardstix is only allows for access by{" "}
                    <p className={classes.heighlightText}>
                      Microsoft Authentication
                    </p>{" "}
                    to guarantee optimal security and user experience to help
                    you measure your success
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.loginButton} onClick={this.loginHandler}>
              <Grid
                container
                style={{ padding: "10px" }}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={2} style={{ display: "flex" }}>
                  <img
                    className={classes.windowsImage}
                    src={windows}
                    alt="windows"
                  ></img>
                </Grid>
                <Grid item xs={9}>
                  <Typography>
                    <Typography className={classes.microsoftText}>
                      Microsoft authentication
                    </Typography>
                    <Typography className={classes.microsoftAnotherText}>
                      Login simple and secure
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={1} style={{ display: "flex" }}>
                  <div>
                    <img className={classes.logoMobi} src={arrow} alt="arrow" />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div>
              <Typography className={classes.contactButton}>
                Don’t have an account? Get in contact...
              </Typography>
            </div>
          </div>
        </Hidden>
      </div>
    );
  }
}

const mapStateToProps = ({ screenConfiguration = {} }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { login = {}, userInfo = {} } = preparedFinalObject;
  return { login, userInfo };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
