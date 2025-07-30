import mysql from "mysql2/promise"

// Konfigurasi database - sesuaikan dengan setting MySQL Anda
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "db-mersiflab",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
}

// Buat connection pool untuk performa yang lebih baik
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function query(sql: string, params: any[] = []) {
  try {
    console.log("Executing query:", sql, "with params:", params)

    const [results] = await pool.execute(sql, params)

    console.log("Query results:", results)
    return results
  } catch (error: any) {
    console.error("Database query error:", error)
    throw new Error(`Database error: ${error.message}`)
  }
}

// Fungsi untuk test koneksi database
export async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log("Database connected successfully!")
    connection.release()
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}
