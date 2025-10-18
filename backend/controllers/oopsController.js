const OOPS = require("../models/ooProgramming");

const SubjectController = require("./subjectController");

const oopsController = new SubjectController(OOPS);

module.exports = oopsController;
