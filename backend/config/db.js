// config/db.js
// Creates and exports a MySQL connection pool using mysql2/promise
// so controllers can simply `await pool.query(...)`.

require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true, // return DATE/TIME columns as plain strings, not JS Date objects
});

// Quick startup check so connection problems are obvious immediately.
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL connected:", process.env.DB_NAME);
    connection.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
})();

module.exports = pool;
