import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCogs,
  FaTachometerAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Toast from "./Toast";
import { toast } from "sonner";

const iconMap = {
  dashboard: { component: FaTachometerAlt },
  home: { component: FaHome },
  settings: { component: FaCogs },
  logout: { component: FaSignOutAlt },
};

const DashBoardSideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    toast(<Toast type="success" message="Vous ètes déconnectés!" />);

    navigate("/", true);
  };
  const navBarItemsContent = [
    {
      iconType: "dashboard",
      content: "Dashboard",
      route: () => "/recruiter-dashboard",
    },

    {
      iconType: "settings",
      content: "Paramètres",
      route: () => "/recruiter-dashboard/setting",
    },
    {
      iconType: "logout",
      content: "Déconnexion",
      route: () => handleLogout(),
    },
  ];

  function handleClickOnSideBarItem() {
    navBarItemsContent[navBarItemsContent.length - 1].route();
    setIsSidebarOpen(false);
  }

  return (
    <div className="flex">
      {/* Fixed button for toggling sidebar on small screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <FaTimes className="text-2xl text-gray-800" />
        ) : (
          <FaBars className="text-2xl text-gray-800" />
        )}
      </button>

      {/* Sidebar */}
      <nav
        className={`bg-white text-blueColor flex flex-col min-h-screen shadow-lg fixed z-40 md:relative md:z-auto transition-transform duration-300 ${
          isSidebarOpen
            ? "translate-x-0 "
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex-grow flex flex-col justify-between overflow-y-auto">
          <br />
          <ul className="mt-5 list-none flex-grow">
            {navBarItemsContent.slice(0, -1).map((item, index) => {
              const isActive = location.pathname === item.route();
              const IconComponent = iconMap[item.iconType].component;

              return (
                <li key={index} className="mb-4">
                  <NavLink
                    to={item.route()}
                    className={`flex items-center gap-6 px-8 py-3 transition-colors duration-300 rounded-lg mb-4 ${
                      isActive
                        ? "bg-blue-600 text-white font-bold shadow-md"
                        : "hover:bg-blue-100 font-medium text-gray-700"
                    } sidebar-item`}
                    onClick={() => {
                      setIsSidebarOpen(false);
                    }}
                  >
                    <IconComponent
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-gray-700"
                      }`}
                    />
                    <span
                      className={`text-lg ${
                        isActive ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {item.content}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="mb-4 px-8">
            <span
              className="flex cursor-pointer items-center gap-6 px-8 py-3 transition-colors duration-300 hover:bg-blue-100 font-medium text-gray-700 sidebar-item rounded-lg"
              onClick={() => handleClickOnSideBarItem()}
            >
              <FaSignOutAlt className=" cursor-pointer text-lg text-gray-700 transition-colors duration-300" />
              <span className="text-lg cursor-pointer text-gray-700">
                {navBarItemsContent[navBarItemsContent.length - 1].content}
              </span>
            </span>
          </div>
        </div>
      </nav>

      {/* Overlay to close sidebar on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed  inset-0 bg-black opacity-50 md:hidden z-30 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-grow bg-white  md:ml-64">
        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default DashBoardSideBar;
