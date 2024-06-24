import { useState } from "react";
import logo1 from "../assets/logo1.jpg";
import { FaWhatsapp } from "react-icons/fa";

const Participant = (prop) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(prop.status); // Local state for status

  const message = "Hello, I would like to chat with you.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${prop.contact}?text=${encodedMessage}`;

  const handleValidation = async () => {
    setIsLoading(true);
    await prop.validateJobApplicationAction(prop.jobOfferId, prop.id);
    setStatus("ACCEPT"); // Update status to ACCEPT
    setIsLoading(false);
  };

  const handleRejection = async () => {
    setIsLoading(true);
    await prop.rejectJobApplicationAction(prop.id);
    setStatus("REJECT"); // Update status to REJECT
    setIsLoading(false);
  };

  return (
    <div
      className={`flex items-center w-full h-60 bg-white rounded-lg shadow-md overflow-hidden ${
        status === "REJECT" && "opacity-50"
      }`}
    >
      <div className="flex items-center justify-start w-3/4">
        <img
          src={logo1}
          alt="Participant"
          className="h-16 w-16 object-cover rounded-full border-2 border-green-500 ml-4"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {prop.name} {prop.surname}
          </h2>
          <p className="text-sm text-gray-600">{prop.applyDate}</p>
          <a
            href={prop.selectedCvFile}
            download
            className="text-sm text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Télécharger CV
          </a>
        </div>
      </div>
      <div className="w-1/4 flex justify-end pr-4 space-x-2">
        {status === "IN_PROGRESS" ? (
          <>
            <button
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
              onClick={handleValidation}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Valider"
              )}
            </button>
            <button
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
              onClick={handleRejection}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Rejeter"
              )}
            </button>
          </>
        ) : (
          status === "ACCEPT" && (
            <div className="App">
              <a
                href={whatsappLink}
                target="_blank"
                className="whatsapp-button"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={20} /> Chat with us
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Participant;
