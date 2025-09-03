import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const id = Number.parseInt(params.id)
    const body = await request.json()
    const { status } = body

    if (!["unread", "read", "replied"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({
      success: true,
      message: "Status berhasil diupdate",
      data: updatedMessage,
    })
  } catch (error) {
    console.error("Update contact message error:", error)
    return NextResponse.json({ error: "Failed to update message status" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const id = Number.parseInt(params.id)

    await prisma.contactMessage.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dihapus",
    })
  } catch (error) {
    console.error("Delete contact message error:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
