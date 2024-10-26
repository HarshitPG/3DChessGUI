// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes/dist/cjs/index.js";

createRoot(document.getElementById("root")).render(
  <>
    <Theme radius="none" appearance="dark">
      <App />
    </Theme>
  </>
);
