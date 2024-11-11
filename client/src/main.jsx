// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes/dist/cjs/index.js";

const suppressConsole = () => {
  const noop = () => {};
  const consoleMethods = [
    "log",
    "error",
    "debug",
    "warn",
    "info",
    "trace",
    "group",
    "groupEnd",
    "groupCollapsed",
    "time",
    "timeEnd",
    "timeLog",
    "count",
    "countReset",
    "clear",
    "table",
    "assert",
    "profile",
    "profileEnd",
    "dir",
    "dirxml",
    "timeStamp",
    "exception",
    "timeline",
    "timelineEnd",
  ];

  consoleMethods.forEach((method) => {
    console[method] = noop;
  });
};

// Suppress all unhandled errors and rejections
const suppressErrors = () => {
  window.addEventListener("error", (event) => {
    event.preventDefault();
    event.stopPropagation();
    return true;
  });

  window.addEventListener("unhandledrejection", (event) => {
    event.preventDefault();
    event.stopPropagation();
    return true;
  });
};

// Initialize error suppression
suppressConsole();
suppressErrors();

createRoot(document.getElementById("root")).render(
  <>
    <Theme radius="none" appearance="dark">
      <App />
    </Theme>
  </>
);
