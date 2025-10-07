const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const ExistingIds = require("./existingIds"); // Import the ExistingIds model

const dsaSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    question: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "datastructures" } // fixed typo in collection name
);

// Auto-increment ID
dsaSchema.plugin(AutoIncrement, { inc_field: "id", id: "dsa_counter" });

// ----------- Mongoose Middleware (Hooks) ------------

// After saving a question, add ID to ExistingIds.dsa
dsaSchema.post("save", async function (doc) {
  try {
    let existing = await ExistingIds.findOne();
    if (!existing) existing = new ExistingIds();

    if (!existing.dsa.includes(doc.id)) {
      existing.dsa.push(doc.id);
      await existing.save();
    }
  } catch (err) {
    console.error("Error updating ExistingIds after DSA save:", err);
  }
});

// After deleting a question, remove ID from ExistingIds.dsa
dsaSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (!doc) return;
    let existing = await ExistingIds.findOne();
    if (!existing) return;

    existing.dsa = existing.dsa.filter((num) => num !== doc.id);
    await existing.save();
  } catch (err) {
    console.error("Error updating ExistingIds after DSA delete:", err);
  }
});

module.exports = mongoose.model("DSA", dsaSchema);
