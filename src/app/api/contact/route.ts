import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Format email tidak valid" }, { status: 400 })
    }

    // Save contact message to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        status: "unread",
      },
    })

    return NextResponse.json({
      success: true,
      message: "Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.",
      data: {
        id: contactMessage.id,
        createdAt: contactMessage.createdAt,
      },
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi." }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
