const mongoose = require("mongoose")

const foodDonationRequestSchema = new mongoose.Schema({
  title: String,
  description: String,
  requestedBy: String,
  status: {
    type: String,
    enum: ["pending", "fulfilled", "expired"],
    default: "pending",
  },
  associatedDonation: { type: mongoose.Schema.Types.ObjectId, ref: "Donation" },
})

module.exports = mongoose.model(
  "FoodDonationRequest",
  foodDonationRequestSchema
)
