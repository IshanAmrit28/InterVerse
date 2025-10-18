const DBMS = require("../models/dbms");

const SubjectController = require("./subjectController");

const dbmsController = new SubjectController(DBMS);

module.exports = dbmsController;
