import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/Auth";
import { connect } from "react-redux";
import { setAlert } from "../../actions/Alert";

const Navbar = (props) => {
  if (props.auth.isAuthenticated)
    return (
      <div className="ui menu">
        <div className="ui item">
          <Link to="/"> Home</Link>
        </div>
        <div className="ui item">
          <Link to="/post">Post</Link>
        </div>
        {props.auth.user ? (
          <div className="ui item">
            <strong>Welcome! </strong>
            {props.auth.user.name}
          </div>
        ) : null}
        <div className="ui right floating item">
          <button
            className=" ui button"
            onClick={() => {
              props.logout();
              props.setAlert("logout successfull", "success");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  return (
    <div>
      <div className="ui menu">
        <Link to="/" className="item">
          Home
        </Link>
        <Link to="/register" className="item">
          Register
        </Link>
        <div className="ui item">
          <Link to="/login" className="ui primary button">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.regUser,
  };
};

export default connect(mapStateToProps, { logout, setAlert })(Navbar);
