// models/orderModel.js

const pool = require("../config/db");

const TABLE = "food_orders";

async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO ${TABLE}
      (customer_name, phone, email, address, notes, delivery_option, payment_method, total_amount, order_items)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.customer_name,
      data.phone,
      data.email || null,
      data.address || null,
      data.notes || null,
      data.delivery_option,
      data.payment_method,
      data.total_amount,
      JSON.stringify(data.order_items || []),
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
