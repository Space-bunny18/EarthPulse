import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/globals.css";
import { LayerProvider } from "./context/LayerContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <BrowserRouter>
    <LayerProvider>
      <App />
    </LayerProvider>
  </BrowserRouter>
</React.StrictMode>
);