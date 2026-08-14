const InventoryItem = require("../models/InventoryItem")

const addInventoryItem = (req, res) => {
  const { itemName, itemQuantity, itemCost, itemPurchaseDate, itemExpiryDate } =
    req.body
  const userId = req.userId

  if (
    !itemName ||
    !itemQuantity ||
    !itemCost ||
    !itemPurchaseDate ||
    !itemExpiryDate
  ) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const newInventoryItem = new InventoryItem({
    itemName,
    itemQuantity,
    itemCost,
    itemPurchaseDate,
    itemExpiryDate,
    user: userId,
  })

  newInventoryItem
    .save()
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: "Failed to add item to inventory" })
    })
}

const deleteInventoryItem = (req, res) => {
  const itemId = req.params.id
  const userId = req.userId

  InventoryItem.findOneAndDelete({ _id: itemId, user: userId })
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: "Inventory item not found" })
      }

      res.json({ message: "Inventory item deleted successfully" })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: "Failed to delete inventory item" })
    })
}

const getInventoryItems = (req, res) => {
  const userId = req.userId

  InventoryItem.find({ user: userId })
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: "Failed to fetch inventory items" })
    })
}

const toggleInventoryItemConsumed = (req, res) => {
  const itemId = req.params.id
  const userId = req.userId

  InventoryItem.findOne({ _id: itemId, user: userId })
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: "Inventory item not found" })
      }

      item.consumed = !item.consumed

      item
        .save()
        .then((updatedItem) => {
          res.json(updatedItem)
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({ error: "Failed to update inventory item" })
        })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: "Failed to find inventory item" })
    })
}

module.exports = {
  addInventoryItem,
  deleteInventoryItem,
  getInventoryItems,
  toggleInventoryItemConsumed,
}
