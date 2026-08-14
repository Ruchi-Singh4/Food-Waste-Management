const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const connectDB = require("./config/db")
const routes = require("./routes")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
)

app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    console.error("Database connection error:", err.message)
    res.status(500).json({ error: "Database connection failed" })
  }
})

app.use(routes)

module.exports = app
