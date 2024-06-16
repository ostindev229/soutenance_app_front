import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import {
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineUser,
} from "react-icons/ai";

const Navbar = () => {
  return (
    <div className=" top-0 left-0 w-full z-50 bg-white shadow-md">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <div className="flex items-center">
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

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700 transition duration-300"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open ? (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    <Link
                      to="/signin"
                      className="w-full px-4 py-2 -ml-4 text-white bg-blue-600 rounded-md dark:text-gray-300 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none flex items-center justify-center transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      <AiOutlineLogin className="mr-2" />
                      <span className="font-bold">Login</span>
                    </Link>

                    <Link
                      to="/signup"
                      className="w-full px-4 py-2 -ml-4 text-white bg-blue-600 rounded-md dark:text-gray-300 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none flex items-center justify-center mt-3 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      <AiOutlineUserAdd className="mr-2" />
                      <span className="font-bold">Signup</span>
                    </Link>

                    <Link
                      to="/admin"
                      className="w-full px-4 py-2 -ml-4 text-white bg-blue-600 rounded-md dark:text-gray-300 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none flex items-center justify-center mt-3 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      <AiOutlineUser className="mr-2" />
                      <span className="font-bold">Administrateur</span>
                    </Link>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            <li className="mr-3 nav__item">
              <Link
                to="/signin"
                className="inline-flex items-center px-4 py-2 text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <AiOutlineLogin className="mr-2" />
                Login
              </Link>
            </li>
            <li className="mr-3 nav__item">
              <Link
                to="/signup"
                className="inline-flex items-center px-4 py-2 text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <AiOutlineUserAdd className="mr-2" />
                Signup
              </Link>
            </li>
            <li className="mr-3 nav__item">
              <Link
                to="/admin"
                className="inline-flex items-center px-4 py-2 text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <AiOutlineUser className="mr-2" />
                Administrateur
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
