import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      where: { status: 'published' },
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch published news' }, { status: 500 })
  }
}