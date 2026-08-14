const WasteData = require("../models/WasteData")

const createWasteData = (req, res) => {
  const { foodItem, foodQuantity, foodReason, foodWasteDate, foodAddTxt } =
    req.body
  const userId = req.userId

  if (
    !foodItem ||
    !foodQuantity ||
    !foodReason ||
    !foodWasteDate ||
    !foodAddTxt
  ) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const newWasteData = new WasteData({
    user: userId,
    foodItem,
    foodQuantity,
    foodReason,
    foodWasteDate,
    foodAddTxt,
  })

  newWasteData
    .save()
    .then((waste) => {
      res.json(waste)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: "Failed to Save Waste Data" })
    })
}

const getWasteData = (req, res) => {
  const userId = req.userId

  WasteData.find({ user: userId })
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: "Failed to fetch waste data" })
    })
}

module.exports = { createWasteData, getWasteData }
