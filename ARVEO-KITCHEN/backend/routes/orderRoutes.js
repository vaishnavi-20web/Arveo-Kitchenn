// routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
} = require("../controllers/orderController");
const {
  handleValidation,
  nameField,
  phoneField,
  emailField,
  requiredField,
} = require("../middleware/validation");
const { body } = require("express-validator");

const validateOrder = [
  nameField("customer_name", "Customer name"),
  phoneField("phone"),
  emailField("email", { optional: true }),
  requiredField("delivery_option", "Delivery option"),
  requiredField("payment_method", "Payment method"),
  body("total_amount").isFloat({ min: 0 }).withMessage("Total amount must be a valid number"),
  body("order_items").isArray({ min: 1 }).withMessage("Order must contain at least one item"),
  handleValidation,
];

router.post("/", validateOrder, createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrder);

module.exports = router;
