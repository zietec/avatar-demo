import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import { DailyProvider } from "@daily-co/daily-react";

import "./fonts/Christmas and Santona.ttf";
import "./index.css";

const root =document.getElementById("root")

if (!root) {
  throw new Error("No root")
}

createRoot(root).render(
  <React.StrictMode>
    <DailyProvider>
      <App />
    </DailyProvider>
  </React.StrictMode>,
);
