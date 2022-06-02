const mongoose = require('mongoose');

const gradeModel = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    student_id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
    test_id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
    grade: Number,
}, { timestamps: true })

module.exports = mongoose.model('Grade', gradeModel);