const express = require("express")
const authRoutes = require("./authRoutes")
const donationRoutes = require("./donationRoutes")
const donationRequestRoutes = require("./donationRequestRoutes")
const inventoryRoutes = require("./inventoryRoutes")
const wasteRoutes = require("./wasteRoutes")

const router = express.Router()

router.use(authRoutes)
router.use(donationRoutes)
router.use(donationRequestRoutes)
router.use(inventoryRoutes)
router.use(wasteRoutes)

module.exports = router
