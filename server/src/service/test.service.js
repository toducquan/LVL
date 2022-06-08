const userService = require('./user.service');
const gradeService = require('./grade.service');
const Test = require('../model/test.entity')
const User = require("../model/user.entity")

const create = async (payload, user_id) => {
    const { class_id, ...exam } = payload;
    const test = new Test({ ...exam, user_id: user_id });
    const result = await test.save();
    const studentInClass = await userService.getAllStudentInClass(class_id);
    await Promise.all(
        studentInClass.map(async (item) => {
            await gradeService.create({
                student_id: item._id,
                test_id: result._id,
                grade: 0,
            });
        }),
    );
    return result;
}

const getAllTestOfStudent = async (student_id) => {
    try {
        const grades = await gradeService.getAllGradeWithStudentId(
            student_id,
        );
        const studentTest = await Promise.all(
            grades.map(async (item) => {
                const test = await Test.findById(item.test_id);
                
                return {
                    ...test.toJSON(),
                    grade: item.grade,
                };
            }),
        );
        return studentTest;
    } catch (error) { }
}

const findAll = async (id) => {
    try {
        const tests = await Test.find({
            user_id: id,
            question: {
                "$nin": [null, ""]
            }
        });
        return tests;
    } catch (error) { }
}

const getFactorWithTestId = async (id) => {
    try {
        const test = await Test.findById(id);
        return test.factor;
    } catch (error) { }
}

const countTotalPointForAStudent = (listPoint) => {
    const totalPoint = listPoint.reduce((total, currentValue) => {
        return total + currentValue.grade * currentValue.factor;
    }, 0);
    const totalFactor = listPoint.reduce((total, currentValue) => {
        return total + currentValue.factor;
    }, 0);
    return totalPoint / totalFactor || 0;
}

const getListTotalMarkForClass = async (classId) => {
    try {
        let excellent = 0;
        let fairly = 0;
        let medium = 0;
        let weak = 0;
        const students = await userService.getAllStudentInClass(classId);
        const listTotalPoint = await Promise.all(
            students.map(async (item) => {
                const listGrade = await gradeService.getAllGradeWithStudentId(
                    item._id,
                );
                const listPoint = await Promise.all(
                    listGrade.map(async (gradeItem) => {
                        const factor = await getFactorWithTestId(gradeItem.test_id);
                        return {
                            factor: factor,
                            grade: gradeItem.grade,
                        };
                    }),
                );
                const totalPointForAStudent =
                    countTotalPointForAStudent(listPoint);
                if (totalPointForAStudent >= 8) excellent += 1;
                if (totalPointForAStudent >= 6.5 && totalPointForAStudent < 8) fairly += 1;
                if (totalPointForAStudent >= 5 && totalPointForAStudent < 6.5) medium += 1;
                if (totalPointForAStudent >= 0 && totalPointForAStudent < 5) weak += 1;
                return {
                    ...item.toJSON(),
                    total: totalPointForAStudent,
                };
            }),
        );
        return {
            data: [
                ...listTotalPoint
            ],
            excellent,
            fairly,
            medium,
            weak
        };
    } catch (error) { }
}

const doExam = async (test_id, answer, student_id) => {
    try {
        const tests = await Test.findById(test_id);
        const correctAns = tests.question.correct_ans;
        let point = 0;
        for (let i = 0; i < correctAns.length; i++) {
            if (correctAns[i] == answer[i]) {
                point += 1;
            }
        }
        await gradeService.updatePointWithTestIdAndStudentId(
            test_id,
            student_id,
            (point * 10) / correctAns.length,
        );
    } catch (error) {
        console.log('err: ', error)
    }
}

const findOne = async (id) => {
    try {
        const grade = await gradeService.findAllGradeWithTestId(id);
        const gradeWithStudentName = await Promise.all(
            grade.map(async (item) => {
                const user = await User.findById(item.student_id);
                return {
                    ...item.toJSON(),
                    student_name: user.name,
                };
            }),
        );
        return gradeWithStudentName;
    } catch (error) { }
}

const update = async (id) => {
    await Test.findByIdAndUpdate(id, {
        ...payload
    })
}

const remove = async (id) => {
    await Test.findByIdAndRemove(id);
    await gradeService.deleteGradeWithTestId(id);
}

module.exports = {
    create,
    getAllTestOfStudent,
    getFactorWithTestId,
    getListTotalMarkForClass,
    doExam,
    findOne,
    findAll,
    update,
    remove,
}