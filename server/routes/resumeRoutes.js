const express = require("express");
const {
  resume,
  addEducation,
  deleteEducation,
  editEducation,
  addJob,
  editJob,
  deleteJob,
  addInternship,
  editInternship,
  deleteInternship,
  deleteResponsibilities,
  addResponsibilities,
  editResponsibilities,
  editCourses,
  addCourses,
  deleteCourses,
  addProjects,
  editProjects,
  deleteProjects,
  deleteSkills,
  editSkills,
  addSkills,
  editAccomplishments,
  addAccomplishments,
  deleteAccomplishments,
} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", isAuthenticated, resume);

// ----------------------EDUCATION-------------------

//POST /add-edu
router.post("/add-edu", isAuthenticated, addEducation);

//POST /edit-edu
router.post("/edit-edu/:eduID", isAuthenticated, editEducation);

//DELETE /delete-edu
router.delete("/delete-edu/:eduID", isAuthenticated, deleteEducation);

// ----------------------JOB-------------------

//POST /add-job
router.post("/add-job", isAuthenticated, addJob);

//POST /edit-job
router.post("/edit-job/:jobID", isAuthenticated, editJob);

//DELETE /delete-job
router.delete("/delete-job/:jobID", isAuthenticated, deleteJob);

// ----------------------INTERNSHIPS-------------------

//POST /add-internship
router.post("/add-internship", isAuthenticated, addInternship);

//POST /edit-internship
router.post("/edit-internship/:internshipID", isAuthenticated, editInternship);

//DELETE /delete-internship
router.delete(
  "/delete-internship/:internshipID",
  isAuthenticated,
  deleteInternship
);

// ----------------------RESPONSIBILITIES-------------------

//POST /add-responsibilities
router.post("/add-responsibilities", isAuthenticated, addResponsibilities);

//POST /edit-responsibilities
router.post(
  "/edit-responsibilities/:responsID",
  isAuthenticated,
  editResponsibilities
);

//DELETE /delete-responsibilities
router.delete(
  "/delete-responsibilities/:responsID",
  isAuthenticated,
  deleteResponsibilities
);

// ----------------------COURSES-------------------

//POST /add-courses
router.post("/add-courses", isAuthenticated, addCourses);

//POST /edit-courses
router.post("/edit-courses/:coursesID", isAuthenticated, editCourses);

//DELETE /delete-courses
router.delete("/delete-courses/:coursesID", isAuthenticated, deleteCourses);

// ----------------------PROJECTS-------------------

//POST /add-projects
router.post("/add-projects", isAuthenticated, addProjects);

//POST /edit-projects
router.post("/edit-projects/:projectID", isAuthenticated, editProjects);

//DELETE /delete-projects
router.delete("/delete-projects/:projectID", isAuthenticated, deleteProjects);

// ----------------------SKILLS-------------------

//POST /add-skills
router.post("/add-skills", isAuthenticated, addSkills);

//POST /edit-skills
router.post("/edit-skills/:skillID", isAuthenticated, editSkills);

//DELETE /delete-skills
router.delete("/delete-skills/:skillID", isAuthenticated, deleteSkills);

// ----------------------ACCOMPLISHMENTS-------------------

//POST /add-accomplishments
router.post("/add-accomplishments", isAuthenticated, addAccomplishments);

//POST /edit-accomplishments
router.post(
  "/edit-accomplishments/:accompID",
  isAuthenticated,
  editAccomplishments
);

//DELETE /delete-accomplishments
router.delete(
  "/delete-accomplishments/:accompID",
  isAuthenticated,
  deleteAccomplishments
);

module.exports = router;
