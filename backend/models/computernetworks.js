const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const ExistingIds = require("./existingIds"); // Import the ExistingIds model

const cnSchema = mongoose.Schema(
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
  { collection: "computernetworks" }
);

// Auto-increment ID
cnSchema.plugin(AutoIncrement, { inc_field: "id", id: "cn_counter" });

// ----------- Mongoose Middleware (Hooks) ------------

// After saving a question, add ID to ExistingIds.cn
cnSchema.post("save", async function (doc) {
  try {
    let existing = await ExistingIds.findOne();
    if (!existing) existing = new ExistingIds();

    if (!existing.cn.includes(doc.id)) {
      existing.cn.push(doc.id);
      await existing.save();
    }
  } catch (err) {
    console.error("Error updating ExistingIds after CN save:", err);
  }
});

// After deleting a question, remove ID from ExistingIds.cn
cnSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (!doc) return;
    let existing = await ExistingIds.findOne();
    if (!existing) return;

    existing.cn = existing.cn.filter((num) => num !== doc.id);
    await existing.save();
  } catch (err) {
    console.error("Error updating ExistingIds after CN delete:", err);
  }
});

module.exports = mongoose.model("CN", cnSchema);
