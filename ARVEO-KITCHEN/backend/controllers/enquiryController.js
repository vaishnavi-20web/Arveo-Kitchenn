// controllers/enquiryController.js

const enquiryModel = require("../models/enquiryModel");

async function createEnquiry(req, res) {
  try {
    const id = await enquiryModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted. Our team will get back to you shortly.",
      id,
    });
  } catch (err) {
    console.error("createEnquiry error:", err.message);
    res.status(500).json({ success: false, message: "Unable to process your request. Please try again." });
  }
}

async function getAllEnquiries(req, res) {
  try {
    const enquiries = await enquiryModel.findAll();
    res.status(200).json({ success: true, data: enquiries });
  } catch (err) {
    console.error("getAllEnquiries error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch enquiries." });
  }
}

async function getEnquiryById(req, res) {
  try {
    const enquiry = await enquiryModel.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found." });
    res.status(200).json({ success: true, data: enquiry });
  } catch (err) {
    console.error("getEnquiryById error:", err.message);
    res.status(500).json({ success: false, message: "Unable to fetch enquiry." });
  }
}

async function deleteEnquiry(req, res) {
  try {
    const deleted = await enquiryModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Enquiry not found." });
    res.status(200).json({ success: true, message: "Enquiry deleted." });
  } catch (err) {
    console.error("deleteEnquiry error:", err.message);
    res.status(500).json({ success: false, message: "Unable to delete enquiry." });
  }
}

module.exports = { createEnquiry, getAllEnquiries, getEnquiryById, deleteEnquiry };
