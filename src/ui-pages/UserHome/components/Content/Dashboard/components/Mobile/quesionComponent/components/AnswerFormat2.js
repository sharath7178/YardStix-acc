import { withStyles } from "@material-ui/styles";
import React from "react";
import { Button, InputBase } from "@material-ui/core";

const styles = theme => ({
  alignDesignationItems: {
    border: "1px solid darkred",
    // borderRadius: "10px",
    margin: "0px 10px 10px 0px",
    color: "darkred",
    fontSize: 16,
    fontFamily: "Montserrat",
    "@media only screen and (min-width:330px) and (max-width:400px)": {
      fontSize: 14
    },
    "@media only screen and (min-width:250px) and (max-width:330px)": {
      fontSize: 12
    },
    "@media only screen and (min-height:450px) and (max-height:600px)": {
      fontSize: "14px"
    }
  },
  selectingDesignationItems: {
    border: "1px solid darkred",
    margin: "0px 10px 10px 0px",
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat",
    background: "darkred !important",
    "@media only screen and (min-width:330px) and (max-width:400px)": {
      fontSize: 14
    },
    "@media only screen and (min-width:250px) and (max-width:330px)": {
      fontSize: 12
    },
    "@media only screen and (min-height:450px) and (max-height:600px)": {
      fontSize: "14px"
    }
  },
  searchData: {
    display: "flex",
    border: "1px solid darkred",
    borderRadius: 10,
    padding: 10
  },
  stylesText: {
    padding: 0,
    fontFamily: "Montserrat",
    display: "flex",
    color: "#400505",
    fontSize: 16
  }
});

class AnswerFormat2 extends React.Component {
  state = {
    depart_ans_array: this.props.answers_array,
    depart_select_value: null,
    selected_state: true
  };

  selectingHandler = key => {
    let tempData = [];
    let changeBoolean = !this.state.selected_state;
    this.setState({ selected_state: changeBoolean });
    const currentObj = this.state.depart_ans_array.find(
      (item, index) => key === index
    );
    if (!this.state.depart_select_value) {
      tempData = this.state.depart_ans_array.map((item, index) => {
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
            selected: changeBoolean
          };
        }
      });
      this.setState({ depart_ans_array: [...tempData] });
      this.props.handleAnswerChange(currentObj?.value);
    }
  };

  handleChnage = e => {
    const currentData = this.state.depart_ans_array.filter(
      (item, index) => !item.selected
    );
    if (!currentData.length > 0) {
      this.setState({ depart_select_value: e.target.value });
      this.props.handleAnswerChange(e.target.value);
    }
  };

  render() {
    const { classes } = this.props;
    let selectedData = [];
    selectedData = this.state.depart_ans_array.filter(
      (item, index) => !item.selected
    );

    return (
      <div>
        <div style={{ padding: "20px 0px" }}>
          {this.state.depart_ans_array.map((item, key) => {
            return (
              <Button
                key={key}
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

        <div className={classes.searchData}>
          <InputBase
            className={classes.stylesText}
            placeholder="Type other here...."
            type="text"
            disabled={selectedData?.length > 0}
            onChange={e => this.handleChnage(e)}
            // multiline={2}
            style={{ lineHeight: "30px" }}
            fullWidth
          />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(AnswerFormat2);
