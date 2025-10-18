const express = require("express");
const dsaController = require("../controllers/dsaController");
const dsaRouter = express.Router();

dsaRouter.get("/", dsaController.getQuestions);
dsaRouter.post("/", dsaController.createQuestion);
dsaRouter.delete("/:id", dsaController.deleteQuestion);

module.exports = dsaRouter;
