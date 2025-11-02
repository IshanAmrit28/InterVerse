const SubjectFactory = require("./subjectModelFactory");
const OSModel = new SubjectFactory("os", "operatingsystems").createModel();
module.exports = OSModel;
