import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const menuItems = [
  {
    name: "Dashboard",
    route: "/user-home"
  }
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  }
});

class Menu extends React.Component {
  state = {
    value: 0
  };

  componentDidMount = () => {
    this.props.history.push(`${menuItems[0].route}`);
  };
  handleChange = (event, value) => {
    this.setState({ value });
    this.props.history.push(`${menuItems[value].route}`);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {/* <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={this.handleChange}
        >
          <Tab label={menuItems[0].name} />
        </Tabs> */}
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
