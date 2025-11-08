// backend/models/interviewReport.js
const mongoose = require("mongoose");

const interviewReportSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: { type: String, required: true },

  dbmsQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "DBMS" }],
  osQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "OS" }],
  cnQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "CN" }],
  oopQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "OOPS" }],

  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      domain: { type: String, enum: ["DBMS", "OS", "CN", "OOP"] },
      transcript: String,
      aiScore: Number,
      feedback: String,
    },
  ],

  resumeScore: Number,
  overallScore: Number,
  overallComment: String,

  startedAt: Date,
  completedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

const InterviewReport = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);

module.exports = InterviewReport;
