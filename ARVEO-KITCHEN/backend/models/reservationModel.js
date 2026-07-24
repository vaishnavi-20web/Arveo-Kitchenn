// models/reservationModel.js

const pool = require("../config/db");

const TABLE = "reservations";

async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO ${TABLE} (name, phone, email, reservation_date, reservation_time, guests, special_requests)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.phone,
      data.email || null,
      data.reservation_date,
      data.reservation_time,
      data.guests,
      data.special_requests || null,
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
