const CN = require("../models/computernetworks");
const SubjectController = require("./subjectController");

const cnController = new SubjectController(CN);

module.exports = cnController;
