const express = require("express");
const {
  addQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const questionRouter = express.Router();

// Base URL: /api/questions

questionRouter.post("/", addQuestion); // Add question
questionRouter.get("/", getQuestions); // Get all (with optional filter)
questionRouter.get("/:id", getQuestionById); // Get single question
questionRouter.put("/:id", updateQuestion); // Update question
questionRouter.delete("/:id", deleteQuestion); // Delete question

module.exports = questionRouter;
