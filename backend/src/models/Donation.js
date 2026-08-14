const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  amount: Number,
  donationDate: Date,
  location: String,
  city: String,
  selectedInventoryItem: String,
})

module.exports = mongoose.model("Donation", donationSchema)
