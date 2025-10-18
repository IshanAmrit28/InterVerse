const SubjectFactory = require("./subjectModelFactory");
const DBMSModel = new SubjectFactory(
  "dbms",
  "dbms",
  "dbms_counter"
).createModel();
module.exports = DBMSModel;
