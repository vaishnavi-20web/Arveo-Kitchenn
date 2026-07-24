// models/functionBookingModel.js

const pool = require("../config/db");

const TABLE = "function_bookings";

async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO ${TABLE} (function_type, hall_name, food_package, guest_count, booking_date, booking_time)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.function_type,
      data.hall_name,
      data.food_package,
      data.guest_count,
      data.booking_date,
      data.booking_time || null,
    ]
  );
  return result.insertId;
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

module.exports = { create, findAll, findById, remove };
