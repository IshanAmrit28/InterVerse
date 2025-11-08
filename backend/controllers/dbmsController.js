const DBMS = require("../models/dbmsModel");

const SubjectController = require("./subjectController");

const dbmsController = new SubjectController(DBMS);

module.exports = dbmsController;
