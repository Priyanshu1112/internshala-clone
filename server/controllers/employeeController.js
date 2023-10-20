const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Employee = require("../models/employeeModel");
const Internship = require("../models/internshipModel");
const Student = require("../models/studentModel");
const Job = require("../models/jobModel");
const { sendToken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imageKit = require("../utils/ImageKit").initImageKit();
const path = require("path");

exports.homepage = catchAsyncErrors((req, res, next) => {
  res.json({ message: "Secure Employee homepage!!" });
});

exports.currentEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id)
    .populate("internships")
    .populate("jobs")
    .exec();
  res.json({ employee, role: "employee" });
});

exports.employeesignup = catchAsyncErrors(async (req, res, next) => {
  const employee = await new Employee(req.body).save();
  sendToken(employee, "employee", 201, res);
});

exports.employeesignin = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!employee)
    return next(
      new ErrorHandler(`Employee not found with this email address`, 404)
    );

  const isMatch = employee.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler(`Wrong Credentials`, 500));
  sendToken(employee, "employee", 200, res);
});

exports.employeesignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("user_role");
  res.clearCookie("token");
  res.json({ message: "Successfully signed out!!!" });
});

exports.employeesendmail = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email }).exec();

  if (!employee) {
    return next(
      new ErrorHandler(`Employee not found with this email address`, 404)
    );
  }

  const url = `${req.protocol}://${req.get("host")}/employee/forget-link/${
    employee._id
  }`;

  sendmail(req, res, next, url);
  employee.resetPasswordToken = 1;
  await employee.save();
});

exports.employeeforgetlink = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(
      new ErrorHandler(`Employee not found with this email address`, 404)
    );
  }

  if (employee.resetPasswordToken === 1) {
    employee.resetPasswordToken = 0;
    employee.password = req.body.password;
    await employee.save();
    res.status(200).json({
      message: "Password changed successfully!!!",
    });
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password Link! Please try again", 500)
    );
  }
});

exports.employeeDeleteAccount = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findByIdAndDelete(req.id);

  if (employee) {
    const internships = await Internship.find({ employee: employee._id });
    for (const internship of internships) {
      const students = internship.students;
      await Student.updateMany(
        { _id: { $in: students } },
        { $pull: { internships: internship._id } }
      );
      await Internship.findByIdAndDelete(internship._id);
    }

    const jobs = await Job.find({ employee: employee._id });
    for (const job of jobs) {
      const students = job.students;
      await Student.updateMany(
        { _id: { $in: students } },
        { $pull: { jobs: job._id } }
      );
      await Job.findByIdAndDelete(job._id);
    }
    res.clearCookie("token"); // Replace 'token' with the name of the cookie you want to clear
    res.clearCookie("user_role");
    res.status(200).json({
      success: true,
      message: "Employee account deleted successfully",
    });
  } else {
    res
      .status(404)
      .json({ success: false, message: "Employee account not found" });
  }
});

exports.employeeResetPassword = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();

  employee.password = req.body.password;
  await employee.save();
  res.status(200).json({ message: "Password changed successfully!!!" });
  // sendToken(employee, 201, res);
});

exports.employeeUpdate = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findByIdAndUpdate(req.id, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  res.status(200).json({
    success: true,
    message: "Employee updated successfully!!",
    employee,
  });
});

exports.employeeAvatar = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id);

  const file = req.files.organizationLogo;

  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;

  if (employee.organizationLogo.fileId !== "") {
    await imageKit.deleteFile(employee.organizationLogo.fileId);
  }

  const { fileId, url } = await imageKit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });

  employee.organizationLogo = { fileId, url };
  await employee.save();

  res.json({ success: true, message: "Profile Updated Successfully" });
});

// ------------------INTERNSHIP--------------------

exports.createInternship = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id);
  
  const internship = await new Internship(req.body);
  internship.employee = employee._id;
  await internship.save();

  employee.internships.push(internship._id);
  employee.save();

  res.status(200).json({ success: true, internship });
});

exports.readInternship = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.id);
  const employee = await Employee.findById(req.id)
    .populate({ path: "internships", populate: { path: "students" } })
    .exec();
  res.status(200).json({ success: true, internships: employee.internships });
});

exports.readSingleInternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id)
    .populate("employee")
    .exec();

  res.status(200).json({ success: true, internship });
});

exports.getAppliedStudents = catchAsyncErrors(async (req, res, next) => {
  const students = await Internship.findOne({ _id: req.params.id });
  console.log(students);
});

// ------------------JOBS--------------------

exports.createJob = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id);

  const job = await new Job(req.body).save();
  job.employee = employee._id;
  await job.save();

  employee.jobs.push(job._id);
  employee.save();

  res.status(200).json({ success: true, job });
});

exports.readJob = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id)
    .populate({ path: "jobs", populate: { path: "students" } })
    .exec();
  res.status(200).json({ success: true, jobs: employee.jobs });
});

exports.readSingleJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id).populate("employee").exec();

  res.status(200).json({ success: true, job });
});
