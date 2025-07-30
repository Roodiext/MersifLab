// Salin kode ini ke: D:\Atha RPL\Enuma PKL Project\mersiflab\src\app\login\actions.ts
"use server"

import { query } from "@/lib/db"
import bcrypt from "bcryptjs" // Kita akan menginstal ini di langkah berikutnya

export async function loginAction(prevState: any, formData: FormData) {
  const identifier = formData.get("identifier") as string // Bisa email atau username
  const password = formData.get("password") as string

  if (!identifier || !password) {
    return { success: false, message: "Email/Username dan password harus diisi." }
  }

  try {
    // Cari user berdasarkan email atau username
    const users: any = await query("SELECT * FROM users WHERE email = ? OR username = ?", [identifier, identifier])

    if (users.length === 0) {
      return { success: false, message: "Email/Username atau password salah." }
    }

    const user = users[0]

    // Bandingkan password yang di-hash
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return { success: false, message: "Email/Username atau password salah." }
    }

    // Login berhasil
    // Di sini Anda bisa membuat sesi, token JWT, atau cookie otentikasi
    // Untuk demo ini, kita hanya mengembalikan pesan sukses
    return { success: true, message: "Login berhasil! Selamat datang." }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "Terjadi kesalahan saat login. Coba lagi nanti." }
  }
}
