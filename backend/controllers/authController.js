//backend\controllers\authController.js
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// 🔹 Helper: Generate JWT
const generateToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, userType: user.userType },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

// ==================== SIGNUP ====================
exports.signup = [
  // Validation
  check("userName", "Name is required").notEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Passwords do not match");
    return true;
  }),
  check("userType", "Please select a user type").notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map((e) => e.msg) });
    }

    try {
      const { userName, email, password, userType } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "Email already registered" });

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        userName,
        email,
        password: hashedPassword,
        userType,
      });

      const token = generateToken(user);

      res.status(201).json({
        message: "Signup successful",
        user: { id: user._id, userName, email, userType },
        token,
      });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// ==================== LOGIN ====================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    // FIX: Select ALL user fields except the password ('+report' ensures the report array is included)
    const user = await User.findOne({ email }).select(
      "+report +userName +email +userType +createdAt +updatedAt"
    );
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user);

    // FIX: Send the complete user object (excluding password) in the response
    const userResponse = {
      id: user._id,
      userName: user.userName,
      email: user.email,
      userType: user.userType,
      report: user.report, // This is the array of report IDs
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({
      message: "Login successful",
      user: userResponse, // Sending the full data structure
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ==================== LOGOUT ====================
exports.logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
