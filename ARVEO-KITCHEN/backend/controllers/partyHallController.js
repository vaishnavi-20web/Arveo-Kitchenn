// controllers/partyHallController.js

const partyHallModel = require("../models/partyHallModel");

async function createBooking(req, res) {
  try {
    const id = await partyHallModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Your party hall has been booked successfully!",
      id,
    });
  } catch (err) {
    console.error("createBooking error:", err.message);
    res.status(500).json({ success: false, message: "Unable to process your request. Please try again." });
  }
}

// GET /api/partyhall/availability?hall_name=Grand%20Hall
async function getAvailability(req, res) {
  try {
    const { hall_name } = req.query;
    if (!hall_name) {
      return res.status(400).json({ success: false, message: "hall_name query parameter is required." });
    }
    const bookedDates = await partyHallModel.findBookedDatesForHall(hall_name);
    res.status(200).json({ success: true, hall_name, bookedDates });
  } catch (err) {
    console.error("getAvailability error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch availability." });
  }
}

async function getAllBookings(req, res) {
  try {
    const bookings = await partyHallModel.findAll();
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    console.error("getAllBookings error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch bookings." });
  }
}

async function getBookingById(req, res) {
  try {
    const booking = await partyHallModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    console.error("getBookingById error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch booking." });
  }
}

async function deleteBooking(req, res) {
  try {
    const deleted = await partyHallModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Booking not found." });
    res.status(200).json({ success: true, message: "Booking deleted." });
  } catch (err) {
    console.error("deleteBooking error:", err.message);
    res.status(500).json({ success: false, message: "Unable to delete booking." });
  }
}

module.exports = { createBooking, getAvailability, getAllBookings, getBookingById, deleteBooking };
