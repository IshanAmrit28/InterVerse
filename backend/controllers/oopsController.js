const OOPS = require("../models/oopModel");

const SubjectController = require("./subjectController");

const oopsController = new SubjectController(OOPS);

module.exports = oopsController;
