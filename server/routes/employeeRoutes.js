const express = require("express");
const {
  homepage,
  employeesignup,
  employeesignin,
  employeesignout,
  employeeDeleteAccount,
  currentEmployee,
  employeesendmail,
  employeeforgetlink,
  employeeResetPassword,
  employeeUpdate,
  employeeAvatar,
  createInternship,
  readInternship,
  readSingleInternship,
  createJob,
  readJob,
  readSingleJob,
  getAppliedStudents,
} = require("../controllers/employeeController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", isAuthenticated, currentEmployee);

// POST /employee/signup
router.post("/signup", employeesignup);

// POST /employee/signin
router.post("/signin", employeesignin);

// GET /employee/signout
router.get("/signout", isAuthenticated, employeesignout);

// POST /employee/send-mail
router.post("/send-mail", employeesendmail);

// DELETE /employee/delete-employee
router.delete("/delete-employee", isAuthenticated, employeeDeleteAccount);

// GET /emplouee/forget-link/:id
router.get("/forget-link/:id", employeeforgetlink);

// POST /employee/reset-password/:id
router.post("/reset-password", isAuthenticated, employeeResetPassword);

// POST /employee/update
router.post("/update", isAuthenticated, employeeUpdate);

// POST /employee/avatar
router.post("/avatar", isAuthenticated, employeeAvatar);

// -----------------INTERNSHIPS---------------

// POST /employee/internship/create
router.post("/internship/create", isAuthenticated, createInternship);

// POST /employee/internship/read
router.get("/internship/read", isAuthenticated, readInternship);

router.get("/applied/:id", isAuthenticated, getAppliedStudents);

// POST /employee/internship/read/:id
router.get("/internship/read/:id", isAuthenticated, readSingleInternship);

// -----------------JOBS---------------

// POST /employee/job/create
router.post("/job/create", isAuthenticated, createJob);

// POST /employee/job/read
router.get("/job/read", isAuthenticated, readJob);

// POST /employee/job/read/:id
router.get("/job/read/:id", isAuthenticated, readSingleJob);

module.exports = router;
