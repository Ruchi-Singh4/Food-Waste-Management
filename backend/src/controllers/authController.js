const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { JWT_SECRET } = require("../config/env")

const signup = (req, res) => {
  const { name, email, password, phone, userType } = req.body

  if (!name || !email || !password || !phone || !userType) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Failed to hash password:", err)
      return res.status(500).json({ error: "Failed to save user" })
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      userType,
    })

    newUser
      .save()
      .then((user) => {
        res.json(user)
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.status(400).json({ error: "Email already exists" })
        } else {
          console.log(err)
          res.status(500).json({ error: "Failed to save user" })
        }
      })
  })
}

const login = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" })
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" })
      }

      bcrypt.compare(password, user.password).then((passwordMatch) => {
        if (!passwordMatch) {
          return res.status(401).json({ error: "Invalid email or password" })
        }

        const token = jwt.sign(
          { userId: user._id, userType: user.userType },
          JWT_SECRET
        )
        console.log(token)
        res.cookie(token)
        res.json({ token, userType: user.userType })
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: err.message })
    })
}

module.exports = { signup, login }
