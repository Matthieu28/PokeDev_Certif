import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";
import { ExpContextProvider } from "./contexts/ExpContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrentUserContextProvider>
        <ExpContextProvider>
          <App />
        </ExpContextProvider>
      </CurrentUserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
