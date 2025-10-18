const express = require("express");
const oopsController = require("../controllers/oopsController");
const oopsRouter = express.Router();

oopsRouter.get("/", oopsController.getQuestions);
oopsRouter.post("/", oopsController.createQuestion);
oopsRouter.delete("/:id", oopsController.deleteQuestion);

module.exports = oopsRouter;
