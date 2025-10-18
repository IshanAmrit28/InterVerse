const SubjectFactory = require("./subjectModelFactory");
const DSAModel = new SubjectFactory(
  "dsa",
  "datastructures",
  "dsa_counter"
).createModel();
module.exports = DSAModel;
