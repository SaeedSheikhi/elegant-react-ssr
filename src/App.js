import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
//
import ScrollToTop from "./HOCs/ScrollToTop";
import WithTracker from "./HOCs/WithTracker";
import Loading from "./components/Loading";
import { ModalContainer } from "./containers/Modal";
//
import { establishCurrentUser } from "./services/auth/actions";
import { setNavigatorMetadata } from "./services/agent/actions";
import { isServer } from "./services/store";
//
import logToService from "./helpers/logToService";
import Navigation from "./components/Navigation";

const LoadableLanding = Loadable({
  loader: () => import(/* webpackChunkName: "landing" */ "./screens/Landing"),
  loading: Loading,
  timeout: 10000,
  modules: ["landing"],
  webpack: () => [require.resolveWeak("./screens/landing")]
});
const LoadableSSR = Loadable({
  loader: () => import(/* webpackChunkName: "ssr" */ "./screens/SSR"),
  loading: Loading,
  timeout: 10000,
  modules: ["ssr"],
  webpack: () => [require.resolveWeak("./screens/ssr")]
});
const LoadableCSR = Loadable({
  loader: () => import(/* webpackChunkName: "csr" */ "./screens/CSR"),
  loading: Loading,
  timeout: 10000,
  modules: ["csr"],
  webpack: () => [require.resolveWeak("./screens/csr")]
});

class App extends Component {
  componentWillMount() {
    if (!isServer) this.props.establishCurrentUser();
  }

  componentDidMount() {
    this.props.setNavigatorMetadata(window.navigator);
  }

  componentDidCatch(error, info) {
    logToService(error, info);
  }

  render() {
    return (
      <WithTracker>
        <ScrollToTop>
          <LoadingBar
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              zIndex: "100"
            }}
          />
          <ToastContainer
            closeButton={false}
            rtl
            bodyClassName="font-family-IRANSans"
            draggablePercent={40}
          />
          <Switch>
            <Route exact path="/" component={LoadableLanding} />
            <Route exact path="/ssr" component={LoadableSSR} />
            <Route exact path="/csr" component={LoadableCSR} />
          </Switch>
          <Navigation />
          <ModalContainer />
        </ScrollToTop>
      </WithTracker>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(
  connect(
    mapStateToProps,
    { establishCurrentUser, setNavigatorMetadata }
  )(App)
);
