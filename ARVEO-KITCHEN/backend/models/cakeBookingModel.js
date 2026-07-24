// models/cakeBookingModel.js

const pool = require("../config/db");

const TABLE = "cake_bookings";

async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO ${TABLE} (cake_type, weight, message, reference_image, delivery_time, with_hall_booking, price)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.cake_type,
      data.weight,
      data.message || null,
      data.reference_image || null,
      data.delivery_time || null,
      !!data.with_hall_booking,
      data.price,
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
