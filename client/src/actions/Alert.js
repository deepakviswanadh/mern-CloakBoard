import { SET_ALERT, REMOVE_ALERT } from "./constants";
import { v4 as uuid } from "uuid";

export const setAlert = (message, alertType) => (dispatch) => {
  let id = uuid();
  dispatch({ type: SET_ALERT, payload: { message, alertType, id } });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, 5000);
};
