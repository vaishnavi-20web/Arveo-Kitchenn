// controllers/feedbackController.js

const feedbackModel = require("../models/feedbackModel");

// POST /api/feedback
async function createFeedback(req, res) {
  try {
    const id = await feedbackModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Thank you! Your feedback has been submitted.",
      id,
    });
  } catch (err) {
    console.error("createFeedback error:", err.message);
    res.status(500).json({ success: false, message: "Unable to process your request. Please try again." });
  }
}

// GET /api/feedback
async function getAllFeedback(req, res) {
  try {
    const feedback = await feedbackModel.findAll();
    res.status(200).json({ success: true, data: feedback });
  } catch (err) {
    console.error("getAllFeedback error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch feedback." });
  }
}

// GET /api/feedback/:id
async function getFeedbackById(req, res) {
  try {
    const feedback = await feedbackModel.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found." });
    }
    res.status(200).json({ success: true, data: feedback });
  } catch (err) {
    console.error("getFeedbackById error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch feedback." });
  }
}

// DELETE /api/feedback/:id
async function deleteFeedback(req, res) {
  try {
    const deleted = await feedbackModel.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Feedback not found." });
    }
    res.status(200).json({ success: true, message: "Feedback deleted." });
  } catch (err) {
    console.error("deleteFeedback error:", err.message);
    res.status(500).json({ success: false, message: "Unable to delete feedback." });
  }
}

module.exports = { createFeedback, getAllFeedback, getFeedbackById, deleteFeedback };
