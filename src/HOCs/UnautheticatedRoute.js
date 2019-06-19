import React from 'react';
import { connect } from 'react-redux';
import queryString from 'querystring';
import { Route, Redirect } from 'react-router-dom';

const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
  const query = queryString.parse(rest.location.search.substring(1));

  return (
    <Route
      {...rest}
      render={props =>
        !rest.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={query.redirect || `/${props.match.params.OSType}/profile`}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  null
)(UnauthenticatedRoute);
