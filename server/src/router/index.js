const express = require("express");
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const classRouter = require('./class.router');
const testRouter = require('./test.router');
const gradeRouter = require('./grade.router');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/class', classRouter);
router.use('/test', testRouter);
router.use('/grade', gradeRouter);

module.exports = router