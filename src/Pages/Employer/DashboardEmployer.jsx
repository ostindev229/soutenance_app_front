import SecondDashBoardSideBar from "../../components/SecondDashBoardSideBar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import CustomLoader from "../../components/CustomLoader";
import CorrectRedirection from "../CorrectRedirection";

const DashboardEmployer = () => {
  const user = useSelector((state) => state.users.users);
  console.log(user);

  const isLoading = useSelector((state) => state.users.isLoading);
  console.log(isLoading);

  function _dashboardRecruiter() {
    if (isLoading) {
      return <CustomLoader />;
    } else if (user.role === "employer") {
      return (
        <div className="grid grid-cols-6 bg-[#F3F2F7]">
          <SecondDashBoardSideBar />
          <div className=" h-[100%] col-span-5 ">
            <Outlet />
          </div>
        </div>
      );
    } else {
      <Navigate to="/recruiter-dashboard" />;
    }
  }

  const DashboardValue = () => {
    return <CorrectRedirection>{_dashboardRecruiter()}</CorrectRedirection>;
  };

  return DashboardValue();
};

export default DashboardEmployer;
