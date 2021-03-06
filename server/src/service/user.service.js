const User = require("../model/user.entity")
const bcrypt = require('bcrypt')

const create = async (payload) => {
    try {
        const user = new User(payload);
        const hashPassword = await bcrypt.hash(payload.password, 10);
        user.password = hashPassword;
        return user.save();
    } catch (error) {
        console.log('err: ', error)
    }
}

const update = async (id, payload) => {
    try {
        const newUser =  await User.findByIdAndUpdate(id, {
            ...payload
        })
        return newUser
    } catch (error) {   
        console.log('err: ', error);
    }
}

const remove = async (id) => {
    try {
        await User.findByIdAndDelete(id);
    } catch (error) {
        
    }
}

const findAll = async () => {
    try {
        const teacher = await User.find({
            role: 2
        })
        return teacher;
    } catch (error) {
        console.log('err: ', error)
    }
}

const getAllStudentInClass = async (id) => {
    const student = await User.find({
        classId: id,
    })
    return student;
}

module.exports = {
    create,
    findAll,
    getAllStudentInClass,
    update,
    remove,
}