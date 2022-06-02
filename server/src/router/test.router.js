const express = require("express");
const testController = require("../controller/test.controller");
const isManager = require("../middleware/manager.middleware")
const verifyToken = require("../middleware/auth.middleware")
const router = express.Router();

router.post('/', verifyToken, testController.create);
router.post('/create-grade', verifyToken, testController.createNewGrade);
router.get('/', verifyToken, testController.findAll)
router.get('/student-test', verifyToken, testController.getAllTestOfStudent)
router.post('/student-test/:id', verifyToken, testController.doExam)
router.get('/:id', testController.findOne)
router.get('/class/:id', verifyToken, isManager, testController.getListTotalMarkForClass);

module.exports = router;