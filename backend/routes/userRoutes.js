//backend\routes\userRoutes.js
const express = require("express");
const userRouter = express.Router();
const authController = require("../controllers/authController");

// ==================== AUTH ROUTES ====================

// Signup route (with validation)
userRouter.post("/signup", authController.signup);

// Login route
userRouter.post("/login", authController.login);

// Logout route
userRouter.post("/logout", authController.logout);

module.exports = userRouter;
