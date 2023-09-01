import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import Router from "./Router.js";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Jika Anda menggunakan Redux Thunk
import rootReducer from "./redux/authReducer"; // Sesuaikan dengan nama reducer yang sesuai

import reportWebVitals from "./reportWebVitals";

const store = createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
