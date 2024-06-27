import React from "react";
import recru from "../assets/recru.jpg";
import creation from "../assets/creation.png";
import publication from "../assets/publication.jpg";

function Value() {
  return (
    <div className="mb-8 mt-12 md:mb-16 w-full md:mt-20 lg:mb-24 lg:mt-32">
      <h1 className="text-textColor text-2xl md:text-4xl lg:text-5xl py-8 md:py-12 font-bold max-w-3xl mx-auto text-center">
        <span className="block ">
          Les valeurs qui nous guident dans le marché de l'emploi
        </span>
        <span className=" mt-2"></span>
      </h1>

      <div className="grid gap-8 md:gap-12 lg:gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-6xl mx-auto">
        <div className="singleGrid rounded-md hover:bg-gray-100 p-6 text-center">
          <img
            src={creation}
            alt="Création"
            className="rounded-full w-40 h-40 object-cover mx-auto mb-4"
          />
          <span className="font-semibold text-textColor text-xl lg:text-2xl">
            Création
          </span>
          <p className="text-base lg:text-lg text-textColor opacity-70 py-4 font-semibold">
            Créer des opportunités qui correspondent à vos aspirations
            professionnelles est au cœur de notre plateforme.
          </p>
        </div>

        <div className="singleGrid rounded-md hover:bg-gray-100 p-6 text-center">
          <img
            src={publication}
            alt="Publication"
            className="rounded-full w-40 h-40 object-cover mx-auto mb-4"
          />
          <span className="font-semibold text-textColor text-xl lg:text-2xl">
            Publication
          </span>
          <p className="text-base lg:text-lg text-textColor opacity-70 py-4 font-semibold">
            Assurer que les annonces d'emploi soient claires, concises et
            accessibles à tous les chercheurs d'emploi.
          </p>
        </div>

        <div className="singleGrid rounded-md hover:bg-gray-100 p-6 text-center">
          <img
            src={recru}
            alt="Recrutement"
            className="rounded-full w-40 h-40 object-cover mx-auto mb-4"
          />
          <span className="font-semibold text-textColor text-xl lg:text-2xl">
            Recrutement
          </span>
          <p className="text-base lg:text-lg text-textColor opacity-70 py-4 font-semibold">
            Connecter les bons talents avec les bonnes opportunités de manière
            efficace et efficiente.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Value;
