import { combineReducers } from "redux";
import setAlert from "./Alert";
import regUser from "./Auth";

export default combineReducers({
  setAlert,
  regUser,
});
