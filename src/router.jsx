import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./Pages/Home";
import VerifOtp from "./components/VerifOtp";
import DashboardRecruiter from "./Pages/Recruiter/DashboardRecruiter";
import DashboardEmployer from "./Pages/Employer/DashboardEmployer";
import Index from "./Pages/Recruiter/Index";
import Form from "./Pages/Employer/Form";
import PostulateJob from "./components/PostulateJob";

import AdminLogin from "./Pages/AdminLogin";
import Verification from "./Pages/Verification";
import UpdateProfil from "./Pages/Employer/UpdateProfil";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Home />} key="3" />,
    <Route path="/verif-code" element={<VerifOtp />} key="4" />,
    <Route path="/otp" element={<VerifOtp />} key="4" />,
    <Route path="/signin" element={<Login />} key="5" />,
    <Route path="/recruiter-dashboard" element={<DashboardRecruiter />} key="1">
      <Route path="" element={<Index />} key="6" />
      <Route path="setting" element={<UpdateProfil />} key="6" />
    </Route>,
    <Route path="/employee-dashboard" element={<DashboardEmployer />} key="12">
      <Route path="" element={<Form />} key="6" />

      <Route path="setting" element={<UpdateProfil />} key="6" />
    </Route>,
    <Route path="/signup" element={<SignUp />} key="2" />,
    <Route
      path="/employee-dashboard"
      element={<DashboardEmployer />}
      key="8"
    />,
    <Route path="/postulate-form/:jobId" element={<PostulateJob />} key="9" />,
    <Route path="/admin" element={<AdminLogin />} key="10" />,
    <Route path="/verification" element={<Verification />} key="11" />,
  ])
);

export default router;
