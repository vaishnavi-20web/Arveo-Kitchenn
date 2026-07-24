// models/feedbackModel.js
// Direct MySQL queries for the `feedbacks` table.

const pool = require("../config/db");

const TABLE = "feedbacks";

async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO ${TABLE}
      (full_name, phone, email, overall_rating, food_quality, taste, service,
       staff_behaviour, cleanliness, ambience, waiting_time, value_for_money,
       emoji_reaction, visit_again, recommend, menu_items, experience, suggestions)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.full_name,
      data.phone || null,
      data.email || null,
      data.overall_rating,
      data.food_quality || null,
      data.taste || null,
      data.service || null,
      data.staff_behaviour || null,
      data.cleanliness || null,
      data.ambience || null,
      data.waiting_time || null,
      data.value_for_money || null,
      data.emoji_reaction || null,
      data.visit_again || null,
      data.recommend || null,
      data.menu_items || null,
      data.experience || null,
      data.suggestions || null,
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
