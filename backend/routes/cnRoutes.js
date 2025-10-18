const express = require("express");
const cnController = require("../controllers/cnController");
const cnRouter = express.Router();

cnRouter.get("/", cnController.getQuestions);
cnRouter.post("/", cnController.createQuestion);
cnRouter.delete("/:id", cnController.deleteQuestion);

module.exports = cnRouter;
