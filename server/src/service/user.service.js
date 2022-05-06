const User = require("../model/user.entity")
const bcrypt = require('bcrypt')

const create = async (payload) => {
    try {
        const user = new User(payload);
        const hashPassword = await bcrypt.hash(payload.password, 10);
        user.password = hashPassword;
        return user.save();
    } catch (error) {
        console.log('err: ', error)
    }
}

module.exports = {
    create,
}