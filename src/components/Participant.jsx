import logo1 from "../assets/logo1.jpg";
import { FaWhatsapp } from "react-icons/fa";

const Participant = (prop) => {
  const message = "Hello I would like to chat with you.";
  const encodedMessage = encodeURIComponent(message);
  console.log(encodedMessage);
  const whatsappLink = `https://wa.me/${prop.contact}?text=${encodedMessage}`;

  return (
    <div className="flex items-center w-full h-60 bg-white rounded-lg shadow-md overflow-hidden">
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
      {/* Bouton de validation */}
      <div className="w-1/4 flex justify-end pr-4">
        {prop.status === "IN_PROGRESS" ? (
          <button
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded"
            onClick={() =>
              prop.validateJobApplicationAction(
                prop.jobOfferId,
                prop.candidateId
              )
            }
          >
            Valider
          </button>
        ) : (
          <div className="App">
            <a href={whatsappLink} target="_blank" className="whatsapp-button">
              <FaWhatsapp size={20} /> Chat with us
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Participant;
