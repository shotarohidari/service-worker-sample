import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const app = document.getElementById("app");
if (!app) throw new Error("div#appが存在しない");
const root = createRoot(app);
root.render(<App />);
