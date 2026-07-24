// routes/reservationRoutes.js

const express = require("express");
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservationById,
  deleteReservation,
} = require("../controllers/reservationController");
const {
  handleValidation,
  nameField,
  phoneField,
  emailField,
  dateField,
  timeField,
  positiveIntField,
} = require("../middleware/validation");

const validateReservation = [
  nameField("name", "Name"),
  phoneField("phone"),
  emailField("email", { optional: true }),
  dateField("reservation_date", "Reservation date"),
  timeField("reservation_time", "Reservation time"),
  positiveIntField("guests", "Number of guests"),
  handleValidation,
];

router.post("/", validateReservation, createReservation);
router.get("/", getAllReservations);
router.get("/:id", getReservationById);
router.delete("/:id", deleteReservation);

module.exports = router;
