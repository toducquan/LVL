const Class = require('../model/class.entity')

const findAll = async () => {
    try {
        const classes = await Class.find();
        return classes
    } catch (error) {
        console.log('err: ', error);
    }
}

const create = async (payload) => {
    try {
        const newClass = new Class(payload);
        return newClass.save();
    } catch (error) {
        console.log('err: ', error);
    }
}

const findOne = async (id) => {
    try {
        return await Class.findById(id);
    } catch (error) {
        console.log('err: ', error)
    }
}

const findAllClassOfTeacher = async (teacherId) => {
    try {
        const classes = await Class.find({
            $or: [
                {
                    hrm_id: teacherId,
                },
                {
                    math_id: teacherId,
                },
                {
                    english_id: teacherId,
                },
                {
                    literature_id: teacherId,
                },
            ]
        })
        return classes;
    } catch (error) {
        console.log('err: ', error);
    }
}

const update = async (id, payload) => {
    try {
        const classUpdate = await Class.findByIdAndUpdate(id, payload, { upsert: true });
        return classUpdate;
    } catch (error) {
        console.log('err: ', error);
    }
}

const remove = async (id) => {
    try {
        await Class.findByIdAndRemove(id);
    } catch (error) {
        console.log('err: ', error);
    }
}

module.exports = {
    findAll,
    create,
    findOne,
    findAllClassOfTeacher,
    update,
    remove,
}