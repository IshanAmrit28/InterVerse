const questionSchema = mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  question: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
});
module.exports = mongoose.model("CompanyAIQuestion", questionSchema);
