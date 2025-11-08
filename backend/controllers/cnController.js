const CN = require("../models/cnModel");
const SubjectController = require("./subjectController");

const cnController = new SubjectController(CN);

module.exports = cnController;
