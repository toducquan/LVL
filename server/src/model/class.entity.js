const mongoose = require('mongoose');

const classModel = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    hrm_id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
    math_id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
    english_id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
    literature_id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    }
}, { timestamps: true })

module.exports = mongoose.model('Class', classModel);