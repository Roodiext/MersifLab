import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      include: { 
        category: true,
        author: {
          select: {
            id: true,
            username: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received news data:', data)
    
    // Validasi data yang diperlukan
    if (!data.title || !data.content || !data.categoryId) {
      return NextResponse.json({ 
        error: 'Missing required fields: title, content, categoryId' 
      }, { status: 400 })
    }

    const news = await prisma.news.create({
      data: {
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-'),
        content: data.content,
        thumbnail: data.thumbnail || null,
        categoryId: parseInt(data.categoryId),
        authorId: data.authorId || 1,
        status: data.status || 'draft',
        updatedAt: new Date()
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            username: true
          }
        }
      }
    })
    
    return NextResponse.json(news)
  } catch (error) {
    console.error('Error creating news:', error)
    return NextResponse.json({ 
      error: 'Failed to create news',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}


