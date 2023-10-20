import React from "react";
import { Route, Routes } from "react-router-dom";
import ContentHome from "./ContentHome";
import Internships from "../../Internships";
import Jobs from "../../Jobs";
import SignUpEmployee from "../../auth/employee/SignUpEmployee";
import SignUpStudent from "../../auth/student/SignUpStudent";
import Login from "../../auth/Login";
import ResumeRoutes from "./ResumeRoutes";
import DetailInternship from "../../DetailInternship";
import DetailJob from "../../DetailJob";
import ChangePassword from "./ChangePassword";
import DeleteStudent from "./DeleteStudent";
import ForgetPassword from "./ForgetPassword";
import ChangeForgotPassword from "./ChangeForgotPassword";
import PostedInternships from "../../PostedIntenships";
import PostedJobs from "../../PostedJobs";
import AddJobs from "./AddJobs";
import AddInternships from "./AddInternships";
import Applications from "./Applications";
import StudentApplications from "./StudentApplications";

const Content = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ContentHome />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/internship/:id" element={<DetailInternship />} />
        <Route path="/job/:id" element={<DetailJob />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/registerStudent" element={<SignUpStudent />} />
        <Route path="/registerEmployee" element={<SignUpEmployee />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editResume/*" element={<ResumeRoutes />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/delete-account" element={<DeleteStudent />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="/student/forget-link/:id"
          element={<ChangeForgotPassword />}
        />
        <Route path="/posted-internships" element={<PostedInternships />} />
        <Route path="/posted-jobs" element={<PostedJobs />} />
        <Route path="/posted-jobs/add-jobs" element={<AddJobs />} />
        <Route
          path="/posted-internships/add-internships"
          element={<AddInternships />}
        />
        <Route path="/applications" element={<Applications />} />
        <Route path="/my-applications" element={<StudentApplications />} />
      </Routes>
    </>
  );
};

export default Content;
