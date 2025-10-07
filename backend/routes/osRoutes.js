const express = require("express");
const osController = require("../controllers/osController");
const osRouter = express.Router();

osRouter.get("/", osController.getOSQuestions);
osRouter.post("/", osController.createOSQuestion);
osRouter.delete("/:id", osController.deleteOSQuestion);

module.exports = osRouter;
