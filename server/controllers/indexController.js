const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const { sendToken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imageKit = require("../utils/ImageKit").initImageKit();
const path = require("path");

exports.homepage = catchAsyncErrors((req, res, next) => {
  res.json({ message: "Secure homepage!!" });
});

exports.latestInternships = catchAsyncErrors(async (req, res, next) => {
  const { limit } = req.query;

  let query = Internship.find().sort({ createdAt: -1 }).populate("employee");

  if (limit) {
    query = query.limit(parseInt(limit));
  }

  const latestInternships = await query.exec();
  res.json({ latestInternships });
});

exports.latestJobs = catchAsyncErrors(async (req, res, next) => {
  const { limit } = req.query;

  let query = Job.find().sort({ createdAt: -1 }).populate("employee");

  if (limit) {
    query = query.limit(parseInt(limit));
  }

  const latestJobs = await query.exec();

  res.json({ latestJobs });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const { user_role } = req.cookies;
  if (user_role == "student") {
    res.redirect("/student");
  } else if (user_role == "employee") {
    res.redirect("/employee");
  }

  //
});

exports.currentStudent = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  res.json({ student, role: "student" });
});

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendToken(student, "student", 201, res);
});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!student)
    return next(
      new ErrorHandler(`Student not found with this email address`, 404)
    );

  const isMatch = student.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler(`Wrong Credentials`, 500));
  sendToken(student, "student", 200, res);
});

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("user_role");
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully signed out!!!" });
});

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body);
  // return;
  const student = await Student.findOne({ email: req.body.email }).exec();

  if (!student) {
    return next(
      new ErrorHandler(`Student not found with this email address`, 404)
    );
  }

  const url = `${req.body.url}${student._id}`;
  console.log({ url });
  sendmail(req, res, next, url);
  student.resetPasswordToken = 1;
  await student.save();
});

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(
      new ErrorHandler(`Student not found with this email address`, 404)
    );
  }

  if (student.resetPasswordToken === 1) {
    student.resetPasswordToken = 0;
    student.password = req.body.password;
    await student.save();
    res.status(200).json({
      message: "Password changed successfully!!!",
    });
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password Link! Please try again", 500)
    );
  }
});

exports.studentDeleteAccount = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.id);

  if (student) {
    await Internship.updateMany(
      { students: student._id },
      { $pull: { students: student._id } }
    );
    await Job.updateMany(
      { students: student._id },
      { $pull: { students: student._id } }
    );
    res.clearCookie("token"); // Replace 'token' with the name of the cookie you want to clear
    res.clearCookie("user_role");
    res
      .status(200)
      .json({ success: true, message: "Student account deleted successfully" });
  } else {
    res
      .status(404)
      .json({ success: false, message: "Student account not found" });
  }
});

exports.studentResetPassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  console.log("password --- ", req.body);
  student.password = req.body.password;
  await student.save();
  res.status(200).json({ message: "Password changed successfully!!!" });
  // sendToken(student, 201, res);
});

exports.studentAppliedInternships = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).populate({
    path: "internships",
    populate: { path: "employee" },
  });
  res.status(200).json({ internships: student.internships });
});

exports.studentAppliedJobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).populate({
    path: "jobs",
    populate: { path: "employee" },
  });
  console.log(student);
  res.status(200).json({ jobs: student.jobs });
});

exports.studentUpdate = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.id, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  res.status(200).json({
    success: true,
    message: "Student updated successfully!!",
    student,
  });
});

exports.studentAvatar = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);

  const file = req.files.avatar;

  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;

  if (student.avatar.fileId !== "") {
    await imageKit.deleteFile(student.avatar.fileId);
  }

  const { fileId, url } = await imageKit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });

  student.avatar = { fileId, url };
  await student.save();

  res.json({
    success: true,
    message: "Profile Updated Successfully",
    avatar: student.avatar,
  });
});

// --------------APPLY-INTERNSHIP--------------
exports.applyInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.id).exec();

  student.internships.push(internship._id);
  internship.students.push(student._id);

  await student.save();
  await internship.save();

  res.json({
    success: true,
    message: "Internship applied successfully!",
    resume: student.resume,
  });
});

// --------------APPLY-Job--------------
exports.applyJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const job = await Job.findById(req.params.id).exec();

  student.jobs.push(job._id);
  job.students.push(student._id);

  await student.save();
  await job.save();

  res.json({
    success: true,
    message: "Internship applied successfully!",
    resume: student.resume,
  });
});
