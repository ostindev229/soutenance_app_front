import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyOTP } from "../api";
import { setUserInState } from "../reducers/userReducers";
import useRedirectToRightUserDahboard from "../hooks/useRedirectToRightUserDahboard";
import Toast from "./Toast";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import { resendOtpAction } from "../actions/auth";

function VerifOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    if (!/^[0-9]$/.test(value) && value !== "") {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleResendOtp = () => {
    resendOtpAction(phoneNumber);
    toast(<Toast type="success" message="Nouveau code envoyé." />);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.includes("")) {
      setMessage("Tous les champs doivent être remplis.");
      toast(<Toast type="error" message="Veuillez remplir tous les champs." />);
      return;
    }
    setIsLoading(true);
    try {
      const response = await verifyOTP(phoneNumber, otp.join(""));
      if (response.status === 200) {
        const newUser = { ...user, isVerified: true };
        dispatch(setUserInState(newUser));
        toast(
          <Toast
            type="success"
            message="Compte vérifié! Vous êtes connectés!"
          />
        );

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
      toast(<Toast type="error" message="Vérification échouée!" />);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserToken = localStorage.getItem("userToken");

  return getUserToken && !user.isVerified ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto text-center bg-white px-6 sm:px-10 py-12 rounded-xl shadow-lg">
        <div className="flex items-center ">
          <img
            src="https://job-board.dexignzone.com/react/demo/favicon.ico"
            alt="Logo"
            className="w-10 h-10 mr-2"
          />
          <h1 className="text-[25px]">
            <span className="text-blue-600">
              <strong>Job</strong>
            </span>
            <span className="text-black">
              <strong>Benin</strong>
            </span>
          </h1>
        </div>
        <header className="mb-10">
          <p className="text-lg text-slate-500">
            Saisissez le code de vérification à 6 chiffres qui a été envoyé à
            votre numéro de téléphone.
          </p>
        </header>
        <form id="otp-form" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-4">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                className="w-16 h-16 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                disabled={isLoading}
              />
            ))}
          </div>
          <div className="max-w-xs mx-auto mt-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Vérification...
                </>
              ) : (
                "Vérifier"
              )}
            </button>
          </div>
        </form>
        <div className="text-lg text-slate-500 mt-6">{message}</div>
        <div className="text-lg text-slate-500 mt-6">
          Vous n'avez pas reçu de code?{" "}
          <a
            onClick={handleResendOtp}
            className="font-medium text-indigo-600 hover:text-indigo-700"
            href="#0"
          >
            Renvoyer
          </a>
        </div>
      </div>
    </div>
  ) : (
    navigateToRightUserDashboard(user)
  );
}

export default VerifOtp;
