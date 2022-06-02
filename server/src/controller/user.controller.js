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

module.exports = {
    create,
    findAll,
}