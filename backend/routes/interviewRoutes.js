const express = require("express");
const interviewController = require("../controllers/interviewController");
const router = express.Router();

router.post("/start", interviewController.startInterview);
router.post("/end", interviewController.endInterview);
router.get("/:reportId", interviewController.viewReport);

module.exports = router;
