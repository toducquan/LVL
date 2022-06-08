const User = require("../model/user.entity")
const UserService = require("../service/user.service")
const role = require('../constant/role')

const create = async (req, res) => {
    const newUser = await UserService.create(req.body);
    res.status(201).json(newUser);
}

const findAll = async (req, res) => {
    const teacher = await UserService.findAll();
    res.status(200).send(teacher);
}

const update = async (req, res) => {
    const newUser = await UserService.update(req.params.id, req.body);
    res.status(200).send(newUser)
}

const remove = async (req, res) => {
    await UserService.remove(req.params.id);
    res.status(200).send({ mess: "delete successfully"})
}

module.exports = {
    create,
    findAll,
    update,
    remove,
}