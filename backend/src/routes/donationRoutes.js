const express = require("express")
const verifyToken = require("../middleware/auth")
const {
  createDonation,
  getDonations,
} = require("../controllers/donationController")

const router = express.Router()

router.post("/donate", verifyToken, createDonation)
router.get("/donation", verifyToken, getDonations)

module.exports = router
