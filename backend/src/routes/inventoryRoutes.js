const express = require("express")
const verifyToken = require("../middleware/auth")
const {
  addInventoryItem,
  deleteInventoryItem,
  getInventoryItems,
  toggleInventoryItemConsumed,
} = require("../controllers/inventoryController")

const router = express.Router()

router.post("/inventory", verifyToken, addInventoryItem)
router.get("/inventory", verifyToken, getInventoryItems)
router.put("/inventory/:id", verifyToken, toggleInventoryItemConsumed)
router.delete("/inventory/:id", verifyToken, deleteInventoryItem)

module.exports = router
