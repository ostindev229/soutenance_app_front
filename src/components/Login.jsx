import { useState } from "react";
import * as actionTypes from "../constants/actionTypes";
import { Link, Navigate } from "react-router-dom";
import Logo from "../images/logo/logo.svg";
import logoauth from "../images/logoauth.svg";
import { Button, CircularProgress } from "@mui/material";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { toast } from "react-toastify";
import { userLocalStorage } from "../utils/localStorage";
import { setFormDataInState } from "../reducers/userReducers";
import { setUserInState } from "../reducers/userReducers";
import useRedirectToRightUserDahboard from "../hooks/useRedirectToRightUserDahboard";
import { setIsLoading } from "../reducers/userReducers";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Ajout de l'état de chargement

  const { navigateToRightUserDashboard } = useRedirectToRightUserDahboard();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setFormDataInState(formData));

    const requiredFields = ["phoneNumber", "password"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      const errorMessage = `Please fill in all required fields: ${emptyFields.join(
        ", "
      )}.`;
      setErrors({ general: errorMessage });
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 8000,
      });
      return;
    }

    setLoading(true); // Début du chargement
    dispatch(setIsLoading(true));

    login(formData)
      .then(async (res) => {
        dispatch(setIsLoading(false));

        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: res.data,
        });
        userLocalStorage(res.data.token);
        const user = res.data.user;
        console.log("USER LOGIN", user);
        dispatch(setUserInState(user));
        navigateToRightUserDashboard(user);
        toast.success("Login successfully", {
          position: "top-right",
          autoClose: 8000,
        });
        setLoading(false); // Fin du chargement
      })
      .catch((error) => {
        dispatch(setIsLoading(false));

        const errorMessage = error.response?.data?.message || "Login failed.";
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          payload: { error: error },
        });
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 8000,
        });
        setLoading(false); // Fin du chargement
        setErrors({ general: errorMessage });
      });
  };

  const getUserToken = localStorage.getItem("userToken");

  return !getUserToken ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-screen-xl w-full xl:max-w-5xl rounded-lg border border-gray-300 bg-white shadow-lg p-8">
        <div className="flex items-center justify-center mt-4 mb-5 ">
          <Link className="mb-5.5 inline-block" to="/">
            <div className="flex items-center justify-center">
              <img
                className="w-12 h-12"
                src="https://job-board.dexignzone.com/react/demo/favicon.ico"
                alt="Logo"
              />
              <span className="ml-2 text-2xl font-bold">
                <span className="text-black">Job</span>
                <span className="text-blue-600">Benin</span>
              </span>
            </div>
          </Link>
        </div>
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2 p-6">
            <div className="text-center">
              <Link className="mb-5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
              </Link>
              <span className="mt-5 inline-block">
                <img src={logoauth} alt="Logo de connexion" />
              </span>
            </div>
          </div>

          <div className="w-full xl:w-1/2 xl:border-l p-6 xl:p-12">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2 block font-medium text-gray-700">
                  Telephone
                </label>
                <div className="relative">
                  <PhoneInput
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    international
                    defaultCountry=""
                    countries={[
                      "NG",
                      "BJ",
                      "BF",
                      "CI",
                      "GM",
                      "GH",
                      "GN",
                      "GW",
                      "LR",
                      "ML",
                      "MR",
                      "NE",
                      "SN",
                      "SL",
                      "TG",
                    ]}
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    error={errors.phoneNumber ? errors.phoneNumber : undefined}
                    className={`w-full rounded-lg border ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    } bg-white py-3 pl-4 pr-10 text-gray-700 outline-none focus:border-primary`}
                  />
                  {errors.phoneNumber && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } bg-white py-3 pl-4 pr-10 text-gray-700 outline-none focus:border-primary`}
                  />
                  {errors.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>
              {errors.general && (
                <div className="text-red-500 text-sm mb-4">
                  {errors.general}
                </div>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading} // Désactiver le bouton pendant le chargement
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
              <div className="mt-6 text-center">
                <p>
                  Don’t have an account?{" "}
                  <Link to="/signup" className="text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/verif-code/" />
  );
};

export default Login;
