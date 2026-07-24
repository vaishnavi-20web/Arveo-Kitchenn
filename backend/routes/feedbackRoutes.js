// routes/feedbackRoutes.js

const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  deleteFeedback,
} = require("../controllers/feedbackController");
const {
  handleValidation,
  nameField,
  phoneField,
  emailField,
  ratingField,
} = require("../middleware/validation");

const validateFeedback = [
  nameField("full_name", "Full name"),
  phoneField("phone", { optional: true }),
  emailField("email", { optional: true }),
  ratingField("overall_rating", "Overall rating"),
  ratingField("food_quality", "Food quality", { optional: true }),
  ratingField("taste", "Taste", { optional: true }),
  ratingField("service", "Service", { optional: true }),
  ratingField("staff_behaviour", "Staff behaviour", { optional: true }),
  ratingField("cleanliness", "Cleanliness", { optional: true }),
  ratingField("ambience", "Ambience", { optional: true }),
  ratingField("waiting_time", "Waiting time", { optional: true }),
  ratingField("value_for_money", "Value for money", { optional: true }),
  handleValidation,
];

router.post("/", validateFeedback, createFeedback);
router.get("/", getAllFeedback);
router.get("/:id", getFeedbackById);
router.delete("/:id", deleteFeedback);

module.exports = router;
