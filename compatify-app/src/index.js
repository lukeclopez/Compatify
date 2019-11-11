import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/browser";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

const environment =
  process.env.REACT_APP_DEVELOPMENT === "true" ? "Development" : "Production";

Sentry.init({
  dsn: "https://c3a2313aa7994c4b80fbae9931738d29@sentry.io/1815389",
  environment
});

ReactDOM.render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
registerServiceWorker();
