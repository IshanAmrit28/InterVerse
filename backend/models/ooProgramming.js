const SubjectFactory = require("./subjectModelFactory");
const OOPSModel = new SubjectFactory(
  "oops",
  "ooProgrammings",
  "oops_counter"
).createModel();
module.exports = OOPSModel;
