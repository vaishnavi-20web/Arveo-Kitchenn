// models/enquiryModel.js

const pool = require("../config/db");

const TABLE = "enquiries";

async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO ${TABLE} (name, phone, email, category, subject, description, priority, contact_method)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.phone || null,
      data.email || null,
      data.category,
      data.subject,
      data.description || null,
      data.priority || "Low",
      data.contact_method || "Phone",
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
