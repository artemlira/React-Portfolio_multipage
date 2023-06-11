import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./styles/index.scss";
import ScrollToTop from "./components/ScrollToTop";
// import Context from './components/Context';
import "./i18n";

const override = {
  display: "block",
  margin: "0 auto",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<FadeLoader cssOverride={override} color="#c778dd" />}>
      <BrowserRouter>
        <Provider store={store}>
          <ScrollToTop />
          <App />
        </Provider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
