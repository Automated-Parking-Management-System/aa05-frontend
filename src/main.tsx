import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';

import { AuthProvider } from "./context/AuthContext";
import { NavProvider } from "./context/NavContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <AuthProvider>
        <NavProvider>
          <App />
        </NavProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
