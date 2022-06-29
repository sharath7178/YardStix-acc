import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { PersistGate } from "redux-persist/integration/react";
import themeObject from "./ui-config/theme";
import App from "./App";
import { Provider } from "react-redux";
import createStore from "./ui-redux/store";
import { HashRouter } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
// import * as serviceWorker from "./serviceWorker";

//theme configuration
const theme = createTheme(themeObject);

const rootElement = document.getElementById("root");

const { store, persistor } = createStore();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </MuiThemeProvider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
