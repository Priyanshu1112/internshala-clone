const mongoose = require("mongoose");

const jobModel = new mongoose.Schema(
  {
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    profile: String,
    skill: String,
    jobType: { type: String, enum: ["In office", "Remote"] },
    openings: Number,
    description: { type: String },
    preference: { type: String },
    salary: Number,
    perks: String,
    assessments: String,
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobModel);

module.exports = Job;
