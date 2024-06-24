import DashBoardSideBar from "../../components/DashBoardSideBar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import CustomLoader from "../../components/CustomLoader";
import CorrectRedirection from "../CorrectRedirection";

const DashboardRecruiter = () => {
  const user = useSelector((state) => state.users.users);
  console.log(user);

  const isLoading = useSelector((state) => state.users.isLoading);
  console.log(isLoading);

  function _dashboardRecruiter() {
    if (isLoading) {
      return <CustomLoader />;
    } else if (user.role === "recruiter") {
      return (
        <div className="grid grid-cols-6 bg-[#F3F2F7]">
          <DashBoardSideBar />
          <div className=" h-[100%] col-span-5 ">
            <Outlet />
          </div>
        </div>
      );
    } else {
      <Navigate to="/employee-dashboard" />;
    }
  }

  const DashboardValue = () => {
    return <CorrectRedirection>{_dashboardRecruiter()}</CorrectRedirection>;
  };

  return DashboardValue();
};

export default DashboardRecruiter;
