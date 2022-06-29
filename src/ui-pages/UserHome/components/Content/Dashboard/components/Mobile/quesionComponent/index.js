import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "react-table/react-table.css";
import { mapDispatchToProps } from "../../../../../../../../ui-utils/commons";
import { Typography, Grid, IconButton } from "@material-ui/core";
import logoImage from "../../../../../../../../ui-assets/images/logoYardstix.svg";
import back from "../../../../../../../../ui-assets/images/keyboardReturn.svg";
import check from "../../../../../../../../ui-assets/images/check.svg";
import "./index.css";
import { httpRequest } from "../../../../../../../../ui-utils/api";
import AnswerFormat1 from "./components/AnswerFormat1";
import AnswerFormat2 from "./components/AnswerFormat2";
import AnswerFormat3 from "./components/AnswerFormat3";
import AnswerFormat4 from "./components/AnswerFormat4";

const styles = theme => ({
  root: {
    height: "100vh",
    background: "#F8F8F8",
    width: "100%"
  },

  //desktop

  //mobile view
  mobileRoot: {
    padding: 34,
    "@media only screen and (min-height:600px) and (max-height:750px)": {
      padding: "30px"
    },
    "@media only screen and (min-height:500px) and (max-height:600px)": {
      padding: "25px"
    }
  },
  logoImageStyle: {
    display: "flex",
    justifyContent: "center",
    padding: "60px 0px",
    "@media only screen and (min-height:600px) and (max-height:750px)": {
      padding: "30px 0px"
    },
    "@media only screen and (min-height:500px) and (max-height:600px)": {
      padding: "20px 0px"
    }
  },
  logoMobiimg: {
    "@media only screen and (min-width:50px) and (max-width:600px)": {
      width: "100%"
    }
  },
  questionStyle: {
    color: "#400505",
    fontSize: 18,
    lineHeight: "24px",
    fontFamily: "Montserrat",
    fontWeight: 700
  },
  sliderDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px"
  },
  sliderRoot: {
    color: "#fff"
  },
  footerStyle: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    color: "white",
    textAlign: "center",
    height: "100px",
    boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.1)",
    "@media only screen and (min-height:600px) and (max-height:750px)": {
      height: "50px"
    },
    "@media only screen and (min-height:500px) and (max-height:600px)": {
      height: "40px"
    }
  },
  backImage: {
    color: "#9B9B9B",
    display: "flex",
    alignItems: "center"
  },
  backimg: {
    "@media only screen and (min-height:600px) and (max-height:750px)": {
      height: "30px"
    }
  },
  checkImage: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(31.62deg, #299F16 0%, #8BFF78 100%)",
    borderRadius: "10px 0px 0px 10px"
  },
  checkimg: {
    "@media only screen and (min-height:600px) and (max-height:750px)": {
      height: "30px"
    }
  }
});

class QuestionComponent extends React.Component {
  state = {
    next_question_id: 0,
    questions_object: [],
    // selected_ans: {},
    answers_array: [],
    maximum_ans: null,
    minimum_ans: null,
    ans_format_code: null,
    answer_select_value: {},
    selected_ans: null
  };

  handleAnswerChange = this.handleAnswerChange.bind(this);

  componentDidMount = () => {
    const { openSurvey } = this.props;
    if (openSurvey) {
      this.getQuestionHandler(
        openSurvey[0]?.userId,
        0,
        openSurvey[0]?.surveyId,
        openSurvey[0]?.userSurveyId
      );
    }
  };

