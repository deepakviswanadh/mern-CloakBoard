import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/ui/Navbar";
import Register from "./components/ui/Register";
import Login from "./components/ui/Login";
import Landing from "./components/ui/Landing";
import Alert1 from "./components/ui/Alert1";
import { loadUser } from "./actions/Auth";
import PrivateRoute from "./components/ui/PrivateRoute";
import Post from "./components/ui/Post";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Navbar />
          <Alert1 />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/post" component={Post} />
        </Router>
      </Fragment>
    </Provider>
  );
};

export default App;
