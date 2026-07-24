// server.js
// ARVÉO KITCHEN — Express + MySQL backend entry point.

require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Verifies the DB connection on startup (see console output).
require("./config/db");

const feedbackRoutes = require("./routes/feedbackRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const partyHallRoutes = require("./routes/partyHallRoutes");
const functionBookingRoutes = require("./routes/functionBookingRoutes");
const cakeBookingRoutes = require("./routes/cakeBookingRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// ---- Routes -----------------------------------------------------------
app.use("/api/feedback", feedbackRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/partyhall", partyHallRoutes);
app.use("/api/function-booking", functionBookingRoutes);
app.use("/api/cake-booking", cakeBookingRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "ARVÉO KITCHEN API is running." });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// Centralized error handler (catches anything thrown/passed to next())
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Unable to process your request. Please try again." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 ARVÉO KITCHEN API running at http://localhost:${PORT}`);
});
