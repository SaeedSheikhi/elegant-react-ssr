import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={`/${props.match.params.OSType}/auth/login?redirect=${
            props.location.pathname
          }`}
        />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(AuthenticatedRoute);