"use server"

import { query } from "@/lib/db"
import bcrypt from "bcryptjs"

// Interface untuk return type dari registerAction
export interface RegisterResult {
  success: boolean
  message: string
}

// Function to verify reCAPTCHA token with Google
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not set")
    return false
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    console.log("reCAPTCHA response:", data)

    return data.success === true
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return false
  }
}

export async function registerAction(prevState: RegisterResult | null, formData: FormData): Promise<RegisterResult> {
  try {
    const email = formData.get("email") as string
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const rePassword = formData.get("re-password") as string
    const recaptchaToken = formData.get("recaptcha-token") as string

    console.log("Registration attempt:", { email, username })

    if (!email || !username || !password || !rePassword) {
      return { success: false, message: "Semua kolom harus diisi." }
    }

    // Disable ReCAPTCHA check for now
    // if (!recaptchaToken) {
    //   return { success: false, message: "Harap selesaikan verifikasi reCAPTCHA." }
    // }

    // // Verify reCAPTCHA token
    // const isRecaptchaValid = await verifyRecaptcha(recaptchaToken)
    // if (!isRecaptchaValid) {
    //   return { success: false, message: "Verifikasi reCAPTCHA gagal. Silakan coba lagi." }
    // }

    if (password !== rePassword) {
      return { success: false, message: "Password tidak cocok." }
    }

    // Validasi email format
    if (!email.includes("@") || !email.includes(".")) {
      return { success: false, message: "Format email tidak valid." }
    }

    // Validasi kekuatan password
    if (password.length < 6) {
      return { success: false, message: "Password minimal 6 karakter." }
    }

    // Cek apakah email atau username sudah terdaftar
    const existingUsers: any = await query("SELECT id, email, username FROM users WHERE email = ? OR username = ?", [
      email,
      username,
    ])

    if (existingUsers.length > 0) {
      const existingUser = existingUsers[0]
      if (existingUser.email === email) {
        return { success: false, message: "Email sudah terdaftar." }
      }
      if (existingUser.username === username) {
        return { success: false, message: "Username sudah digunakan." }
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Simpan user ke database dengan timestamps
    const insertResult: any = await query(
      "INSERT INTO users (username, email, password, created_at, updated_at, role) VALUES (?, ?, ?, NOW(), NOW(), 'user')",
      [username, email, hashedPassword],
    )

    console.log("Insert result:", insertResult)

    if (insertResult.affectedRows > 0) {
      return { success: true, message: "Pendaftaran berhasil! Silakan login." }
    } else {
      return { success: false, message: "Gagal menyimpan data. Coba lagi." }
    }
  } catch (error: any) {
    console.error("Register error:", error)
    return { success: false, message: `Terjadi kesalahan: ${error.message}` }
  }
}
