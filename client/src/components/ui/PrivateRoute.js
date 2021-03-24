import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
  if (!props.auth.isAuthenticated && !props.auth.loading)
    return <Redirect to="/login" />;
  return <Route exact path={props.path} component={props.component} />;
};

const mapStateToProps = (state) => {
  return {
    auth: state.regUser,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
