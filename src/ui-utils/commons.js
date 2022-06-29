import { prepareFinalObject } from "../ui-redux/screen-configuration/actions";

export const addQueryArg = (url = "", queries = []) => {
  const urlParts = url.split("?");
  const path = urlParts[0];
  let queryParts = urlParts.length > 1 ? urlParts[1].split("&") : [];
  queries.forEach(query => {
    const key = query.key;
    const value = query.value;
    const newQuery = `${key}=${value}`;
    queryParts.push(newQuery);
  });
  const newUrl = path + "?" + queryParts.join("&");
  return newUrl;
};

export const getUrlParameterValue = key => {
  let params = new URL(document.location).searchParams;
  let value = params.get(key);
  return value;
};

export const age = dateString => {
  let birth = new Date(dateString);
  let now = new Date();
  let beforeBirth =
    (() => {
      birth.setDate(now.getDate());
      birth.setMonth(now.getMonth());
      return birth.getTime();
    })() < birth.getTime()
      ? 0
      : 1;
  return now.getFullYear() - birth.getFullYear() - beforeBirth;
};

export const getQueryArg = (url, name) => {
  if (!url) url = window.location.href;
  // eslint-disable-next-line
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const mapDispatchToProps = dispatch => {
  return {
    setAppData: (jsonPath, data) => {
      dispatch(prepareFinalObject(jsonPath, data));
    }
  };
};

export let snackbarObj = {};
snackbarObj.open = true;
snackbarObj.variant = "error";

export const marks = [
  { name: "Management", id: 1, width: "100%", selected: true },
  { name: "Directer", id: 2, width: "90%", selected: true },
  { name: "Manager", id: 3, width: "80%", selected: true },
  { name: "Assistant - Manager", id: 4, width: "70%", selected: true },
  { name: "Entry - level", id: 5, width: "60%", selected: true },
  { name: "Intern", id: 6, width: "50%", selected: true }
];

export const departments = [
  { id: 1, name: "Production", selected: true },
  { id: 2, name: "Administration", selected: true },
  { id: 3, name: "Human resources", selected: true },
  { id: 4, name: "Finance", selected: true },
  { id: 5, name: "marketing", selected: true },
  { id: 6, name: "sales", selected: true },
  { id: 7, name: "It", selected: true }
];

export const sliderJson = [
  {
    value: 0,
    label: "Less than 6 months"
  },
  {
    value: 20,
    label: "6 months - 1 year"
  },
  {
    value: 40,
    label: "1-3 years"
    // color: "orange"
  },
  {
    value: 60,
    label: "3-5 years"
    // color: "orange"
  },
  {
    value: 80,
    label: "5-7 years"
    // color: "green"
  },
  {
    value: 100,
    label: "7 or more years"
    // color: "green"
  }
];
