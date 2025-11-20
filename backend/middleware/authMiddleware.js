//backend\middleware\authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to protect routes (PROTECT remains the same)
const protect = async (req, res, next) => {
  let token; // Check for "Authorization: Bearer <token>"

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Verify token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("JWT Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};

// NEW: Middleware to check if the authenticated user is a recruiter
const isRecruiter = (req, res, next) => {
  // Check if req.user (attached by 'protect' middleware) exists and has the correct type
  if (req.user && req.user.userType === "recruiter") {
    next();
  } else {
    // Forbidden: 403 status code
    res
      .status(403)
      .json({ message: "Access denied. Requires Recruiter privileges." });
  }
};

module.exports = { protect, isRecruiter }; // <-- Export both
