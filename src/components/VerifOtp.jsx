import { useState, useRef } from "react";
import { useSelector } from "react-redux";

import { verifyOTP } from "../api";
import { useDispatch } from "react-redux";
import { setUserInState } from "../reducers/userReducers";
import useRedirectToRightUserDahboard from "../hooks/useRedirectToRightUserDahboard";

function VerifOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const { navigateToRightUserDashboard } = useRedirectToRightUserDahboard();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.users);
  const phoneNumber = useSelector((state) => state.users.formData.phoneNumber);
  const role = useSelector((state) => state.users.formData.role);
  console.log(role);
  console.log(phoneNumber);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOTP(phoneNumber, otp.join(""));
      if (response.status === 200) {
        const newUser = { ...user, isVerified: true };
        dispatch(setUserInState(newUser));

        navigateToRightUserDashboard(newUser);

        setMessage("Votre compte est vérifié avec succès !");
      } else {
        setMessage("La vérification du compte a échoué. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'OTP :", error);
      setMessage(
        "Une erreur s'est produite lors de la vérification de l'OTP. Veuillez réessayer."
      );
    }
  };
  const getUserToken = localStorage.getItem("userToken");

  return getUserToken && !user.isVerified ? (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 6-digit verification code that was sent to your phone
            number.
          </p>
        </header>
        <form id="otp-form" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">{message}</div>
        <div className="text-sm text-slate-500 mt-4">
          Didnt receive code?{" "}
          <a
            className="font-medium text-indigo-500 hover:text-indigo-600"
            href="#0"
          >
            Resend
          </a>
        </div>
      </div>
    </div>
  ) : (
    navigateToRightUserDashboard(user)
  );
}

export default VerifOtp;
