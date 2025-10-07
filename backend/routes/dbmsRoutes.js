const express = require("express");
const dbmsController = require("../controllers/dbmsController");
const dbmsRouter = express.Router();

dbmsRouter.get("/", dbmsController.getDBMSQuestions);
dbmsRouter.post("/", dbmsController.createDBMSQuestion);
dbmsRouter.delete("/:id", dbmsController.deleteDBMSQuestion);

module.exports = dbmsRouter;
