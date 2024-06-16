import emptyImage from "../assets/empty.svg";

function JobListEmpty(prop) {
  return (
    <div className="flex flex-col items-center justify-center ">
      <img
        src={emptyImage}
        alt="Empty"
        className=" h-80 mb-0 sm:mb-0 w-[300px]"
      />
      <p className="text-center text-gray-600 mb-2">Aucune offre ajoutée</p>
      <button
        onClick={prop.onClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Ajouter une offre
      </button>
    </div>
  );
}

export default JobListEmpty;
