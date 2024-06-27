import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import FileBase from "react-file-base64";
import { submitPostulate } from "../actions/postulate";
import Toast from "./Toast";
import { toast } from "sonner";
import { CircularProgress } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PostulateJob = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [applyData, setApplyData] = useState({
    name: "",
    surname: "",
    contact: "",
    applyDate: "",
    selectedCvFile: "",
    jobOfferId: jobId,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { error } = useSelector((state) => state.postulates);

  const clear = () => {
    setApplyData({
      name: "",
      surname: "",
      contact: "",
      applyDate: "",
      selectedCvFile: "",
      jobOfferId: jobId,
    });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const { name, surname, contact, applyDate, selectedCvFile } = applyData;
    if (!name || !surname || !contact || !applyDate || !selectedCvFile) {
      toast(
        <Toast
          type="error"
          message="Remplissez correctement tous les champs."
        />
      );

      setErrorMessage("Remplissez correctement tous les champs.");
      return;
    }

    try {
      setLoading(true);
      await dispatch(submitPostulate(applyData)).unwrap();
      setLoading(false);
      clear();
      navigate("/");
      toast(<Toast type="success" message="Vous avez postulé avec succès" />);
    } catch (err) {
      setLoading(false);
      toast(<Toast type="error" message={err.message} />);
      setErrorMessage(
        err.message || "Une erreur est survenue lors de la soumission."
      );
    }
  };

  const handleFileUpload = ({ base64, name }) => {
    const fileExtension = name.split(".").pop().toLowerCase();
    if (fileExtension !== "pdf") {
      setErrorMessage("Veuillez télécharger un fichier PDF.");
      return;
    }
    setApplyData({ ...applyData, selectedCvFile: base64 });
    setErrorMessage("");
  };

  const handlePhoneChange = (value) => {
    setApplyData({ ...applyData, contact: value });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 ">
      <header className="bg-blue-700 py-6">
        <h1 className="text-center text-white text-4xl font-bold">JobBenin</h1>
      </header>
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="w-full max-w-2xl p-10 bg-white shadow-2xl rounded-lg">
          <h2 className="text-center text-3xl font-bold mb-6">
            Postulez pour votre emploi de rêve
          </h2>
          <p className="text-center text-gray-700 mb-8">
            Remplissez le formulaire ci-dessous pour soumettre votre
            candidature.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                name="name"
                placeholder="Entrez votre nom"
                value={applyData.name}
                onChange={(e) =>
                  setApplyData({ ...applyData, name: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-gray-700 outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Prénom</label>
              <input
                type="text"
                name="surname"
                placeholder="Entrez votre prénom"
                value={applyData.surname}
                onChange={(e) =>
                  setApplyData({ ...applyData, surname: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-gray-700 outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Date de Candidature
              </label>
              <input
                type="date"
                name="applyDate"
                value={applyData.applyDate}
                onChange={(e) =>
                  setApplyData({ ...applyData, applyDate: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-gray-700 outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Contact</label>
              <PhoneInput
                name="phoneNumber"
                placeholder="Entrez votre numéro de téléphone"
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
                value={applyData.contact}
                onChange={handlePhoneChange}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <p className="text-red-500 mb-4">
              NB : Un CV bien détaillé augmente vos chances de sélection.
            </p>
            <div className="mb-6">
              <FileBase
                type="file"
                multiple={false}
                onDone={handleFileUpload}
                ref={fileInputRef}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-6">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Postulez Maintenant"
              )}
            </button>
            <button
              type="button"
              className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition duration-300 mt-4"
              onClick={clear}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Effacer"
              )}
            </button>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostulateJob;
