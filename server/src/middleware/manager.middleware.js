const role = require("../constant/role")

const isManager = (req, res, next) => {
    if (req.user.role != role.ADMIN && req.user.role != role.MANAGER)
        return res.status(403).send({ mess: "forbiden" });
    next();
}

module.exports = isManager;