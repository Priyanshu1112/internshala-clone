const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minLength: [4, "First Name must be at least 4 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      minLength: [4, "Last Name must be at least 4 characters"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      minLength: [10, "Contact must be at least 10 characters"],
      maxLength: [10, "Contact must not exceed 10 characters"],
    },
    city: {
      type: String,
      required: [true, "City Name is required"],
      minLength: [3, "City should be at least 3 characters long"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      select: false,
      maxLength: [15, "Password should not exceed more than 15 characters"],
      minLength: [6, "Password should have atleast 6 characters"],
      // match: []
    },
    resetPasswordToken: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: Object,
      default: {
        fileId: "",
        url: "",
      },
    },
    resume: {
      education: [],
      jobs: [],
      internships: [],
      responsibilities: [],
      course: [],
      projects: [],
      skills: [],
      accomplishments: [],
    },
    internships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Internship",
      },
    ],
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

studentModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

studentModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

studentModel.methods.getJWTtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Student = mongoose.model("Student", studentModel);

module.exports = Student;
