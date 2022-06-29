import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "react-table/react-table.css";
import { mapDispatchToProps } from "../../../../../../../../ui-utils/commons";
import {
  Typography,
  Grid,
  Button,
  IconButton,
  InputBase
} from "@material-ui/core";
import logoImage from "../../../../../../../../ui-assets/images/logoYardstix.svg";
import back from "../../../../../../../../ui-assets/images/keyboardReturn.svg";
import check from "../../../../../../../../ui-assets/images/check.svg";

const styles = theme => ({
  root: {
    height: "100vh",
    background: "#F8F8F8",
    width: "100%"
  },

  //desktop

  //mobile view
  mobileRoot: {
    padding: 34
  },
  logoImageStyle: {
    display: "flex",
    justifyContent: "center",
    padding: "60px 0px",
    "@media only screen and (min-height:600px) and (max-height:750px)": {
      padding: "30px 0px 60px 0px"
    },
    "@media only screen and (min-height:400px) and (max-height:600px)": {
      padding: "15px 0px 30px 0px"
    }
  },
  logoMobiimg: {
    "@media only screen and (min-width:50px) and (max-width:600px)": {
      width: "100%"
    }
  },
  questionStyle: {
    color: "#400505",
    fontSize: 16,
    lineHeight: "20px",
    fontFamily: "Montserrat",
    fontWeight: 400
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
    "@media only screen and (min-height:400px) and (max-height:600px)": {
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
    },
    "@media only screen and (min-height:400px) and (max-height:600px)": {
      height: "30px",
      width: 30
    }
  },
  checkImage: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(to right,#299F16 0%, #8BFF78 100%)",
    borderRadius: "10px 0px 0px 10px"
  },
  checkimg: {
    "@media only screen and (min-height:600px) and (max-height:750px)": {
      height: "30px"
    },
    "@media only screen and (min-height:400px) and (max-height:600px)": {
      height: 30,
      width: 30
    }
  },
  stylesText: {
    padding: 0,
    fontFamily: "Montserrat",
    border: "1px solid #820505",
    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexFlow: "column",
    margin: "20px 0px",
    minHeight: "200px",
    maxHeight: "200px",
    "@media only screen and (min-height:450px) and (max-height:550px)": {
      minHeight: "100px",
      maxHeight: "100px"
    },
    "@media only screen and (min-height:550px) and (max-height:850px)": {
      minHeight: "200px",
      maxHeight: "400px"
    }
  }
});

class feedback extends React.Component {
  backHandler = () => {
    const { history } = this.props;
    history.push("/Yardstix/user-home");
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.mobileRoot}>
          <div className={classes.logoImageStyle}>
            <img className={classes.logoMobiimg} src={logoImage} alt="logo" />
          </div>
          <Typography className={classes.questionStyle}>
            We really appreciate your feedback, please use the text box below:
          </Typography>
          <div>
            <InputBase
              className={classes.stylesText}
              s
              // name="companyName"
              placeholder="Type your feedback here..."
              type="text"
              multiline={2}
              style={{ lineHeight: "30px" }}
            />
          </div>
        </div>

        <Grid container className={classes.footerStyle}>
          <Grid item xs={6} justify="center" className={classes.backImage}>
            <IconButton onClick={this.backHandler}>
              <img className={classes.backimg} src={back} alt="back" />
            </IconButton>
          </Grid>
          <Grid item xs={6} justify="center" className={classes.checkImage}>
            <IconButton onClick={this.backHandler}>
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
  const { dashboard } = preparedFinalObject;
  return { dashboard };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(feedback));
