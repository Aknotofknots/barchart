//node imports
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

//custom imports
import App from "./components/App";
import store from "./redux_store/store";
import ErrorBoundry from "./components/ErrorBoundry";

//styles
import "./styles/index.css";
import registerServiceWorker from "./registerServiceWorker";

render(
  <ErrorBoundry>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundry>,
  document.getElementById("root")
);
registerServiceWorker();
