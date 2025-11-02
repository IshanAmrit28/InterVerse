const mongoose = require("mongoose");

class SubjectModelFactory {
  constructor(subjectName, collectionName) {
    this.subjectName = subjectName;
    this.collectionName = collectionName;
  }

  createModel() {
    const schema = new mongoose.Schema(
      {
        question: { type: String, required: true, unique: true },
      },
      { collection: this.collectionName }
    );

    return mongoose.model(this.subjectName.toUpperCase(), schema);
  }
}

module.exports = SubjectModelFactory;
