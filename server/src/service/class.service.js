const Class = require('../model/class.entity')

const getAllClass = async () => {
    try {
        const classes = await Class.find();
        return classes
    } catch (error) {
        console.log('err: ', error);
    }
}

const createClass = async (payload) => {
    try {
        const newClass = new Class(payload);
        return newClass.save();
    } catch (error) {
        console.log('err: ', error);
    }
}

module.exports = {
    getAllClass,
    createClass,
}