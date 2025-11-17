//backend\routes\reportRoutes.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  startInterview,
  endInterview,
  viewReport,
} = require("../controllers/reportController.js");

const reportRouter = express.Router();

// 🗂️ Temporary resume upload folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/resumes/"),
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 🛣️ Routes
//
// ✅ FIX: Add 'upload.single("resumeFile")' middleware here
// This will parse the form and create req.body and req.file
//
reportRouter.post("/start", upload.single("resumeFile"), startInterview);
reportRouter.post("/end", endInterview);
reportRouter.get("/:reportId", viewReport);

module.exports = reportRouter;