import { useState } from "react";
import * as actionTypes from "../constants/actionTypes";
import { Link } from "react-router-dom";
import Logo from "../images/logo/logo.svg";
import logoauth from "../images/logoauth.svg";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { adminLogin } from "../actions/auth";
import { toast } from "react-toastify";
import { userLocalStorage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = ["username", "password"];
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

    setLoading(true);

    adminLogin(formData)
      .then(async (res) => {
        dispatch({
          type: actionTypes.ADMIN_LOGIN,
          payload: res.data,
        });
        userLocalStorage(res.data.token);
        navigate("/verification");

        toast.success("Login successfully", {
          position: "top-right",
          autoClose: 8000,
        });
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Login failed.";
        dispatch({
          type: actionTypes.ADMIN_LOGIN_FAILURE,
          payload: { error: error },
        });
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 8000,
        });
        setLoading(false);
        setErrors({ general: errorMessage });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-screen-xl w-full xl:max-w-5xl rounded-lg border border-gray-300 bg-white shadow-lg p-8">
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
                  Username
                </label>
                <div className="relative">
                  <input
                    name="username"
                    placeholder="Enter your username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    } bg-white py-3 pl-4 pr-10 text-gray-700 outline-none focus:border-primary`}
                  />
                  {errors.username && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.username}
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
                disabled={loading}
                className="mb-9"
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
