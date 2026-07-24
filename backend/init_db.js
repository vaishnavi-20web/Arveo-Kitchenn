const fs = require("fs");
const path = require("path");
const pool = require("./config/db");

async function runSchema() {
  try {
    const sqlPath = path.join(__dirname, "../database/arveo_kitchen.sql");
    const rawSql = fs.readFileSync(sqlPath, "utf8");

    // Remove comments
    const cleanSql = rawSql
      .split("\n")
      .filter((line) => !line.trim().startsWith("--"))
      .join("\n");

    const statements = cleanSql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      if (stmt.toLowerCase().startsWith("create database") || stmt.toLowerCase().startsWith("use ")) {
        continue;
      }
      try {
        await pool.query(stmt);
        console.log("--> Executed SQL statement successfully");
      } catch (err) {
        console.error("--> Error executing statement:", err.message);
      }
    }

    const [tables] = await pool.query("SHOW TABLES");
    console.log("✅ Final DB Tables:", tables);
    process.exit(0);
  } catch (err) {
    console.error("Schema initialization failed:", err);
    process.exit(1);
  }
}

runSchema();
