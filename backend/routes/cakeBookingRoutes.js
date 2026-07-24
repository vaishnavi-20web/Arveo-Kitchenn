// routes/cakeBookingRoutes.js

const express = require("express");
const router = express.Router();
const {
  createCakeBooking,
  getAllCakeBookings,
  getCakeBookingById,
  deleteCakeBooking,
} = require("../controllers/cakeBookingController");
const { handleValidation, requiredField } = require("../middleware/validation");
const { body } = require("express-validator");

const validateCakeBooking = [
  requiredField("cake_type", "Cake type"),
  body("weight").isFloat({ min: 0.5 }).withMessage("Weight must be a valid number (kg)"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a valid number"),
  handleValidation,
];

router.post("/", validateCakeBooking, createCakeBooking);
router.get("/", getAllCakeBookings);
router.get("/:id", getCakeBookingById);
router.delete("/:id", deleteCakeBooking);

module.exports = router;
