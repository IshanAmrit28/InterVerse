const express = require("express");
const cnController = require("../controllers/cnController");
const cnRouter = express.Router();

cnRouter.get("/", cnController.getCNQuestions);
cnRouter.post("/", cnController.createCNQuestion);
cnRouter.delete("/:id", cnController.deleteCNQuestion);

module.exports = cnRouter;
