const mongoose = require("mongoose");

const internshipModel = new mongoose.Schema(
  {
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    profile: String,
    skill: String,
    internshipType: { type: String, enum: ["In office", "Remote"] },
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
      status: {
        type: String,
        enum: ["Fixed", "Negotiable", "Performance Based", "Unpaid"],
      },
      amount: Number,
    },
    perks: String,
    assessments: String,
  },
  { timestamps: true }
);

const Internship = mongoose.model("Internship", internshipModel);

module.exports = Internship;
