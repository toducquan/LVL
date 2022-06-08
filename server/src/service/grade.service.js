const Grade = require('../model/grade.entity');

const create = async (payload) => {
    const newGrade = new Grade(payload);
    return newGrade.save();
}

const findAllGradeWithTestId = async (id) => {
    const grades = await Grade.find({
        test_id: id,
    })
    return grades;
}

const getAllGradeWithStudentId = async (id) => {
    const grades = await Grade.find({
        student_id: id,
    })
    return grades;
}

const updatePointWithTestIdAndStudentId = async (testId, studentId, newGrade) => {
    const oldGrade = await Grade.findOneAndUpdate({
        student_id: studentId,
        test_id: testId,
    }, {
        grade: newGrade
    }
    )
    return oldGrade;
}

const update = async (id, payload) => {
    await Grade.findByIdAndUpdate(id, {
        ...payload
    })
}

const deleteGradeWithTestId = async (testId) => {
    await Grade.find({
        test_id: testId,
    }).remove().exec()
}

module.exports = {
    create,
    findAllGradeWithTestId,
    getAllGradeWithStudentId,
    updatePointWithTestIdAndStudentId,
    update,
    deleteGradeWithTestId,
}