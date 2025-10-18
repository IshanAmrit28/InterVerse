const SubjectFactory = require("./subjectModelFactory");
const CNModel = new SubjectFactory(
  "cn",
  "computernetworks",
  "cn_counter"
).createModel();
module.exports = CNModel;
