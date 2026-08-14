const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/env")

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" })
    }

    req.userId = decodedToken.userId
    next()
  })
}

module.exports = verifyToken
