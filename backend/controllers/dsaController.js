const DSA = require("../models/datastructure");

// Create a new DSA question
exports.createDSAQuestion = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question field is required" });
    }

    const newQuestion = new DSA({ question });
    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error creating DSA question:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all DSA questions
exports.getDSAQuestions = async (req, res, next) => {
  try {
    const count = Math.floor(Math.random() * 3) + 3; // random number between 3-5

    const questions = await DSA.aggregate([{ $sample: { size: count } }]);

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching DSA questions:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete a DSA question
exports.deleteDSAQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await DSA.findOneAndDelete({ id }); // delete by custom auto-incremented ID

    if (!deleted) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted", deletedId: id });
  } catch (error) {
    console.error("Error deleting DSA question:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
