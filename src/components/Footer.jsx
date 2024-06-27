import React from "react";
import {
  FaTwitter,
  FaFacebookSquare,
  FaInstagram,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <div>
      <footer className="relative bg-[#171d36] text-white pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex items-center mb-6">
                <img
                  src="https://job-board.dexignzone.com/react/demo/favicon.ico"
                  alt="Logo"
                  className="w-20 h-20 mr-2"
                />
                <h1 className="text-[30px]">
                  <span className="text-blue-600">
                    <strong>Job</strong>
                  </span>
                  <span className="text-white">
                    <strong>Benin</strong>
                  </span>
                </h1>
              </div>
              <h4 className="text-3xl font-semibold text-blueGray-700">
                Restons en contact !
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                Retrouvez-nous sur n'importe quelle plateforme, nous répondons
                sous 1-2 jours ouvrables.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6 flex space-x-2">
                <button
                  className="bg-blue-500 text-lightBlue-400 shadow-lg font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none"
                  type="button"
                >
                  <FaTwitter className="text-3xl" />
                </button>
                <button
                  className="bg-blue-500 text-lightBlue-600 shadow-lg font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none"
                  type="button"
                >
                  <FaFacebookSquare className="text-3xl" />
                </button>
                <button
                  className="bg-white text-pink-600 shadow-lg font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none"
                  type="button"
                >
                  <FaInstagram className="text-4xl" />
                </button>
                <button
                  className="bg-black text-blueGray-800 shadow-lg font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none"
                  type="button"
                >
                  <FaGithub className="text-2xl" />
                </button>
                <button
                  className="bg-white text-green-500 shadow-lg font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none"
                  type="button"
                >
                  <FaWhatsapp className="text-6xl" />
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Liens Utiles
                  </span>
                  <ul className="list-unstyled">
                    <li className="text-blueGray-600 font-semibold block pb-2 text-sm">
                      À propos de JobBenin
                    </li>
                    <li className="text-blueGray-600 font-semibold block pb-2 text-sm">
                      Nos Services
                    </li>
                    <li className="text-blueGray-600 font-semibold block pb-2 text-sm">
                      Témoignages
                    </li>
                    <li className="text-blueGray-600 font-semibold block pb-2 text-sm">
                      Offres d'emploi
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Autres Ressources
                  </span>
                  <ul className="list-unstyled">
                    <li className="text-blueGray-600 font-semibold block pb-2 text-sm">
                      Licence MIT
                    </li>
                    <li className="text-blueGray-600 font-semibold block pb-2 text-sm">
                      Termes &amp; Conditions
                    </li>
                    <li className="text-blueGray-600 font-semibold block pb-2 text-sm">
                      Politique de Confidentialité
                    </li>
                    <li className="text-blueGray-600 font-semibold block pb-2 text-sm">
                      Nous contacter
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2024</span>
                <span className="text-blueGray-500"> JobBenin.</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
