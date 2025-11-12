const fs = require("fs");
const Report = require("../models/reportModel");
const Question = require("../models/questionModel");
const User = require("../models/user");
const { processResume } = require("../utils/aiProcessor");

const resumeTempStore = new Map();

// 🟢 Start Interview
exports.startInterview = async (req, res) => {
  try {
    const { candidateId, role, jobDescription } = req.body;
    const resumeFile = req.file;

    if (!candidateId || !role || !jobDescription)
      return res.status(400).json({ message: "Missing fields" });

    const resumePath =
      "C:/Users/HP/Desktop/InterVI/backend/uploads/resumes/Ishan_Amrit_Srivastava_Resume.pdf";

    // Fetch random DB questions
    const getRandom = (cat) =>
      Question.aggregate([
        { $match: { category: cat } },
        { $sample: { size: 3 } },
      ]);
    const [dbmsQ, osQ, cnQ, oopQ] = await Promise.all([
      getRandom("DBMS"),
      getRandom("OS"),
      getRandom("CN"),
      getRandom("OOP"),
    ]);

    // AI processing
    const aiOutput = await processResume(resumePath, jobDescription, role);

    // Build report structure (without answers)
    const reportStructure = {
      DBMS: dbmsQ.map((q) => ({
        questionId: q._id,
        question: q.question,
        aiScore: null,
      })),
      OS: osQ.map((q) => ({
        questionId: q._id,
        question: q.question,
        aiScore: null,
      })),
      CN: cnQ.map((q) => ({
        questionId: q._id,
        question: q.question,
        aiScore: null,
      })),
      OOP: oopQ.map((q) => ({
        questionId: q._id,
        question: q.question,
        aiScore: null,
      })),
      resume_summary: aiOutput.resume_summary,
      resume_scores: aiOutput.resume_scores,
      resumeBasedQuestions: aiOutput.resumeBasedQuestions,
      final_evaluation: aiOutput.final_evaluation,
    };

    // Save report
    const report = await Report.create({ candidateId, role, reportStructure });

    resumeTempStore.set(report._id.toString(), resumePath);

    res.status(201).json({
      message: "Interview started successfully",
      reportId: report._id,
      candidateId,
      reportStructure,
    });
  } catch (err) {
    console.error("Error starting interview:", err);
    res
      .status(500)
      .json({ message: "Error starting interview", error: err.message });
  }
};

// 🔵 End Interview
exports.endInterview = async (req, res) => {
  try {
    const { reportId, candidateId, reportStructure } = req.body;

    const report = await Report.findById(reportId);
    if (!report) return res.status(404).json({ message: "Report not found" });

    // Here: merge only AI scores, feedback, etc. No candidate answers saved
    report.reportStructure = {
      ...report.reportStructure,
      ...reportStructure,
    };
    await report.save();

    await User.findByIdAndUpdate(candidateId, {
      $push: { reports: report._id },
    });

    // Cleanup temp resume
    const resumePath = resumeTempStore.get(reportId);
    if (resumePath) {
      fs.unlink(resumePath, (err) => {
        if (err) console.error(err);
      });
      resumeTempStore.delete(reportId);
    }

    res.json({
      message: "Interview ended and report updated successfully",
      reportId: report._id,
    });
  } catch (err) {
    console.error("Error ending interview:", err);
    res
      .status(500)
      .json({ message: "Error ending interview", error: err.message });
  }
};

// 🟣 View Report
exports.viewReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findById(reportId);
    if (!report) return res.status(404).json({ message: "Report not found" });

    res.json({
      reportId: report._id,
      candidateId: report.candidateId,
      reportStructure: report.reportStructure,
    });
  } catch (err) {
    console.error("Error fetching report:", err);
    res
      .status(500)
      .json({ message: "Error fetching report", error: err.message });
  }
};
