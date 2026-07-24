// controllers/functionBookingController.js

const functionBookingModel = require("../models/functionBookingModel");

async function createFunctionBooking(req, res) {
  try {
    const id = await functionBookingModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Your function food has been pre-booked successfully!",
      id,
    });
  } catch (err) {
    console.error("createFunctionBooking error:", err.message);
    res.status(500).json({ success: false, message: "Unable to process your request. Please try again." });
  }
}

async function getAllFunctionBookings(req, res) {
  try {
    const bookings = await functionBookingModel.findAll();
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    console.error("getAllFunctionBookings error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch bookings." });
  }
}

async function getFunctionBookingById(req, res) {
  try {
    const booking = await functionBookingModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    console.error("getFunctionBookingById error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch booking." });
  }
}

async function deleteFunctionBooking(req, res) {
  try {
    const deleted = await functionBookingModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Booking not found." });
    res.status(200).json({ success: true, message: "Booking deleted." });
  } catch (err) {
    console.error("deleteFunctionBooking error:", err.message);
    res.status(500).json({ success: false, message: "Unable to delete booking." });
  }
}

module.exports = {
  createFunctionBooking,
  getAllFunctionBookings,
  getFunctionBookingById,
  deleteFunctionBooking,
};
