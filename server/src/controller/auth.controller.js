const User = require("../model/user.entity")
const bcrypt = require('bcrypt')
const { create } = require("../service/user.service")
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const user = await User.findOne({ email: req.body.email});
    if(user)
        return res.status(400).send({ mess: "user exist"})
    const newUser = await create(req.body);
    res.status(201).json(newUser);
}

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email});
    if(!user)
        return res.status(403).send({ mess: "incorrect email or password"});
    if( await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({
            email: user.email,
            role: user.role,
            username: user.username,
        }, `${process.env.JWT_SECRET}`
        , {
            expiresIn: '30d'
        })
        return res.status(200).send({token: token})
    }
    res.status(403).send({ mess: "incorrect email or password"});
}

module.exports = {
    register,
    login,
}