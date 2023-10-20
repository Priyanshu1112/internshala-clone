const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Student = require("../models/studentModel");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncErrors(async (req, res, next) => {
  const { resume } = await Student.findById(req.id).exec();

  res.json({ message: "Secure Resume Page", resume });
});

//----------------------EDUCATION-------------------

exports.addEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  student.resume.education.push({ ...req.body, id: uuidv4() });

  await student.save();

  res.json({ message: "Education added", resume: student.resume });
});

exports.editEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  const eduInd = student.resume.education.findIndex(
    (ind) => ind.id === req.params.eduID
  );

  student.resume.education[eduInd] = {
    ...student.resume.education[eduInd],
    ...req.body,
  };

  await student.save();

  res.json({ message: "Education  Updated!!!", resume: student.resume });
});

exports.deleteEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);

  const filteredEdu = student.resume.education.filter(
    (ind) => ind.id !== req.params.eduID
  );

  student.resume.education = filteredEdu;

  await student.save();

  res.json({ message: "Education Deleted!!!", resume: student.resume });
});

//----------------------JOB-------------------

exports.addJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  student.resume.jobs.push({ ...req.body, id: uuidv4() });

  await student.save();

  res.json({ message: "Job added", resume: student.resume });
});

exports.editJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  const jobInd = student.resume.jobs.findIndex(
    (ind) => ind.id === req.params.jobID
  );

  student.resume.jobs[jobInd] = {
    ...student.resume.jobs[jobInd],
    ...req.body,
  };

  await student.save();

  res.json({ message: "Job  Updated!!!", resume: student.resume });
});

exports.deleteJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);

  const filteredJob = student.resume.jobs.filter(
    (ind) => ind.id !== req.params.jobID
  );

  student.resume.jobs = filteredJob;

  await student.save();

  res.json({ message: "Job Deleted!!!", resume: student.resume });
});

//----------------------INTERNSHIPS-------------------

exports.addInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  student.resume.internships.push({ ...req.body, id: uuidv4() });

  await student.save();

  res.json({ message: "Intership added", resume: student.resume });
});

exports.editInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  const internInd = student.resume.internships.findIndex(
    (ind) => ind.id === req.params.internshipID
  );

  student.resume.internships[internInd] = {
    ...student.resume.internships[internInd],
    ...req.body,
  };

  await student.save();

  res.json({ message: "Internship  Updated!!!", resume: student.resume });
});

exports.deleteInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);

  const filteredIntern = student.resume.internships.filter(
    (ind) => ind.id !== req.params.internshipID
  );

  student.resume.internships = filteredIntern;

  await student.save();

  res.json({ message: "Internship Deleted!!!", resume: student.resume });
});

//----------------------RESPONSIBILITIES-------------------

exports.addResponsibilities = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  student.resume.responsibilities.push({ ...req.body, id: uuidv4() });

  await student.save();

  res.json({ message: "Responsibility added" });
});

exports.editResponsibilities = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  const resInd = student.resume.responsibilities.findIndex(
    (ind) => ind.id === req.params.responsID
  );

  student.resume.responsibilities[resInd] = {
    ...student.resume.responsibilities[resInd],
    ...req.body,
  };

  await student.save();

  res.json({ message: "Responsibility  Updated!!!" });
});

exports.deleteResponsibilities = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);

  const filteredRes = student.resume.responsibilities.filter(
    (ind) => ind.id !== req.params.responsID
  );

  student.resume.responsibilities = filteredRes;

  await student.save();

  res.json({ message: "Responsibility Deleted!!!" });
});

//----------------------COURSES-------------------

exports.addCourses = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  student.resume.course.push({ ...req.body, id: uuidv4() });

  await student.save();

  res.json({ message: "Course added" });
});

exports.editCourses = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  const corInd = student.resume.course.findIndex(
    (ind) => ind.id === req.params.coursesID
  );

  student.resume.course[corInd] = {
    ...student.resume.course[corInd],
    ...req.body,
  };

  await student.save();

  res.json({ message: "Course  Updated!!!" });
});

exports.deleteCourses = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);

  const filteredCor = student.resume.course.filter(
    (ind) => ind.id !== req.params.coursesID
  );

  student.resume.course = filteredCor;

  await student.save();

  res.json({ message: "Course Deleted!!!" });
});

//----------------------PROJECTS-------------------

exports.addProjects = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  student.resume.projects.push({ ...req.body, id: uuidv4() });

  await student.save();

  res.json({ message: "Project added" });
});

exports.editProjects = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  const eduInd = student.resume.projects.findIndex(
    (ind) => ind.id === req.params.projectID
  );

  student.resume.projects[eduInd] = {
    ...student.resume.projects[eduInd],
    ...req.body,
  };

  await student.save();

  res.json({ message: "Project  Updated!!!" });
});

exports.deleteProjects = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);

  const filteredProjects = student.resume.projects.filter(
    (ind) => ind.id !== req.params.projectID
  );

  student.resume.projects = filteredProjects;

  await student.save();

  res.json({ message: "Project Deleted!!!" });
});

//----------------------SKILLS-------------------

exports.addSkills = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  student.resume.skills.push({ ...req.body, id: uuidv4() });

  await student.save();

  res.json({ message: "Skill added" });
});

exports.editSkills = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  const skillInd = student.resume.skills.findIndex(
    (ind) => ind.id === req.params.skillID
  );

  student.resume.skills[skillInd] = {
    ...student.resume.skills[skillInd],
    ...req.body,
  };

  await student.save();

  res.json({ message: "Skill  Updated!!!" });
});

exports.deleteSkills = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);

  const filteredEdu = student.resume.skills.filter(
    (ind) => ind.id !== req.params.skillID
  );

  student.resume.skills = filteredEdu;

  await student.save();

  res.json({ message: "Skill Deleted!!!" });
});

//----------------------ACCOMPLISHMENTS-------------------

exports.addAccomplishments = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  student.resume.accomplishments.push({ ...req.body, id: uuidv4() });

  await student.save();

  res.json({ message: "Accomplishments added", resume: student.resume });
});

exports.editAccomplishments = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  const eduInd = student.resume.accomplishments.findIndex(
    (ind) => ind.id === req.params.accompID
  );

  student.resume.accomplishments[eduInd] = {
    ...student.resume.accomplishments[eduInd],
    ...req.body,
  };

  await student.save();

  res.json({ message: "Accomplishments  Updated!!!", resume: student.resume });
});

exports.deleteAccomplishments = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);

  const filteredEdu = student.resume.accomplishments.filter(
    (ind) => ind.id !== req.params.accompID
  );

  student.resume.accomplishments = filteredEdu;

  await student.save();

  res.json({ message: "Accomplishments Deleted!!!", resume: student.resume });
});
