import * as actionTypes from "../constants/actionTypes";
import { userLocalStorage } from "../utils/localStorage";

const initialState = {
  isAdminAuthenticated: false,
  admin: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOGIN:
      userLocalStorage(action.payload.token);
      localStorage.setItem("admin", JSON.stringify(action.payload.admin));
      return {
        ...state,
        isAdminAuthenticated: true,
        admin: action.payload.admin,
        error: null,
      };
    case actionTypes.ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        isAdminAuthenticated: false,
        admin: null,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default authReducer;
