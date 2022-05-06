const role = require("../constant/role")
const classService = require("../service/class.service")

const getAllClasses = async (req, res) => {
    if(req.user.role != role.ADMIN)
        return res.status(403).send({ mess: "not found"})
    const classes = await classService.getAllClass();
    res.status(200).send(classes)
}

const createNewClass = async (req, res) => {
    if(req.user.role != role.ADMIN)
        return res.status(403).send({ mess: "not found"})
    const newClass = await classService.createClass(req.body);
    res.status(200).send(newClass)
}

module.exports = {
    getAllClasses,
    createNewClass,
}