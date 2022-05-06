const express = require("express");
const classController = require("../controller/class.controller");
const verifyToken = require("../middleware/auth.middleware")
const router = express.Router();

router.get('/', verifyToken, classController.getAllClasses)
router.post('/', verifyToken, classController.createNewClass)

module.exports = router