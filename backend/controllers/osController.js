const OS = require("../models/operatingSystem");

// Create a new OS question
exports.createOSQuestion = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question field is required" });
    }

    const newQuestion = new OS({ question });
    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error creating OS question:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all OS questions
exports.getOSQuestions = async (req, res, next) => {
  try {
    const count = Math.floor(Math.random() * 3) + 3; // random number between 3-5

    const questions = await OS.aggregate([{ $sample: { size: count } }]);

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching OS questions:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete a OS question
exports.deleteOSQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await OS.findOneAndDelete({ id }); // delete by custom auto-incremented ID

    if (!deleted) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted", deletedId: id });
  } catch (error) {
    console.error("Error deleting OS question:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
