import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/Alert";
import { logout } from "../../actions/Auth";

const Post = (props) => {
  const [postData, setPostData] = useState({
    title: "",
    post: "",
  });
  const { title, post } = postData;

  const onChange1 = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const onSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const token = props.auth.token;
      if (
        !token ||
        !props.auth.isAuthenticated ||
        !props.auth.user ||
        token !== localStorage.getItem("token")
      ) {
        props.setAlert("invalid auth,access denied", "danger");
        return props.logout();
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      const body = JSON.stringify({ title, post });
      await axios.post("/post", body, config);
      props.setAlert("post received successfully", "success");
    } catch (err) {
      let errors = err.response.data.errors;
      if (errors)
        errors.forEach((error) => props.setAlert(error.message, "danger"));
    }
  };

  return (
    <div>
      <form
        className="ui form"
        onSubmit={(e) => {
          onSubmit1(e);
        }}
      >
        <div className="field">
          <label>Post-Title</label>
          <input
            onChange={(e) => {
              onChange1(e);
            }}
            type="text"
            placeholder="post-title"
            name="title"
          />
        </div>
        <div className="field">
          <label>Post-Body</label>
          <input
            onChange={(e) => {
              onChange1(e);
            }}
            type="text"
            placeholder="post-body"
            name="post"
          />
        </div>
        <div>
          <button className="ui primary button" type="submit">
            Submit
          </button>
        </div>
      </form>
      <br />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.regUser,
  };
};

export default connect(mapStateToProps, { setAlert, logout })(Post);
