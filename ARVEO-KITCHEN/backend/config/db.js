// config/db.js
// Creates and exports a MySQL connection pool using mysql2/promise
// so controllers can simply `await pool.query(...)`.

require("dotenv").config();
const mysql = require("mysql2/promise");

const dbUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

let poolConfig;

if (dbUrl) {
  poolConfig = dbUrl;
} else {
  const host = process.env.DB_HOST || process.env.MYSQLHOST || process.env.MYSQLPRIVATEHOST || "localhost";
  const port = parseInt(process.env.DB_PORT || process.env.MYSQLPORT || process.env.MYSQL_PORT || "3306", 10);
  const user = process.env.DB_USER || process.env.MYSQLUSER || "root";
  const password = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || "";
  const database = process.env.DB_NAME || process.env.MYSQLDATABASE || "railway";

  poolConfig = {
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true,
    connectTimeout: 20000,
    // Enable SSL for all non-localhost connections (required by Railway's
    // public MySQL proxy at *.rlwy.net). rejectUnauthorized:false accepts
    // Railway's self-signed certificate.
    ssl: (host && host !== "localhost" && host !== "127.0.0.1")
      ? { rejectUnauthorized: false }
      : undefined,
  };
}

const pool = mysql.createPool(poolConfig);

// Quick startup check so connection problems are obvious immediately.
(async () => {
  try {
    const connection = await pool.getConnection();
    const dbName = process.env.DB_NAME || process.env.MYSQLDATABASE || poolConfig.database || "railway";
    const host = process.env.DB_HOST || process.env.MYSQLHOST || poolConfig.host || "localhost";
    const port = process.env.DB_PORT || process.env.MYSQLPORT || poolConfig.port || "3306";
    console.log(`✅ MySQL connected successfully to '${dbName}' at ${host}:${port}`);
    connection.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
})();

module.exports = pool;
