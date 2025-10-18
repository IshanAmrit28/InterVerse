const DSA = require("../models/datastructure");

const SubjectController = require("./subjectController");

const dsaController = new SubjectController(DSA);

module.exports = dsaController;
