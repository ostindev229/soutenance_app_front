import * as api from "../api/index.js";
import { setUserInState } from "../reducers/userReducers.js";

export const updateProfil = (formData) => async (dispatch) => {
  try {
    const response = await api.updateProfil(formData);
    console.log(response);
    dispatch(setUserInState(response.data.user));

    console.log("successfully");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
