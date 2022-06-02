const express = require("express");
const classController = require("../controller/class.controller");
const verifyToken = require("../middleware/auth.middleware")
const isManager = require("../middleware/manager.middleware")
const isAdmin = require("../middleware/admin.middleware")
const router = express.Router();

router.get('/', verifyToken, isManager, classController.findAll)
router.post('/', verifyToken, isAdmin, classController.create)
router.get('/teach', verifyToken, isManager, classController.findAllClassOfTeacher)
router.get('/:id', verifyToken, classController.findOne)
router.patch('/:id', verifyToken, classController.update)

module.exports = router