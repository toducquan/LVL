const testService = require('../service/test.service');
const gradeService = require('../service/grade.service');

const create = async (req, res) => {
    const newTest = await testService.create(req.body, req.user._id);
    return res.status(201).send(newTest);
}

const findAll = async (req, res) => {
    const allTest = await testService.findAll(req.user._id);
    return res.status(200).send(allTest);
}

const getAllTestOfStudent = async (req, res) => {
    const allTest = await testService.getAllTestOfStudent(req.user._id);
    return res.status(200).send(allTest);
}

const doExam = async (req, res) => {
    await testService.doExam(req.params.id, req.body.answer, req.user._id);
    return res.status(201).send({ mess: "done" })
}

const getListTotalMarkForClass = async (req, res) => {
    const total = await testService.getListTotalMarkForClass(req.params.id);
    return res.status(200).send(total);
}

const findOne = async (req, res) => {
    const test = await testService.findOne(req.params.id);
    return res.status(200).send(test);
}

const createNewGrade = async (req, res) => {
    const newTest = await testService.create({
        class_id: req.body.class_id,
        factor: req.body.factor
    }, req.user._id);
    await Promise.all(
        req.body.data.map(async (item) => {
            await gradeService.updatePointWithTestIdAndStudentId(
                newTest._id.toString(),
                item.id,
                item.grade
            )
        })
    )
    return res.status(200).send({ mess: "create successfully" });
}

const update = async (req, res) => {
    const newTest = await testService.update(req.params.id, req.body);
    res.status(200).send(newClass)
}

const remove = async (req, res) => {
    await testService.remove(req.params.id);
    res.status(200).send({ mess: "delete successfully"})
}

module.exports = {
    create,
    findAll,
    getAllTestOfStudent,
    doExam,
    getListTotalMarkForClass,
    findOne,
    createNewGrade,
    update,
    remove,
}