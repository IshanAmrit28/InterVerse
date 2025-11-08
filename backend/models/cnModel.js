const SubjectFactory = require("./subjectModelFactory");
const CNModel = new SubjectFactory("cn", "computernetworks").createModel();
module.exports = CNModel;
