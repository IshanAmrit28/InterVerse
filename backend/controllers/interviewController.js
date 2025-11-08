const InterviewReport = require("../models/interviewReport.js");
const DBMSModel = require("../models/dbmsModel.js");
const OSModel = require("../models/osModel.js");
const CNModel = require("../models/cnModel.js");
const OOPSModel = require("../models/oopModel.js");
const User = require("../models/user.js");

// helper function to get random questions
const getRandomQuestions = async (Model, count) => {
  return await Model.aggregate([{ $sample: { size: count } }]);
};

// 1️⃣ START INTERVIEW
const startInterview = async (req, res) => {
  try {
    const { candidateId, role } = req.body;
    if (!candidateId || !role)
      return res
        .status(400)
        .json({ message: "Candidate ID and role are required" });

    // fetch random 3 questions from each domain
    const dbms = await getRandomQuestions(DBMSModel, 3);
    const os = await getRandomQuestions(OSModel, 3);
    const cn = await getRandomQuestions(CNModel, 3);
    const oop = await getRandomQuestions(OOPSModel, 3);

    const report = new InterviewReport({
      candidate: candidateId,
      role,
      dbmsQuestions: dbms.map((q) => q._id),
      osQuestions: os.map((q) => q._id),
      cnQuestions: cn.map((q) => q._id),
      oopQuestions: oop.map((q) => q._id),
      startedAt: new Date(),
    });

    const savedReport = await report.save();

    res.status(200).json({
      message: "Interview started successfully",
      reportId: savedReport._id,
      questions: {
        DBMS: dbms,
        OS: os,
        CN: cn,
        OOP: oop,
      },
    });
  } catch (error) {
    console.error("Error starting interview:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// 2️⃣ END INTERVIEW
const endInterview = async (req, res) => {
  try {
    const { reportId, answers, overallScore, overallComment, resumeScore } =
      req.body;

    const report = await InterviewReport.findById(reportId);
    if (!report) return res.status(404).json({ message: "Report not found" });

    report.answers = answers; // array of answers with transcripts, aiScore, feedback
    report.overallScore = overallScore;
    report.overallComment = overallComment;
    report.resumeScore = resumeScore;
    report.completedAt = new Date();

    const savedReport = await report.save();

    // Push report ID into user's report array
    await User.findByIdAndUpdate(report.candidate, {
      $push: { report: savedReport._id },
    });

    res
      .status(200)
      .json({ message: "Interview completed and saved successfully" });
  } catch (error) {
    console.error("Error saving interview:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// 3️⃣ VIEW REPORT (Detailed)
const viewReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await InterviewReport.findById(reportId)
      .populate("candidate", "userName email")
      .populate("dbmsQuestions")
      .populate("osQuestions")
      .populate("cnQuestions")
      .populate("oopQuestions");

    if (!report) return res.status(404).json({ message: "Report not found" });

    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Export all functions in CommonJS style
module.exports = {
  startInterview,
  endInterview,
  viewReport,
};
