//backend\routes\reportRoutes.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const { protect } = require("../middleware/authMiddleware");

// FIX: Import the necessary controller functions
const {
  startInterview,
  endInterview,
  viewReport,
} = require("../controllers/reportController"); // Assumes the controller path is correct

const reportRouter = express.Router();

// FIX: Define the 'storage' object for Multer before using it
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // IMPORTANT: Ensure 'uploads/resumes/' directory exists
    cb(null, "uploads/resumes/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Define upload object using the storage configuration
const upload = multer({ storage });

// 🛣️ Routes
// All core interview functionality is protected by 'protect' middleware
reportRouter.post(
  "/start",
  // protect, // Ensures user is logged in
  upload.single("resumeFile"), // Handles the file upload (file name must match client FormData key)
  startInterview
);
// reportRouter.post("/end", protect, endInterview); // Ensures user is logged in
reportRouter.post("/end", endInterview); // Ensures user is logged in
// reportRouter.get("/:reportId", protect, viewReport); // Ensures user is logged in to view report
reportRouter.get("/:reportId", viewReport); // Ensures user is logged in to view report

module.exports = reportRouter;
