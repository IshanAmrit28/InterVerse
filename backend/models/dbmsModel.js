const SubjectFactory = require("./subjectModelFactory");
const DBMSModel = new SubjectFactory("dbms", "dbms").createModel();
module.exports = DBMSModel;
