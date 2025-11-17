// backend\controllers\reportController.js

const fs = require("fs");
const Report = require("../models/reportModel");
const Question = require("../models/questionModel");
const User = require("../models/user");
// ✅ Import the new evaluateAnswers function
const { processResume, evaluateAnswers } = require("../utils/aiProcessor");

const resumeTempStore = new Map();

// 🟢 Start Interview (Unchanged from previous step)
exports.startInterview = async (req, res) => {
  try {
  	const { candidateId, role, jobDescription } = req.body;
  	const resumeFile = req.file;

  	if (!candidateId || !role || !jobDescription)
  	return res.status(400).json({ message: "Missing required fields" });
  	
  	if (!resumeFile)
  	return res.status(400).json({ message: "Resume file is required" });

  	const resumePath = resumeFile.path;

  	// --- 1. Fetch DB questions and AI analysis in parallel ---
  	const getRandom = (cat) =>
  	Question.aggregate([
  	{ $match: { category: cat } },
  	{ $sample: { size: 3 } }, // Using 3 as an example
  	]);

  	const [dbmsQ, osQ, cnQ, oopQ, aiOutput] = await Promise.all([
  	getRandom("DBMS"),
  	getRandom("OS"),
  	getRandom("CN"),
  	getRandom("OOP"),
  	processResume(resumePath, jobDescription, role),
  	]);

  	// --- 2. Build the Report Structure for the DATABASE ---
  	const dbReportStructure = {
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
  	resumeBasedQuestions: aiOutput.questionsData.map((q) => ({
  	question: q, // AI questions don't have a questionId
  	aiScore: null,
  	})),
  	// Add the AI resume analysis
  	ResumeScore: aiOutput.scoreData.resumeScore,
  	feedbackOnResume: aiOutput.scoreData.feedbackOnResume,
  	hiringChance: aiOutput.scoreData.hiringChance,
  	};

  	// --- 3. Save the report to the Database ---
  	const report = await Report.create({
  	candidateId,
  	role,
  	jobDescription,
  	resume: resumePath, // Save the path to the resume
  	reportStructure: dbReportStructure,
  	});

  	// Store path for deletion at /end
  	resumeTempStore.set(report._id.toString(), resumePath);

  	// --- 4. Build the Report Structure for the CLIENT ---
  	const clientReportStructure = {
  	DBMS: dbReportStructure.DBMS.map((q) => ({
  	questionId: q.questionId,
  	question: q.question,
  	answer: "",
  	aiScore: null,
  	})),
  	OS: dbReportStructure.OS.map((q) => ({
  	questionId: q.questionId,
  	question: q.question,
  	answer: "",
  	aiScore: null,
  	})),
  	CN: dbReportStructure.CN.map((q) => ({
  	questionId: q.questionId,
  	question: q.question,
  	answer: "",
  	aiScore: null,
  	})),
  	OOP: dbReportStructure.OOP.map((q) => ({
  	questionId: q.questionId,
  	question: q.question,
  	answer: "",
  	aiScore: null,
  	})),
  	"Resume based question": dbReportStructure.resumeBasedQuestions.map(
  	(q) => ({
  	question: q.question,
  	answer: "",
  	aiScore: null,
  	})
  	),
  	};

  	// --- 5. Send the client-specific structure as a response ---
  	res.status(201).json({
  	message: "Interview started successfully",
  	reportId: report._id, // Send the ID
  	candidateId: candidateId,
  	reportStructure: clientReportStructure,
  	});
  } catch (err) {
  	console.error("Error starting interview:", err);
  	res
  	.status(500)
  	.json({ message: "Error starting interview", error: err.message });
  }
};

