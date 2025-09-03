import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status") || "all"

    const skip = (page - 1) * limit

    // Build where clause
    const where = status !== "all" ? { status } : {}

    // Get messages with pagination
    const [messages, totalCount] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
    ])

    // Get status counts
    const statusCounts = await prisma.contactMessage.groupBy({
      by: ["status"],
      _count: { status: true },
    })

    const counts = {
      total: totalCount,
      unread: statusCounts.find((s) => s.status === "unread")?._count.status || 0,
      read: statusCounts.find((s) => s.status === "read")?._count.status || 0,
      replied: statusCounts.find((s) => s.status === "replied")?._count.status || 0,
    }

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      counts,
    })
  } catch (error) {
    console.error("Contact messages API error:", error)
    return NextResponse.json({ error: "Failed to fetch contact messages" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
