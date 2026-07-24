// controllers/cakeBookingController.js

const cakeBookingModel = require("../models/cakeBookingModel");

async function createCakeBooking(req, res) {
  try {
    const id = await cakeBookingModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Your cake has been booked successfully!",
      id,
    });
  } catch (err) {
    console.error("createCakeBooking error:", err.message);
    res.status(500).json({ success: false, message: "Unable to process your request. Please try again." });
  }
}

async function getAllCakeBookings(req, res) {
  try {
    const bookings = await cakeBookingModel.findAll();
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    console.error("getAllCakeBookings error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch cake bookings." });
  }
}

async function getCakeBookingById(req, res) {
  try {
    const booking = await cakeBookingModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Cake booking not found." });
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    console.error("getCakeBookingById error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch cake booking." });
  }
}

async function deleteCakeBooking(req, res) {
  try {
    const deleted = await cakeBookingModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Cake booking not found." });
    res.status(200).json({ success: true, message: "Cake booking deleted." });
  } catch (err) {
    console.error("deleteCakeBooking error:", err.message);
    res.status(500).json({ success: false, message: "Unable to delete cake booking." });
  }
}

module.exports = {
  createCakeBooking,
  getAllCakeBookings,
  getCakeBookingById,
  deleteCakeBooking,
};
