import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import $, { post } from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Provider } from "react-redux";
import { store } from "./state/store";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL_LIVE;
axios.defaults.timeout = 5000;

const token = localStorage.getItem("token");
axios.interceptors.request.use(
  (request) => {
    // console.log(request);
    //  !!localStorage.getItem("token")
    if (!!localStorage.getItem("token")) {
      // tokenhttp headertoken
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// axios.interceptors.response.use((response) => {
//   console.log(response);
//   return response;
// });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
