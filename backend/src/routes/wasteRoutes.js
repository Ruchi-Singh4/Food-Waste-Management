const express = require("express")
const verifyToken = require("../middleware/auth")
const { createWasteData, getWasteData } = require("../controllers/wasteController")

const router = express.Router()

router.post("/waste", verifyToken, createWasteData)
router.get("/waste", verifyToken, getWasteData)

module.exports = router
