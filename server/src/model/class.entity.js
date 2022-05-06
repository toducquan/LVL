const mongoose = require('mongoose');

const classModel = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    grade: Number,
    name: String,
    mathTeacher: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
    literatureTeacher: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
    englishTeacher: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
    biologyTeacher: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
    chemistryTeacher: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
})

module.exports = mongoose.model('Class', classModel);