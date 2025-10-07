const express = require("express");
const dsaController = require("../controllers/dsaController");
const dsaRouter = express.Router();

dsaRouter.get("/", dsaController.getDSAQuestions);
dsaRouter.post("/", dsaController.createDSAQuestion);
dsaRouter.delete("/:id", dsaController.deleteDSAQuestion);

module.exports = dsaRouter;
