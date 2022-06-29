import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import "../index.css";
import { withStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";

const styles = theme => ({
  sliderRoot: {
    color: "#fff"
  },
  sliderDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px"
  }
});

const PrettoSlider = styled(Slider)({
  // color: "linear-gradient(262.14deg, #D22222 -4.5%, #820505 91.48%);",
  color: "#820505",
  // height: 8,
  "& .MuiSlider-rail": {
    color: "#E2E2E2",
    width: 10
  },
  "& .MuiSlider-track": {
    border: "none",
    color: "#E2E2E2",
    width: 10
  },
  "& .MuiSlider-markLabel": {
    fontFamily: "Montserrat",
    color: "#400505",
    fontSize: 14
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    background: "Red Gradient",
    // border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit"
    },
    "&:before": {
      display: "none"
    }
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)"
    },
    "& > *": {
      transform: "rotate(45deg)"
    }
  }
});

const AnswerFormat1 = props => {
  const {
    classes,
    maximum_ans,
    minimum_ans,
    answers_array,
    handleAnswerChange
  } = props;
  const [sliderValue, setSliderValue] = useState(" ");

  console.log("mini", minimum_ans);
  console.log("slider value", sliderValue);

  const onChangeHandler = e => {
    setSliderValue({ sliderValue: e.target.value });
    handleAnswerChange(e.target.value);
  };

  return (
    <div className={classes.sliderDiv}>
      <Stack
        className={classes.sliderRoot}
        sx={{ height: 300 }}
        spacing={1}
        direction="row"
      >
        <PrettoSlider
          class="slider"
          fontFamily="Montserrat"
          aria-label="Temperature"
          orientation="vertical"
          valueLabelDisplay="off"
          defaultValue={0}
          type="range"
          name="rangeInput"
          max={maximum_ans}
          min={minimum_ans}
          marks={answers_array}
          onChange={e => onChangeHandler(e)}
        />
      </Stack>
    </div>
  );
};

export default withStyles(styles)(AnswerFormat1);
