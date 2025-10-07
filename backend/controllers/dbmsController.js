const DBMS = require("../models/dbms");

// Create a new DBMS question
exports.createDBMSQuestion = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question field is required" });
    }

    const newQuestion = new DBMS({ question });
    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error creating DBMS question:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all DBMS questions
exports.getDBMSQuestions = async (req, res, next) => {
  try {
    const count = Math.floor(Math.random() * 3) + 3; // random number between 3-5

    const questions = await DBMS.aggregate([{ $sample: { size: count } }]);

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching DBMS questions:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete a DBMS question
exports.deleteDBMSQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await DBMS.findOneAndDelete({ id }); // delete by custom auto-incremented ID

    if (!deleted) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted", deletedId: id });
  } catch (error) {
    console.error("Error deleting DBMS question:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
