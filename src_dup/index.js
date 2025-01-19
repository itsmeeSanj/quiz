import React from "react";
import ReactDOM from "react-dom/client";

import { QuizeProvider } from "./context/QuizeProvider";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuizeProvider>
      <App />
    </QuizeProvider>
  </React.StrictMode>
);
