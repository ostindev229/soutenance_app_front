import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as actionTypes from "../constants/actionTypes";
import { Link } from "react-router-dom";
import Logo from "../images/logo/logo.svg";
import logoauth from "../images/logoauth.svg";
import Toast from "./Toast";
import {
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
} from "@mui/material";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useDispatch } from "react-redux";
import { signup } from "../actions/auth";
import { toast } from "sonner";

const SignUp = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    username: "",
    role: "recruiter",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = ["email", "phoneNumber", "username", "password"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      toast(<Toast type="error" message="Remplissez touts les champs." />);
      return;
    }

    setLoading(true);

    signup(formData)
      .then((res) => {
        toast(<Toast type="success" message="Compte crée avec succès" />);
        dispatch({
          type: actionTypes.SIGNUP_SUCCESS,
          payload: res.data,
        });

        setLoading(false);
        navigate("/signin");
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.SIGNUP_FAILURE,
          payload: { error: error.response.data.errors },
        });
        toast.error("Signup failed");
        setLoading(false);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-screen-xl w-full xl:max-w-5xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-90vh">
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
        <div className="flex flex-wrap items-center h-full">
          <div className="w-full xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
              </Link>
              <span className="mt-15 inline-block">
                <img src={logoauth} alt="Logo de connexion" />
              </span>
            </div>
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      label="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Telephone
                  </label>
                  <div className="relative">
                    <div className="border border-stroke rounded-lg overflow-hidden">
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
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      name="username"
                      placeholder="Enter your Username"
                      label="Username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <FormControl component="fieldset" margin="normal">
                    <Typography variant="subtitle1" gutterBottom>
                      Role
                    </Typography>
                    <RadioGroup
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel
                        value="recruiter"
                        control={<Radio />}
                        label="Recruiter"
                      />
                      <FormControlLabel
                        value="employer"
                        control={<Radio />}
                        label="Employer"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      label="Password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Create account"
                  )}
                </Button>
                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{" "}
                    <Link to="/signin" className="text-primary">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
