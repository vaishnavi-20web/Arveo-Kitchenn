// server.js
// ARVÉO KITCHEN — Express + MySQL backend entry point.

require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Verifies the DB connection on startup (see console output).
const pool = require("./config/db");

const feedbackRoutes = require("./routes/feedbackRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const partyHallRoutes = require("./routes/partyHallRoutes");
const functionBookingRoutes = require("./routes/functionBookingRoutes");
const cakeBookingRoutes = require("./routes/cakeBookingRoutes");

const app = express();

app.use(cors({ origin: "*" }));
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

// DB connectivity + env debug (useful for Railway deployment verification)
app.get("/api/debug-env", async (req, res) => {
  const envInfo = {
    DB_HOST: process.env.DB_HOST || null,
    DB_PORT: process.env.DB_PORT || null,
    DB_USER: process.env.DB_USER || null,
    DB_NAME: process.env.DB_NAME || null,
    MYSQLHOST: process.env.MYSQLHOST || null,
    MYSQLPORT: process.env.MYSQLPORT || null,
    MYSQLUSER: process.env.MYSQLUSER || null,
    MYSQLDATABASE: process.env.MYSQLDATABASE || null,
    MYSQL_URL: process.env.MYSQL_URL ? "[SET]" : null,
    DATABASE_URL: process.env.DATABASE_URL ? "[SET]" : null,
    NODE_ENV: process.env.NODE_ENV || null,
    PORT: process.env.PORT || null,
  };
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SHOW TABLES");
    connection.release();
    res.json({ success: true, env: envInfo, tables: rows });
  } catch (err) {
    res.status(500).json({ success: false, env: envInfo, db_error: err.message });
  }
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
