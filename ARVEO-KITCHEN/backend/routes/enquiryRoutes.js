// routes/enquiryRoutes.js

const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  deleteEnquiry,
} = require("../controllers/enquiryController");
const {
  handleValidation,
  nameField,
  phoneField,
  emailField,
  requiredField,
} = require("../middleware/validation");

const validateEnquiry = [
  nameField("name", "Name"),
  phoneField("phone", { optional: true }),
  emailField("email", { optional: true }),
  requiredField("category", "Category"),
  requiredField("subject", "Subject"),
  handleValidation,
];

router.post("/", validateEnquiry, createEnquiry);
router.get("/", getAllEnquiries);
router.get("/:id", getEnquiryById);
router.delete("/:id", deleteEnquiry);

module.exports = router;
