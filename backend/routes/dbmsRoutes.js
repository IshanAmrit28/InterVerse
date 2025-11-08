const express = require("express");
const dbmsController = require("../controllers/dbmsController");
const dbmsRouter = express.Router();

dbmsRouter.get("/", dbmsController.getQuestions);
// dbmsRouter.get("/:id", dbmsController.getQuestionById);
dbmsRouter.post("/", dbmsController.createQuestion);
dbmsRouter.delete("/:id", dbmsController.deleteQuestion);

module.exports = dbmsRouter;
