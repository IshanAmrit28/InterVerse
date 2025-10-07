const CN = require("../models/computernetworks");

// Create a new CN question
exports.createCNQuestion = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question field is required" });
    }

    const newQuestion = new CN({ question });
    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error creating CN question:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all CN questions
exports.getCNQuestions = async (req, res, next) => {
  try {
    const count = Math.floor(Math.random() * 3) + 3; // random number between 3-5

    const questions = await CN.aggregate([{ $sample: { size: count } }]);

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching CN questions:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete a CN question
exports.deleteCNQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await CN.findOneAndDelete({ id }); // delete by custom auto-incremented ID

    if (!deleted) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted", deletedId: id });
  } catch (error) {
    console.error("Error deleting CN question:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
