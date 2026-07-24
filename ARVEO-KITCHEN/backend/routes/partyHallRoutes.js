// routes/partyHallRoutes.js

const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAvailability,
  getAllBookings,
  getBookingById,
  deleteBooking,
} = require("../controllers/partyHallController");
const {
  handleValidation,
  nameField,
  phoneField,
  emailField,
  requiredField,
  dateField,
  timeField,
  positiveIntField,
} = require("../middleware/validation");

const validateBooking = [
  requiredField("hall_name", "Hall"),
  nameField("customer_name", "Customer name"),
  phoneField("phone"),
  emailField("email", { optional: true }),
  requiredField("function_type", "Function type"),
  dateField("booking_date", "Booking date"),
  timeField("booking_time", "Booking time"),
  positiveIntField("guest_count", "Guest count"),
  handleValidation,
];

// NOTE: /availability must be declared before /:id so it isn't captured as an id param.
router.get("/availability", getAvailability);

router.post("/", validateBooking, createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.delete("/:id", deleteBooking);

module.exports = router;