// 🔵 End Interview (MODIFIED)
exports.endInterview = async (req, res) => {
  try {
  	const { reportId, candidateId, reportStructure } = req.body;

  	// --- 1. Find the Report in the DB ---
  	const report = await Report.findById(reportId);
  	if (!report) return res.status(404).json({ message: "Report not found" });

  	// --- 2. Prepare QA data for AI Evaluation ---
  	const qaList = [];
  	const clientQuestions = reportStructure; // from req.body

  	// Helper to add questions to the list
  	const addToList = (category) => {
  	if (Array.isArray(category)) {
  		category.forEach(q => {
  		qaList.push({ question: q.question, answer: q.answer || "" });
  		});
  	}
  	};

  	addToList(clientQuestions.DBMS);
  	addToList(clientQuestions.OS);
  	addToList(clientQuestions.CN);
  	addToList(clientQuestions.OOP);
  	addToList(clientQuestions["Resume based question"]);

  	// --- 3. Call AI to evaluate answers ---
  	const aiEvaluation = await evaluateAnswers(qaList);

  	// Create a map of AI scores for easy lookup
  	const scoreMap = new Map(
  	aiEvaluation.scores_per_question.map(s => [s.question, s.aiScore])
  	);

  	// --- 4. Update the report in the DB with AI scores ---
  	
  	// Helper function to update a category
  	const updateCategoryScores = (dbCategory) => {
  	if (Array.isArray(dbCategory)) {
  		dbCategory.forEach(q => {
  		// q.question is the full question text
  		q.aiScore = scoreMap.get(q.question) || 0;
  		});
  	}
  	};

  	// Update scores for all categories in the report object
  	updateCategoryScores(report.reportStructure.DBMS);
  	updateCategoryScores(report.reportStructure.OS);
  	updateCategoryScores(report.reportStructure.CN);
  	updateCategoryScores(report.reportStructure.OOP);
  	updateCategoryScores(report.reportStructure.resumeBasedQuestions);

  	// Add the overall feedback and score
  	report.reportStructure.overallScore = aiEvaluation.overallScore;
  	report.reportStructure.feedbackOnInterviewAnswers = aiEvaluation.feedbackOnInterviewAnswers;

  	// Mark as modified before saving
  	report.markModified('reportStructure');

  	// --- 5. Save the updated report ---
  	await report.save();

  	// --- 6. Link to User and Clean up ---
  	await User.findByIdAndUpdate(candidateId, {
  	$push: { report: report._id },
  	});

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
ind }
};

// 🟣 View Report (Unchanged from previous step)
exports.viewReport = async (req, res) => {
  try {
  	const { reportId } = req.params;
  	const report = await Report.findById(reportId);
  	if (!report) return res.status(404).json({ message: "Report not found" });

  	const populateQuestions = async (qs) => {
  	if (!qs || qs.length === 0) return [];
  	const dbQIds = qs.filter(q => q.questionId).map(q => q.questionId);
  	
  	// Fetch the question text for all DB questions
  	const dbQuestions = await Question.find({ '_id': { $in: dbQIds } });
  	const questionMap = new Map(dbQuestions.map(q => [q._id.toString(), q.question]));

  	const populatedQs = qs.map(q => {
  	if (q.questionId) {
  	return {
  	questionId: q.questionId,
  	question: questionMap.get(q.questionId.toString()) || "Question not found",
   	aiScore: q.aiScore
  	}
  	}
  	// This is an AI question (resumeBased), it already has the question text
  	return {
  	question: q.question,
  	aiScore: q.aiScore
  	};
  	});
  	return populatedQs;
  	};

  	// Build the response structure
  	const responseStructure = {
  	...report.reportStructure._doc, // _doc gets the raw object
  	DBMS: await populateQuestions(report.reportStructure.DBMS),
  	OS: await populateQuestions(report.reportStructure.OS),
  	CN: await populateQuestions(report.reportStructure.CN),
  	OOP: await populateQuestions(report.reportStructure.OOP),
  	"Resume based question": report.reportStructure.resumeBasedQuestions.map(q => ({
  	question: q.question,
  	aiScore: q.aiScore
  	})),
  	resumeBasedQuestions: undefined // Remove the original key
  	};
  	
  	res.json({
  	reportId: report._id,
  	candidateId: report.candidateId,
  	reportStructure: responseStructure,
  	});
  } catch (err) {
  	console.error("Error fetching report:", err);
  	res
  	.status(500)
  	.json({ message: "Error fetching report", error: err.message });
  }
};