const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    username: String,
    age: String,
    role: Number,
    classId: {
        required: false,
        type:mongoose.Schema.Types.ObjectId,
    }, 
    subject: {
        required: false,
        type: String,
    }
})

module.exports = mongoose.model('User', userModel);