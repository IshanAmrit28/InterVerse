const SubjectFactory = require("./subjectModelFactory");
const OSModel = new SubjectFactory(
  "os",
  "operatingsystems",
  "os_counter"
).createModel();
module.exports = OSModel;
