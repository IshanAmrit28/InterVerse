//backend\models\user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    userType: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },
    report: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // Fix: Must match the model name 'Report'
        ref: "Report",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);