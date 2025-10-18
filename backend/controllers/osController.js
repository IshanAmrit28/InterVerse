const OS = require("../models/operatingSystem");
const SubjectController = require("./subjectController");

const osController = new SubjectController(OS);

module.exports = osController;
