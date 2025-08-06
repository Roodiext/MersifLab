import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'published' },
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch published articles' }, { status: 500 })
  }
}