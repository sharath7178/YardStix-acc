import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "react-table/react-table.css";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
import { Hidden, Typography, Grid, Button, Drawer } from "@material-ui/core";
import logoImage from "../../../../../ui-assets/images/logoYardstix.svg";
import { httpRequest } from "../../../../../ui-utils/api";

const styles = theme => ({
  root: {
    height: "100vh",
    background: "#F8F8F8",
    width: "100%"
  },

  //desktop

  dashboardRoot: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Montserrat"
  },
  welcomtext: {
    fontFamily: "Montserrat",
    fontSize: 20,
    fontWeight: 400
  },
  infoText: {
    fontFamily: "Montserrat",
    fontSize: 20,
    fontWeight: 400,
    width: "50%",
    textAlign: "center"
  },
  highlightText: {
    fontFamily: "Montserrat",
    fontSize: 20,
    fontWeight: 700
  },

  //mobile view
  mobileRoot: {
    padding: "34px"
  },
  logoImageStyle: {
    display: "flex",
    justifyContent: "center",
    padding: "120px 0px !important",
    "@media only screen and (min-width:250px) and (max-width:350px)": {
      padding: "60px 0px !important"
    },
    "@media only screen and (min-height:550px) and (max-height:600px)": {
      padding: "60px 0px"
    }
    // "@media only screen and (min-width:250px) and (max-width:300px)": {
    //   fontSize: "12px"
    // },
  },
  logoMobiimg: {
    "@media only screen and (min-width:50px) and (max-width:600px)": {
      width: "100%"
    },
    "@media only screen and (min-height:700px) and (max-height:1000px)": {
      height: "unset"
    }
  },
  redCard: {
    background: "linear-gradient(to right, #820505 40%,#D22222  100%)",
    borderRadius: 10,
    padding: "20px",
    display: "flow-root",
    textAlign: "unset",
    width: "100%"
  },

  whiteCard: {
    background: "#9B9B9B",
    borderRadius: 10,
    padding: "20px"
  },

  openText: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: "Montserrat",
    color: "#fff",
    display: "flex",
    flexFlow: "row",
    alignItems: "start"
    // "@media only screen and (min-width:250px) and (max-width:300px)": {
    //   fontSize: "20px"
    // },
  },
  openText2: {
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Montserrat",
    color: "#fff",
    display: "flex",
    flexFlow: "row",
    alignItems: "start",
    textTransform: "lowercase"
    // "@media only screen and (min-width:250px) and (max-width:300px)": {
    //   fontSize: "12px"
    // },
  },
  suggestionText: {
    padding: "50px 0px",
    fontSize: 16,
    lineHeight: "24px",
    fontFamily: "Montserrat",
    fontWeight: 400
  },
  buttonStyle: {
    color: "#D22222",
    fontSize: 16,
    lineHeight: "24px",
    fontFamily: "Montserrat",
    fontWeight: 400,
    textTransform: "unset",
    padding: 0
  },
  failCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "linear-gradient(262.14deg, #D22222 -4.5%, #820505 91.48%)",
    borderRadius: "0px 0px 30px 30px",
    flexFlow: "column",
    padding: "20px",
    background: "linear-gradient(31.62deg, #299F16 0%, #8BFF78 100%)",
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
});

