class SubjectController {
  constructor(model) {
    this.model = model;
  }

  // Create a new question
  createQuestion = async (req, res) => {
    try {
      const { question } = req.body;
      if (!question)
        return res.status(400).json({ message: "Question field is required" });

      const newQuestion = new this.model({ question });
      const savedQuestion = await newQuestion.save();
      res.status(201).json(savedQuestion);
    } catch (error) {
      console.error("Error creating question:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  // Get 3-5 random questions
  getQuestions = async (req, res) => {
    try {
      const count = Math.floor(Math.random() * 3) + 3;
      const questions = await this.model.aggregate([
        { $sample: { size: count } },
      ]);
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  // Delete a question by ID
  deleteQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await this.model.findOneAndDelete({ id });
      if (!deleted)
        return res.status(404).json({ message: "Question not found" });

      res.status(200).json({ message: "Question deleted", deletedId: id });
    } catch (error) {
      console.error("Error deleting question:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
}

module.exports = SubjectController;
