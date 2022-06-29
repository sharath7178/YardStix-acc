import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";

const styles = theme => ({
  alignDesignationItems: {
    display: "flex",
    border: "1px solid darkred",
    borderRadius: "10px",
    margin: "10px 0px",
    color: "darkred",
    fontSize: 16,
    justifyContent: "flex-start",
    fontFamily: "Montserrat",
    // width: "100%",
    "@media only screen and (min-width:320px) and (max-width:420px)": {
      fontSize: 14
    },
    "@media only screen and (min-width:250px) and (max-width:320px)": {
      fontSize: 14
    }
  },
  selectingDesignationItems: {
    display: "flex",
    border: "2px solid darkred",
    borderRadius: "10px",
    margin: "10px 0px",
    background: "darkred !important",
    color: "#fff",
    fontSize: 15,
    justifyContent: "flex-start",
    fontFamily: "Montserrat"
    // width: "100%",
  }
});

class AnswerFormat3 extends React.Component {
  state = {
    designation_ans_arr: this.props.answers_array,
    widthSize: "10%"
  };

  componentDidMount = () => {
    let width = 100;
    let getWidth = [];
    getWidth = this.state.designation_ans_arr.map((item, index) => {
      let ans_width = width - index * 10;
      return {
        ...getWidth,
        ...item,
        width: ans_width + "%"
      };
    });
    console.log("dummy", getWidth);
    this.setState({ designation_ans_arr: getWidth });
  };

  selectingHandler = key => {
    let tempData = [];
    const currentObj = this.state.designation_ans_arr.find(
      (item, index) => key === index
    );
    console.log("crn obj", currentObj);
    tempData = this.state.designation_ans_arr.map((item, index) => {
      if (index !== key) {
        return {
          ...tempData,
          ...item,
          selected: true
        };
      } else {
        return {
          ...tempData,
          ...item,
          selected: false
        };
      }
    });
    console.log("key", key);
    this.setState({ designation_ans_arr: [...tempData] });
    this.props.handleAnswerChange(currentObj?.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div style={{ padding: "20px 0px" }}>
          {this.state.designation_ans_arr.map((item, key) => {
            console.log("item", item.width - this.state.widthSize);
            console.log("item", 100 - 10);
            return (
              <Button
                key={key}
                style={{ width: item.width }}
                className={
                  item.selected === false
                    ? classes.selectingDesignationItems
                    : classes.alignDesignationItems
                }
                onClick={() => this.selectingHandler(key)}
              >
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(AnswerFormat3);
