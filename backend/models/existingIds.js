// const mongoose = require("mongoose");

// const existingIdsSchema = new mongoose.Schema({
//   dsa: {
//     type: [Number],
//     default: [],
//   },
//   os: {
//     type: [Number],
//     default: [],
//   },
//   dbms: {
//     type: [Number],
//     default: [],
//   },
//   cn: {
//     type: [Number],
//     default: [],
//   },
// });

// module.exports = mongoose.model("ExistingIds", existingIdsSchema);

const mongoose = require("mongoose");

const existingIdsSchema = new mongoose.Schema(
  {
    subjects: {
      type: Map,
      of: [Number],
      default: {},
    },
  },
  { strict: false }
);

module.exports = mongoose.model("ExistingIds", existingIdsSchema);
