import { NavLink, useLocation } from "react-router-dom";
import { navBarItemsContent } from "../constants/constant.js";
import { FaHome, FaCogs, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

const iconMap = {
  dashboard: { component: FaTachometerAlt },
  home: { component: FaHome },
  settings: { component: FaCogs },
  logout: { component: FaSignOutAlt },
};

const DashBoardSideBar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white text-blueColor flex flex-col min-h-screen shadow-lg">
      <div className="flex-grow flex flex-col justify-between overflow-y-auto">
        <ul className="mt-8 list-none flex-grow">
          {navBarItemsContent.slice(0, -1).map((item, index) => {
            const isActive = location.pathname === item.route;
            const IconComponent = iconMap[item.iconType].component;

            return (
              <li key={index} className="mb-4">
                <NavLink
                  to={item.route}
                  className={`flex items-center gap-6 px-8 py-3 transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white font-bold"
                      : "hover:bg-gray-200 font-medium text-gray-700"
                  } sidebar-item`}
                >
                  <IconComponent
                    className={`w-6 h-6 ${
                      isActive ? "text-white" : "text-gray-500"
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
          <NavLink
            to={navBarItemsContent[navBarItemsContent.length - 1].route}
            className="flex items-center gap-6 px-8 py-3 transition-colors duration-200 hover:bg-gray-200 font-medium text-gray-700 sidebar-item"
          >
            <FaSignOutAlt className="w-6 h-6 mt-100  text-gray-500" />
            <span className="text-lg mt-100 text-gray-700">
              {navBarItemsContent[navBarItemsContent.length - 1].content}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default DashBoardSideBar;
