const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const ExistingIds = require("./existingIds"); // Import the ExistingIds model

const dbmsSchema = mongoose.Schema(
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
  { collection: "dbms" }
);

// Auto-increment ID
dbmsSchema.plugin(AutoIncrement, { inc_field: "id", id: "dbms_counter" });

// ----------- Mongoose Middleware (Hooks) ------------

// After saving a question, add ID to ExistingIds.dbms
dbmsSchema.post("save", async function (doc) {
  try {
    let existing = await ExistingIds.findOne();
    if (!existing) existing = new ExistingIds();

    if (!existing.dbms.includes(doc.id)) {
      existing.dbms.push(doc.id);
      await existing.save();
    }
  } catch (err) {
    console.error("Error updating ExistingIds after DBMS save:", err);
  }
});

// After deleting a question, remove ID from ExistingIds.dbms
dbmsSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (!doc) return;
    let existing = await ExistingIds.findOne();
    if (!existing) return;

    existing.dbms = existing.dbms.filter((num) => num !== doc.id);
    await existing.save();
  } catch (err) {
    console.error("Error updating ExistingIds after DBMS delete:", err);
  }
});

module.exports = mongoose.model("DBMS", dbmsSchema);
