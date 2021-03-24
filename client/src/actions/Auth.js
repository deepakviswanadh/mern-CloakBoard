import {
  REG_SUCCESS,
  REG_FAIL,
  LOADED_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./constants";
import { setAlert } from "./Alert";
import axios from "axios";
import setAuthToken from "../components/utils/setAuthToken";

//load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  try {
    const response = await axios.get("/post/login");
    dispatch({ type: LOADED_USER, payload: response.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//register user
export const regUser = ({ username, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });
  try {
    const response = await axios.post("/post/signup", body, config);
    dispatch({ type: REG_SUCCESS, payload: response.data });
    dispatch(setAlert("user registration successful", "success"));
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: REG_FAIL });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.message, "danger"));
      });
    }
  }
};

//user login
export const userLogin = ({ username, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });
  try {
    const response = await axios.post("/post/login", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    dispatch(loadUser());
    dispatch(setAlert("login success", "success"));
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.message, "danger"));
      });
    }
  }
};

//logout
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
