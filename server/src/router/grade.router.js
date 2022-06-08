const express = require("express");
const router = express.Router();
const gradeController = require("../controller/grade.controller");

router.put('/:id', gradeController.update)

module.exports = router
