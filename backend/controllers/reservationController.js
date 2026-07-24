// controllers/reservationController.js

const reservationModel = require("../models/reservationModel");

async function createReservation(req, res) {
  try {
    const id = await reservationModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Your table has been reserved. We look forward to hosting you!",
      id,
    });
  } catch (err) {
    console.error("createReservation error:", err.message);
    res.status(500).json({ success: false, message: "Unable to process your request. Please try again." });
  }
}

async function getAllReservations(req, res) {
  try {
    const reservations = await reservationModel.findAll();
    res.status(200).json({ success: true, data: reservations });
  } catch (err) {
    console.error("getAllReservations error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch reservations." });
  }
}

async function getReservationById(req, res) {
  try {
    const reservation = await reservationModel.findById(req.params.id);
    if (!reservation) return res.status(404).json({ success: false, message: "Reservation not found." });
    res.status(200).json({ success: true, data: reservation });
  } catch (err) {
    console.error("getReservationById error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch reservation." });
  }
}

async function deleteReservation(req, res) {
  try {
    const deleted = await reservationModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Reservation not found." });
    res.status(200).json({ success: true, message: "Reservation deleted." });
  } catch (err) {
    console.error("deleteReservation error:", err.message);
    res.status(500).json({ success: false, message: "Unable to delete reservation." });
  }
}

module.exports = { createReservation, getAllReservations, getReservationById, deleteReservation };
