import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";
import "./i18n.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Suspense fallback="loading....">
          <App />
        </Suspense>
      </StateProvider>
    </Router>
  </React.StrictMode>
);
