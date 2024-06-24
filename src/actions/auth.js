// actions/auth.js

import * as api from "../api/index.js";

// Signup Action
export const signup = (formData) => {
  return api.signUp(formData);
};
// Login Action
export const resendOtpAction = (phoneNumber) => {
  return api.resendOTP(phoneNumber);
};

export const login = (formData) => {
  return api.signIn(formData);
};

//Login Admin Action

export const adminLogin = (formData) => {
  return api.adminLogin(formData);
};
