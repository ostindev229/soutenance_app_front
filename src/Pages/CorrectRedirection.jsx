import { Navigate } from "react-router-dom";

function CorrectRedirection(prop) {
  const token = localStorage.getItem("userToken");
  console.log(token);
  if (!token) {
    return <Navigate to="/" />;
  }
  return prop.children;
}

export default CorrectRedirection;
