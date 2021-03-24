import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/Alert";
import { regUser } from "../../actions/Auth";
import { Redirect } from "react-router-dom";

const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const { username, password, password2 } = user;
  const onChange1 = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit1 = (e) => {
    e.preventDefault();
    if (password !== password2)
      props.setAlert("passwords dont match", "danger");
    else props.regUser({ username, password });
  };
  if (props.isAuthenticated) return <Redirect to="/post" />;
  return (
    <div>
      <form
        className="ui form"
        onSubmit={(e) => {
          onSubmit1(e);
        }}
      >
        <div className="field">
          <label>Name</label>
          <input
            onChange={(e) => {
              onChange1(e);
            }}
            type="text"
            placeholder="Name"
            name="username"
          />
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => {
                onChange1(e);
              }}
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              onChange={(e) => {
                onChange1(e);
              }}
              placeholder="Re-enter Password"
              name="password2"
            />
          </div>
          <button className="ui button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.regUser.isAuthenticated,
  };
};

export default connect(mapStateToProps, { setAlert, regUser })(Register);
