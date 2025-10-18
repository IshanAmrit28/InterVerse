const express = require("express");
const osController = require("../controllers/osController");
const osRouter = express.Router();

osRouter.get("/", osController.getQuestions);
osRouter.post("/", osController.createQuestion);
osRouter.delete("/:id", osController.deleteQuestion);

module.exports = osRouter;
