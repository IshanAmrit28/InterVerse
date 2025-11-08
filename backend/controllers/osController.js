const OS = require("../models/osModel");
const SubjectController = require("./subjectController");

const osController = new SubjectController(OS);

module.exports = osController;
