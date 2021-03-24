import React, { useState } from "react";
import { connect } from "react-redux";
import { userLogin } from "../../actions/Auth";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const onChange1 = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit1 = (e) => {
    e.preventDefault();
    props.userLogin({ username, password });
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
              onChange={(e) => {
                onChange1(e);
              }}
              type="password"
              placeholder="Password"
              name="password"
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
export default connect(mapStateToProps, { userLogin })(Login);
