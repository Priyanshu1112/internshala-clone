const express = require("express");
const {
  homepage,
  latestInternships,
  studentsignup,
  studentsignin,
  studentsignout,
  studentDeleteAccount,
  currentUser,
  currentStudent,
  studentsendmail,
  studentforgetlink,
  studentResetPassword,
  studentUpdate,
  studentAvatar,
  applyInternship,
  applyJob,
  latestJobs,
  studentAppliedJobs,
  studentAppliedInternships,
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", homepage);

// GET /latestInternships
router.get("/latestInternships", latestInternships);

// GET /latestJobs
router.get("/latestJobs", latestJobs);

// GET /current
router.get("/currentUser", isAuthenticated, currentUser);

// GET /
router.get("/student", isAuthenticated, currentStudent);

// POST /student/signup
router.post("/student/signup", studentsignup);

// POST /student/signin
router.post("/student/signin", studentsignin);

// GET /student/signout
router.get("/student/signout", isAuthenticated, studentsignout);

//  DELETE /student/delete-account
router.delete("/student/delete-account", isAuthenticated, studentDeleteAccount);

// POST /student/send-mail
router.post("/student/send-mail", studentsendmail);

// GET /student/forget-link/:studentid
router.post("/student/forget-link/:id", studentforgetlink);

// POST /student/reset-password/:studentid
router.post("/student/reset-password", isAuthenticated, studentResetPassword);

// POST /student/update
router.post("/student/update", isAuthenticated, studentUpdate);

// POST /student/avatar
router.post("/student/avatar", isAuthenticated, studentAvatar);

router.get(
  "/student/applied/internships",
  isAuthenticated,
  studentAppliedInternships
);

router.get("/student/applied/jobs", isAuthenticated, studentAppliedJobs);

//------------APPLY-INTERNSHIP--------------

//POST /student/apply-internship/:internshipID
router.post("/student/apply/internship/:id", isAuthenticated, applyInternship);

//------------APPLY-JOB--------------------

//POST /student/apply/job/:id
router.post("/student/apply/job/:id", isAuthenticated, applyJob);

module.exports = router;