  getQuestionHandler = async (uid, index, sid, usid) => {
    try {
      await httpRequest({
        endPoint: `api/v1/user/questions?userId=${uid}&questionId=${index}&surveyId=${sid}&userSurveyId=${usid}`,
        method: "get",
        instance: "instanceOne",
        contentType: "application/json",
        authReqd: true
      }).then(response => {
        console.log("response", response);

        let tempData = [];
        response?.Answers.forEach(item => {
          console.log("ans data", item);
          tempData.push({
            value: item.AnswerId,
            label: item.label,
            selected: true,
            width: "",
            color: ""
          });
        });
        const max_num = Math.max(...tempData.map(item => item.value));
        const minNum = Math.min(...tempData.map(item => item.value));
        this.setState({
          next_question_id: response?.nextQuestionId,
          questions_object: response,
          answers_array: tempData,
          maximum_ans: max_num,
          minimum_ans: minNum,
          ans_format_code: response.Code
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleAnswerChange(value) {
    console.log("value", value);
    this.setState({ selected_ans: value });
  }

  postAnswerHanlder = async () => {
    const { setAppData, openSurvey, history, isSurveyCompleted } = this.props;
    const {
      questions_object,
      selected_ans,
      ans_format_code,
      next_question_id
    } = this.state;
    try {
      const body = {
        userId: questions_object?.UserId,
        userSurveyId: openSurvey[0]?.userSurveyId,
        finilized: !next_question_id ? true : null,
        answerId: null,
        questionId: questions_object?.QuestionId,
        empoymentMonths: null,
        department: null,
        designation: null,
        scale5: null,
        other: null
      };

      const regMatch = /^[a-zA-Z]*$/.test(selected_ans);
      let tempdata = regMatch;
      // var tempdata = (selected_ans) => {
      //   debugger
      //   let letters = /^[A-Za-z]+$/;

      //   if (selected_ans.value.match(/^[A-Za-z]+$/)) {
      //     return selected_ans;
      //   }
      //   else {
      //     return null;
      //   }
      // }
      console.log("tempdata ", tempdata);
      console.log("temp", regMatch);

      switch (ans_format_code) {
        case "1":
          body.empoymentMonths = selected_ans;
          break;
        case "2":
          body.department = selected_ans;
          body.other = null;
          break;
        case "3":
          body.designation = selected_ans;
          break;
        case "4":
          body.scale5 = selected_ans;
          break;

        default:
          break;
      }

      await httpRequest({
        endPoint: "api/v1/user/addAnswers",
        method: "post",
        instance: "instanceOne",
        requestBody: body,
        authReqd: true,
        contentType: "application/json"
      }).then(async response => {
        if (response.userId) {
          if (openSurvey && next_question_id) {
            this.getQuestionHandler(
              openSurvey[0]?.userId,
              next_question_id,
              openSurvey[0]?.surveyId,
              openSurvey[0]?.userSurveyId
            );
            localStorage.setItem("isSurveyCompleted", false);
            this.setState({ selected_ans: null });
          } else if (next_question_id === null) {
            this.props.setAppData("isSurveyCompleted", true);
            localStorage.setItem("isSurveyCompleted", true);
            // props.setAppData("userInfo", response);
            history.push("/Yardstix/user-home");
            console.log("isSurvey", isSurveyCompleted);
          }
        } else {
          setAppData("snackbar", {
            open: true,
            variant: "error",
            message: "enter the valid  details"
          });
        }
      });
    } catch (e) {
      setAppData("snackbar", {
        open: true,
        variant: "warning",
        message: "its not working"
      });
      console.log(e);
    }
  };

  backHandler = () => {
    const { history } = this.props;
    history.push("/Yardstix/user-home");
  };

  nextQuestionHandler = async () => {
    if (this.state.selected_ans != null) {
      await this.postAnswerHanlder();
    }
  };

  onChangeHandler = e => {
    this.setState({ answer_select_value: e.target.value });
    console.log("value", e.target.value);
  };

  render() {
    const { classes, openSurvey } = this.props;

    console.log("state", this.state);
    const { questions_object = {}, answers_array } = this.state;
    console.log("answer", answers_array);
    console.log("open", openSurvey);
    let answerComponent = null;

    if (this.state.ans_format_code === "1") {
      answerComponent = (
        <AnswerFormat1
          maximum_ans={this.state.maximum_ans}
          minimum_ans={this.state.minimum_ans}
          answers_array={this.state.answers_array}
          handleAnswerChange={this.handleAnswerChange}
        />
      );
    } else if (this.state.ans_format_code === "2") {
      answerComponent = (
        <AnswerFormat2
          answers_array={this.state.answers_array}
          handleAnswerChange={this.handleAnswerChange}
        />
      );
    } else if (this.state.ans_format_code === "3") {
      answerComponent = (
        <AnswerFormat3
          answers_array={this.state.answers_array}
          handleAnswerChange={this.handleAnswerChange}
        />
      );
    } else if (this.state.ans_format_code === "4") {
      answerComponent = (
        <AnswerFormat4
          maximum_ans={this.state.maximum_ans}
          minimum_ans={this.state.minimum_ans}
          answers_array={this.state.answers_array}
          handleAnswerChange={this.handleAnswerChange}
        />
      );
    }

    return (
      <div className={classes.root}>
        <div className={classes.mobileRoot}>
          <div className={classes.logoImageStyle}>
            <img className={classes.logoMobiimg} src={logoImage} alt="logo" />
          </div>
          <Typography className={classes.questionStyle}>
            {questions_object?.QuestionText}
          </Typography>
          {answerComponent}
        </div>
        <Grid container className={classes.footerStyle}>
          <Grid
            item
            xs={6}
            justify="center"
            className={classes.backImage}
            onClick={this.backHandler}
          >
            <IconButton>
              <img className={classes.backimg} src={back} alt="back" />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={6}
            justify="center"
            className={classes.checkImage}
            onClick={() => this.nextQuestionHandler()}
          >
            <IconButton onChange={e => this.onChangeHandler(e)}>
              <img className={classes.checkimg} src={check} alt="logo" />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration = {} }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { dashboard, isSurveyCompleted } = preparedFinalObject;
  const { openSurvey } = dashboard || "";
  return { openSurvey, isSurveyCompleted };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(QuestionComponent));
