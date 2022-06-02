const mongoose = require('mongoose');

const testModel = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    user_id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
    deadline: {
        required: false,
        type: String,
    },
    factor: Number,
    question: {
        required: false,
        type: Object,
    },
})

module.exports = mongoose.model('Test', testModel);