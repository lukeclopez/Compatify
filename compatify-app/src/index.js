import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import ScrollingColorBackground from "react-scrolling-color-background";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

const lavender = "rgb(210, 180, 222)";
const peach = "rgb(245, 183, 177)";
const sea = "rgb(162, 217, 206)";
const sand = "rgb(250, 215, 160)";
const baby = "rgb(174, 214, 241)";
const colorsArr = [lavender, peach, sea, sand, baby];
const COLORS = makeRepeated(colorsArr, 6);

function makeRepeated(arr, length) {
  return Array.from({ length }, () => arr).flat();
}

ReactDOM.render(
  <>
    {/* <ScrollingColorBackground
      selector=".js-color-stop[data-background-color]"
      colorDataAttribute="data-background-color"
      initialRgb="rgb(0, 0, 0)"
    /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {COLORS.map((rgbString, idx) => (
      <section
        key={idx}
        className="js-color-stop"
        data-background-color={rgbString}
        style={{ height: "100vh", zIndex: "100" }}
      />
    ))}
  </>,
  document.getElementById("root")
);
registerServiceWorker();
