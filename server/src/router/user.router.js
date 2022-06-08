const express = require("express");
const UserController = require("../controller/user.controller");
const isManager = require("../middleware/manager.middleware")
const verifyToken = require("../middleware/auth.middleware")
const router = express.Router();

router.post('/', verifyToken, isManager, UserController.create);
router.get('/', verifyToken, isManager, UserController.findAll);
router.put('/:id', verifyToken, UserController.update);
router.delete('/:id', verifyToken, UserController.remove);

module.exports = router;