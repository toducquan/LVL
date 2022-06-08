const GradeService = require("../service/grade.service")

const update = async (req, res) => {
    const newGrade = await GradeService.update(req.params.id, req.body);
    res.status(200).send(newGrade)
}

module.exports = {
    update,
}