const interviewSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, enum: ["DBMS", "CN", "DSA", "OS"], required: true },
  questions: [
    {
      questionId: Number, // The question from DBMS/CN/DSA/OS
      questionText: String,
      answer: String, // User's answer
      score: Number, // After evaluation
    },
  ],
  totalScore: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Interview", interviewSchema);
