import React from "react";
import { Route, Routes } from "react-router-dom";
import EditResume from "./EditResume";
import PersonalDetails from "./editResume/PersonalDetails";
import Education from "./editResume/Education";
import AddJob from "./editResume/AddJob";
import AddInternship from "./editResume/AddInternship";
import EditJob from "./editResume/EditJob";
import EditInternship from "./editResume/EditInternship";
import EditGraduation from "./editResume/education/EditGraduation";
import EditSecondary from "./editResume/education/EditSecondary";
import EditSeniorSecondary from "./editResume/education/EditSeniorSecondary";

const ResumeRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EditResume />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/edit-education" element={<Education />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/add-internship" element={<AddInternship />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/edit-internship/:id" element={<EditInternship />} />
        <Route
          path="/edit-education/graduation/:id"
          element={<EditGraduation />}
        />
        <Route
          path="/edit-education/secondary/:id"
          element={<EditSecondary />}
        />
        <Route
          path="/edit-education/senior-secondary/:id"
          element={<EditSeniorSecondary />}
        />
      </Routes>
    </div>
  );
};

export default ResumeRoutes;
