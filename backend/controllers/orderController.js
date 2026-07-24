// controllers/orderController.js

const orderModel = require("../models/orderModel");

async function createOrder(req, res) {
  try {
    const id = await orderModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Your order has been placed and sent to the kitchen.",
      id,
    });
  } catch (err) {
    console.error("createOrder error:", err.message);
    res.status(500).json({ success: false, message: "Unable to process your request. Please try again." });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await orderModel.findAll();
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error("getAllOrders error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch orders." });
  }
}

async function getOrderById(req, res) {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found." });
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.error("getOrderById error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch order." });
  }
}

async function deleteOrder(req, res) {
  try {
    const deleted = await orderModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Order not found." });
    res.status(200).json({ success: true, message: "Order deleted." });
  } catch (err) {
    console.error("deleteOrder error:", err.message);
    res.status(500).json({ success: false, message: "Unable to delete order." });
  }
}

module.exports = { createOrder, getAllOrders, getOrderById, deleteOrder };
