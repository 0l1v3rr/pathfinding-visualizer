import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NodeProvider } from "./context/NodeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NodeProvider>
      <App />
    </NodeProvider>
  </React.StrictMode>
);
