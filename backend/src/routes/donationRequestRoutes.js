const express = require("express")
const {
  getFoodDonationRequests,
  createDonationRequest,
  deleteDonationRequest,
  fulfillDonationRequest,
  checkDonationAcceptance,
} = require("../controllers/donationRequestController")

const router = express.Router()

router.get("/food-donation-requests", getFoodDonationRequests)
router.post("/create-donation-request", createDonationRequest)
router.delete("/delete-donation-request/:id", deleteDonationRequest)
router.put("/fulfill-donation-request/:id", fulfillDonationRequest)
router.get("/check-donation-acceptance/:id", checkDonationAcceptance)

module.exports = router
