const express = require("express");
const { register, login, getUserInfor } = require("../controller/auth.controller");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware")

router.post('/register', register);
router.post('/login', login);
router.get('/', verifyToken, getUserInfor);

module.exports = router;