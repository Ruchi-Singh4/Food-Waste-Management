const mongoose = require("mongoose")

const inventorySchema = new mongoose.Schema({
  itemName: String,
  itemQuantity: Number,
  itemCost: Number,
  itemPurchaseDate: Date,
  itemExpiryDate: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  consumed: { type: Boolean, default: false },
})

module.exports = mongoose.model("InventoryItem", inventorySchema)
