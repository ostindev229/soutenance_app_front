import { NavLink, useLocation } from "react-router-dom";
import { secondNavBarItemsContent } from "../constants/constant.js";
import { FaHome, FaCogs, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

const iconMap = {
  dashboard: { component: FaTachometerAlt },
  home: { component: FaHome },
  settings: { component: FaCogs },
  logout: { component: FaSignOutAlt },
};

const SecondDashBoardSideBar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white text-blueColor flex flex-col min-h-screen shadow-lg">
      <div className="flex-grow flex flex-col justify-between overflow-y-auto">
        <ul className="mt-8 list-none flex-grow">
          {secondNavBarItemsContent.slice(0, -1).map((item, index) => {
            const isActive = location.pathname === item.route;
            const IconComponent = iconMap[item.iconType].component;

            return (
              <li key={index} className="mb-4">
                <NavLink
                  to={item.route}
                  className={`flex items-center gap-6 px-8 py-3 transition-colors duration-300 rounded-lg ${
                    isActive
                      ? "bg-blue-600 text-white font-bold shadow-md"
                      : "hover:bg-blue-100 font-medium text-gray-700"
                  } sidebar-item`}
                >
                  <IconComponent
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-blue-600"
                    }`}
                  />
                  <span
                    className={`text-lg transition-colors duration-300 ${
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
            to={
              secondNavBarItemsContent[secondNavBarItemsContent.length - 1]
                .route
            }
            className="flex items-center gap-6 px-8 py-3 transition-colors duration-300 hover:bg-blue-100 font-medium text-gray-700 sidebar-item rounded-lg"
          >
            <FaSignOutAlt className="w-6 h-6 text-blue-600 transition-colors duration-300" />
            <span className="text-lg text-gray-700 transition-colors duration-300">
              {
                secondNavBarItemsContent[secondNavBarItemsContent.length - 1]
                  .content
              }
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default SecondDashBoardSideBar;
