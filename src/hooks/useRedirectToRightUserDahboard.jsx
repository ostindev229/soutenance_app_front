import { useNavigate } from "react-router-dom";

const useRedirectToRightUserDahboard = () => {
  // const user = useSelector((state) => state.users.users);
  const navigate = useNavigate();

  const navigateToRightUserDashboard = (user) => {
    const token = localStorage.getItem("userToken");
    console.log(token, "TOKEN");
    console.log(user, "USER IN CUSTOM HOOK");
    console.log(user.isVerified, "IS VERIFIED IN CUSTOM HOOK");
    if (user.isVerified && user.role === "recruiter" && token) {
      navigate("/recruiter-dashboard");
    } else if (user.isVerified && user.role === "employer" && token) {
      // Todo: Créer la route pour le dashboard de l'employer avec employee-dashboard comme nom de la route
      navigate("/employee-dashboard");
    } else {
      navigate("/verif-code/");
    }
  };

  return { navigateToRightUserDashboard };
};

export default useRedirectToRightUserDahboard;
