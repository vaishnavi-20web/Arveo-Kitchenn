// models/partyHallModel.js

const pool = require("../config/db");

const TABLE = "party_hall_bookings";

async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO ${TABLE}
      (hall_name, customer_name, phone, email, function_type, booking_date, booking_time, guest_count, special_requirements)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.hall_name,
      data.customer_name,
      data.phone,
      data.email || null,
      data.function_type,
      data.booking_date,
      data.booking_time,
      data.guest_count,
      data.special_requirements || null,
    ]
  );
  return result.insertId;
}

// Used by the frontend's "Check Availability" step before a booking form is shown.
async function findBookedDatesForHall(hall_name) {
  const [rows] = await pool.query(
    `SELECT DISTINCT booking_date FROM ${TABLE} WHERE hall_name = ?`,
    [hall_name]
  );
  return rows.map((r) => r.booking_date);
}

async function findAll() {
  const [rows] = await pool.query(`SELECT * FROM ${TABLE} ORDER BY created_at DESC`);
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query(`SELECT * FROM ${TABLE} WHERE id = ?`, [id]);
  return rows[0] || null;
}

async function remove(id) {
  const [result] = await pool.query(`DELETE FROM ${TABLE} WHERE id = ?`, [id]);
  return result.affectedRows > 0;
}

module.exports = { create, findAll, findById, remove, findBookedDatesForHall };