const Dashboard = props => {
  const {
    classes,
    userInfo,
    openSurvey,
    history,
    isSurveyCompleted,
    spinner
  } = props;
  console.log("user", userInfo);
  console.log("open survy", openSurvey);

  const [openSurveyDetails, setOpenSurveydetails] = useState([]);
  const [surveyList, setSurveyList] = useState(0);
  const [surveyName, setSurveyName] = useState("" || null);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  console.log("surveyLi", surveyList.surveyList);
  console.log("isSurvey", props.isSurveyCompleted);
  console.log("surveyComplete", spinner);
  console.log("pre", props.preparedFinalObject);

  console.log(surveyName);
  useEffect(() => {
    let surveyComplet = localStorage.getItem("isSurveyCompleted");
    if (surveyComplet === true) {
      toggleDrawer(surveyComplet);
    }
    localStorage.setItem("isSurveyCompleted", false);
  }, []);

  const toggleDrawer = value => {
    setSurveyCompleted(value);
  };

  useEffect(() => {
    if (userInfo?.UserId) {
      getOpenSurvey(userInfo.UserId);
    }
  }, [userInfo]);

  const openSurveyHandler = () => {
    if (openSurvey) {
      getQuestionHandler(openSurvey[0]?.userId, openSurvey[0]?.surveyId);
    }
    history.push("./user-home/questionComponent");
  };

  const onClickHandler = () => {
    const { history } = props;
    history.push("./user-home/feedback");
  };

  const getQuestionHandler = async (uid, sid) => {
    try {
      await httpRequest({
        endPoint: `api/v1/user/questions?userId=${uid}&questionId=${0}&surveyId=${sid}`,
        method: "get",
        instance: "instanceOne",
        contentType: "application/json",
        authReqd: true
      }).then(response => {
        console.log(response);
        localStorage.setItem("question1_data", JSON.stringify(response));
        props.setAppData("dashboard.question1_data", response);
      });
    } catch (e) {
      console.log(e);
    }
    // history.push("./user-home/question1");
  };

  const getOpenSurvey = async id => {
    try {
      await httpRequest({
        endPoint: `api/v1/user/allOpenSurveys?userId=${id}`,
        method: "get",
        instance: "instanceOne",
        contentType: "application/json",
        authReqd: true
      }).then(response => {
        console.log(response);
        localStorage.setItem("openSurvey", JSON.stringify(response));
        props.setAppData("dashboard.openSurvey", response);
        setSurveyName(response[0].surveyName || "");
        setOpenSurveydetails({ openSurveyDetails: response });
        let Tempdata = response.filter(item => !item._Finalized).length;
        setSurveyList({ surveyList: Tempdata });
        console.log("survey ", Tempdata);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.root}>
      <Hidden only={"xs"}>
        <div className={classes.dashboardRoot}>
          <Typography className={classes.welcomtext}>Welcome to</Typography>
          <img className={classes.logoMobiimg} src={logoImage} alt="logo" />
          <Typography className={classes.infoText}>
            Currently we help you measure your success in transforming only
            through your mobile device.{" "}
            <a className={classes.highlightText}> Quick and simple! </a>
          </Typography>
        </div>
      </Hidden>
      <Hidden only={["lg", "md", "xl", "sm"]}>
        <div className={classes.mobileRoot}>
          <Drawer
            classes={{ paper: classes.paper }}
            anchor="top"
            open={surveyCompleted}
            onClose={() => toggleDrawer(false)}
          >
            <div
              className={classes.failCard}
              onClick={() => toggleDrawer(false)}
              onKeyDown={() => toggleDrawer(false)}
            >
              <Typography className={classes.failText}>
                Stix finalized
              </Typography>
              <Typography className={classes.failDes}>
                Thank you for participation in the Change Readiness Stix!
              </Typography>
            </div>
          </Drawer>
          <div className={classes.logoImageStyle}>
            <img className={classes.logoMobiimg} src={logoImage} alt="logo" />
          </div>
          {openSurveyDetails.length === 0 ? (
            <div className={classes.whiteCard}>
              <Typography className={classes.openText}>No open Stix</Typography>
              <Typography className={classes.openText2}>
                {" "}
                Good luck transforming your organization! There are no new Stix
                planned for you yet...!
              </Typography>
            </div>
          ) : (
            <Button className={classes.redCard} onClick={openSurveyHandler}>
              <Typography className={classes.openText}>
                {" "}
                {surveyList.surveyList} open Stix
              </Typography>
              <Typography className={classes.openText2}>
                {" "}
                The weekly {surveyName} is ready for you!
              </Typography>
            </Button>
          )}

          <Typography className={classes.suggestionText}>
            We are continuously adding new functionalities to your personal
            Yardstix space! If you have suggestions please{" "}
            <a className={classes.buttonStyle} onClick={() => onClickHandler()}>
              click here...
            </a>
          </Typography>
        </div>
      </Hidden>
    </div>
  );
};

const mapStateToProps = ({ screenConfiguration = {} }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const {
    userInfo,
    dashboard,
    isSurveyCompleted,
    spinner
  } = preparedFinalObject;
  console.log("preparedFinalObject", preparedFinalObject);
  const { openSurvey } = dashboard || "";
  return {
    userInfo,
    openSurvey,
    isSurveyCompleted,
    spinner,
    preparedFinalObject
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
