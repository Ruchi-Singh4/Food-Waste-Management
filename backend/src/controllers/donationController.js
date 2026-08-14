const Donation = require("../models/Donation")
const FoodDonationRequest = require("../models/FoodDonationRequest")
const InventoryItem = require("../models/InventoryItem")

const createDonation = async (req, res) => {
  try {
    const {
      name,
      email,
      amount,
      donationDate,
      location,
      city,
      selectedInventoryItem,
    } = req.body
    const userId = req.userId

    if (!name || !email || !amount || !donationDate || !location || !city) {
      return res
        .status(400)
        .json({ error: "Missing required donation data fields" })
    }

    const newDonation = new Donation({
      user: userId,
      name,
      email,
      amount,
      donationDate,
      location,
      city,
      selectedInventoryItem,
    })

    await newDonation.save()

    await FoodDonationRequest.findOneAndUpdate(
      {},
      { associatedDonation: newDonation._id, status: "fulfilled" },
      { new: true }
    )

    if (selectedInventoryItem) {
      const inventoryItem = await InventoryItem.findOne({
        itemName: selectedInventoryItem,
        user: userId,
      })

      if (inventoryItem) {
        if (inventoryItem.itemQuantity >= amount) {
          inventoryItem.itemQuantity -= amount
        } else {
          return res
            .status(400)
            .json({ error: "Not enough quantity in the inventory" })
        }

        await inventoryItem.save()
      }
    }

    res.json({ message: "Donation Made Successfully" })
  } catch (error) {
    console.error("Error making donation:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const getDonations = (req, res) => {
  const userId = req.userId

  Donation.find({ user: userId })
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: "Failed to fetch donation datas" })
    })
}

module.exports = { createDonation, getDonations }
