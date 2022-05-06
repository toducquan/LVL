const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =req.headers["access-token"]
  if (!token) {
    return res.status(403).send({mess: "A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({mess :"Invalid Token"});
  }
  next();
};

module.exports = verifyToken;