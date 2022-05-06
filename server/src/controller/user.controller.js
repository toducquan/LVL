const User = require("../model/user.entity")
const { create } = require("../service/user.service")
const role = require('../constant/role')

const createTeacherAccount = async (req, res) => {
    if (req.user.role != 1)
        return res.status(403).send({ mess: "not found" })
    const user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send({ mess: "user exist" })
    const newUser = await create({ ...req.body, role: 2 });
    res.status(201).json(newUser);
}

const createStudentAccount = async (req, res) => {
    if (!req.user.role || req.user.role == 3)
        return res.send(403).send({ mess: "not found" })
    const user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send({ mess: "user exist" })
    const newUser = await create({ ...req.body, role: 3 });
    res.status(201).json(newUser);
}

const getTeachers = async (req, res) => {
    const teacher = await User.find({ role: role.TEACHER});
    if(req.query.subject) {
        const teacherWithSubject = await User.find({
            role: role.TEACHER,
            subject: req.query.subject
        })
        return res.status(200).send(teacherWithSubject)
    }
    res.status(200).send(teacher);
}

module.exports = {
    createStudentAccount,
    createTeacherAccount,
    getTeachers,
}