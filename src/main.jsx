import React from "react";
import ReactDOM from "react-dom/client";
import { Principal } from "./Principal";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import { ContextDerco } from "./context/ContextDerco";
import Swal from "sweetalert2";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextDerco>
        <Principal />
      </ContextDerco>
    </BrowserRouter>
  </React.StrictMode>
);
