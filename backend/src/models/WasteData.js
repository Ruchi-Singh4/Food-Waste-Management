const mongoose = require("mongoose")

const wasteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  foodItem: String,
  foodQuantity: Number,
  foodReason: String,
  foodWasteDate: Date,
  foodAddTxt: String,
})

module.exports = mongoose.model("WasteData", wasteSchema)
