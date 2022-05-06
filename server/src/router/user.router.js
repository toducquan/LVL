const express = require("express");
const { createStudentAccount, createTeacherAccount, getTeachers } = require("../controller/user.controller");
const verifyToken = require("../middleware/auth.middleware")
const router = express.Router();

router.post('/create-teacher', verifyToken, createTeacherAccount);
router.post('/create-student', verifyToken, createStudentAccount);
router.get('/teacher', verifyToken, getTeachers)

module.exports = router;