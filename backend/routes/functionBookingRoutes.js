// routes/functionBookingRoutes.js

const express = require("express");
const router = express.Router();
const {
  createFunctionBooking,
  getAllFunctionBookings,
  getFunctionBookingById,
  deleteFunctionBooking,
} = require("../controllers/functionBookingController");
const {
  handleValidation,
  requiredField,
  dateField,
  timeField,
  positiveIntField,
} = require("../middleware/validation");

const validateFunctionBooking = [
  requiredField("function_type", "Function type"),
  requiredField("hall_name", "Hall"),
  requiredField("food_package", "Food package"),
  positiveIntField("guest_count", "Guest count"),
  dateField("booking_date", "Booking date"),
  timeField("booking_time", "Booking time", { optional: true }),
  handleValidation,
];

router.post("/", validateFunctionBooking, createFunctionBooking);
router.get("/", getAllFunctionBookings);
router.get("/:id", getFunctionBookingById);
router.delete("/:id", deleteFunctionBooking);

module.exports = router;
