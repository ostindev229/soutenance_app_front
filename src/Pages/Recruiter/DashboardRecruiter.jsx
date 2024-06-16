import DashBoardSideBar from "../../components/DashBoardSideBar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import CustomLoader from "../../components/CustomLoader";

const DashboardRecruiter = () => {
  const user = useSelector((state) => state.users.users);
  console.log(user);

  const isLoading = useSelector((state) => state.users.isLoading);
  console.log(isLoading);

  const DashboardValue = () => {
    if (isLoading) {
      return <CustomLoader />;
    } else if (user.role === "recruiter") {
      return (
        <div className="grid grid-cols-6 bg-[#F3F2F7]">
          <DashBoardSideBar />
          <div className="pt-[30px] h-[100%] col-span-5 px-[30px]">
            <Outlet />
          </div>
        </div>
      );
    } else {
      <Navigate to="/employee-dashboard" />;
    }
  };

  return DashboardValue();
};

export default DashboardRecruiter;
