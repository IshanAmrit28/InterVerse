const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const ExistingIds = require("./existingIds"); // Import the ExistingIds model

const osSchema = mongoose.Schema(
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
  { collection: "operatingsystems" }
);

// Auto-increment ID
osSchema.plugin(AutoIncrement, { inc_field: "id", id: "os_counter" });

// ----------- Mongoose Middleware (Hooks) ------------

// After saving a question, add ID to ExistingIds.os
osSchema.post("save", async function (doc) {
  try {
    let existing = await ExistingIds.findOne();
    if (!existing) existing = new ExistingIds();

    if (!existing.os.includes(doc.id)) {
      existing.os.push(doc.id);
      await existing.save();
    }
  } catch (err) {
    console.error("Error updating ExistingIds after OS save:", err);
  }
});

// After deleting a question, remove ID from ExistingIds.os
osSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (!doc) return;
    let existing = await ExistingIds.findOne();
    if (!existing) return;

    existing.os = existing.os.filter((num) => num !== doc.id);
    await existing.save();
  } catch (err) {
    console.error("Error updating ExistingIds after OS delete:", err);
  }
});

module.exports = mongoose.model("OS", osSchema);
