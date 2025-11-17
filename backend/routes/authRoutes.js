//backend\routes\authRoutes.js
const express = require("express");
const authRouter = express.Router();

// Controllers
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.get("/signup", authController.getSignup);
authRouter.post("/signup", authController.postSignup);
authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;
