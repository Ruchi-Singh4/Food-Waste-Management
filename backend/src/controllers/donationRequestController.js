const FoodDonationRequest = require("../models/FoodDonationRequest")

const getFoodDonationRequests = async (req, res) => {
  try {
    const donationRequests = await FoodDonationRequest.find()
    console.log("Donation Requests:", donationRequests)
    res.json(donationRequests)
  } catch (error) {
    console.error("Error fetching donation requests:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const createDonationRequest = async (req, res) => {
  try {
    const { title, description, requestedBy } = req.body

    if (!title || !description || !requestedBy) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const newDonationRequest = new FoodDonationRequest({
      title,
      description,
      requestedBy,
    })

    await newDonationRequest.save()
    res.status(201).json(newDonationRequest)
  } catch (error) {
    console.error("Error creating donation request:", error)
    res.status(500).json({ error: error.message || "Internal Server Error" })
  }
}

const deleteDonationRequest = async (req, res) => {
  const requestId = req.params.id

  try {
    await FoodDonationRequest.findByIdAndDelete(requestId)
    res.json({ message: "Donation request deleted successfully" })
  } catch (error) {
    console.error("Error deleting donation request:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const fulfillDonationRequest = async (req, res) => {
  const requestId = req.params.id

  try {
    await FoodDonationRequest.findByIdAndUpdate(requestId, {
      status: "fulfilled",
    })
    res.json({ message: "Donation request marked as fulfilled" })
  } catch (error) {
    console.error("Error fulfilling donation request:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const checkDonationAcceptance = async (req, res) => {
  const requestId = req.params.id

  try {
    const request = await FoodDonationRequest.findById(requestId)

    if (!request) {
      return res.status(404).json({ error: "Request not found" })
    }

    const acceptDonation = true

    res.json({ acceptDonation, status: request.status })
  } catch (error) {
    console.error("Error checking donation acceptance:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = {
  getFoodDonationRequests,
  createDonationRequest,
  deleteDonationRequest,
  fulfillDonationRequest,
  checkDonationAcceptance,
}
