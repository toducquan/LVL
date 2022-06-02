const role = require("../constant/role")

const isAdmin = (req, res, next) => {
    if (req.user.role != role.ADMIN)
        return res.status(403).send({ mess: "forbiden" });
    next();
}

module.exports = isAdmin;