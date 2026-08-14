const mongoose = require("mongoose")
const { MONGODB_URI } = require("./env")

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Save Aahaar Account DB connected")
  } catch (err) {
    console.error("Save Aahaar DB connection error:", err)
    process.exit(1)
  }
}

module.exports = connectDB
