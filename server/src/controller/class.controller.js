const role = require("../constant/role")
const classService = require('../service/class.service')

const findAll = async (req, res) => {
    const classes = await classService.findAll()
    res.status(200).send(classes);
}

const create = async (req, res) => {
    const newClass = await classService.create(req.body);
    res.status(200).send(newClass)
}

const findAllClassOfTeacher = async (req, res) => {
    const classes = await classService.findAllClassOfTeacher(req.user._id);
    res.status(200).send(classes)
}

const findOne = async (req, res) => {
    const classes = await classService.findOne(req.params.id);
    res.status(200).send(classes)
}

const update = async (req, res) => {
    const newClass = await classService.update(req.params.id, req.body);
    res.status(200).send(newClass)
}

const remove = async (req, res) => {
    await classService.remove(req.params.id);
    res.status(200).send({ mess: "delete successfully"})
}



module.exports = {
    findAll,
    create,
    findAllClassOfTeacher,
    findOne,
    update,
    remove,
}