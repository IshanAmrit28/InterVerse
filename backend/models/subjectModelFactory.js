const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const ExistingIds = require("./existingIds");

class SubjectModelFactory {
  constructor(subjectName, collectionName, counterId) {
    this.subjectName = subjectName;
    this.collectionName = collectionName;
    this.counterId = counterId;
  }

  createModel() {
    const schema = mongoose.Schema(
      {
        id: { type: Number, unique: true },
        question: { type: String, required: true, unique: true },
      },
      { collection: this.collectionName }
    );

    // Auto-increment ID
    schema.plugin(AutoIncrement, { inc_field: "id", id: this.counterId });

    // Post-save hook to update ExistingIds dynamically
    schema.post(
      "save",
      async function (doc) {
        try {
          let existing = await ExistingIds.findOne();
          if (!existing) existing = new ExistingIds();

          // Initialize map for this subject if it doesn't exist
          if (!existing.subjects.has(this.subjectName)) {
            existing.subjects.set(this.subjectName, []);
          }

          const ids = existing.subjects.get(this.subjectName);

          if (!ids.includes(doc.id)) {
            ids.push(doc.id);
            existing.subjects.set(this.subjectName, ids);
            await existing.save();
          }
        } catch (err) {
          console.error(
            `Error updating ExistingIds after ${this.subjectName} save:`,
            err
          );
        }
      }.bind(this)
    );

    // Post-delete hook to update ExistingIds dynamically
    schema.post(
      "findOneAndDelete",
      async function (doc) {
        try {
          if (!doc) return;
          let existing = await ExistingIds.findOne();
          if (!existing) return;

          if (existing.subjects.has(this.subjectName)) {
            const ids = existing.subjects
              .get(this.subjectName)
              .filter((num) => num !== doc.id);

            existing.subjects.set(this.subjectName, ids);
            await existing.save();
          }
        } catch (err) {
          console.error(
            `Error updating ExistingIds after ${this.subjectName} delete:`,
            err
          );
        }
      }.bind(this)
    );

    return mongoose.model(this.subjectName.toUpperCase(), schema);
  }
}

module.exports = SubjectModelFactory;
