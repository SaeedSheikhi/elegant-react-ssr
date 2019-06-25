import "bootstrap/dist/css/bootstrap.min.css";
import "html5-device-mockups/dist/device-mockups.min.css";
import "rodal/lib/rodal.css";
import "react-toastify/dist/ReactToastify.min.css";
import "swiper/dist/css/swiper.min.css";
import "placeholder-loading/dist/css/placeholder-loading.min.css";
import "moment/locale/fa";

import React from "react";
import jwtDecode from "jwt-decode";
import { render, hydrate } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Frontload } from "react-frontload";
import moment from "moment";
import momentJalaali from "moment-jalaali";
import Loadable from "react-loadable";

import * as serviceWorker from "./serviceWorker";
import { setCurrentUser, renewToken } from "./services/auth/actions";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import createStore, { isServer } from "./services/store";
import App from "./App";

import "./assets/css/styles.css";
import "./assets/css/mq.css";

// Create a store and get back itself and its history object
const { store, history } = createStore();

// add fa locale to moment
moment.locale("fa");

// initialize moment jalaali
momentJalaali.loadPersian({
  dialect: "persian-modern",
  usePersianDigits: true
});

// check localStorage to grab token
if (!isServer && localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  store.dispatch(renewToken());
}

// Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
// Let's also let React Frontload explicitly know we're not rendering on the server here
const Application = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Frontload noServerRender={true}>
        <App />
      </Frontload>
    </ConnectedRouter>
  </Provider>
);

const root = document.querySelector("#root");

if (root.hasChildNodes() === true) {
  // If it's an SSR, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  Loadable.preloadReady().then(() => {
    hydrate(Application, root);
  });
} else {
  // If we're not running on the server, just render like normal
  render(Application, root);
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
}
