import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
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

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received data:', body)
    
    const { title, slug, content, categoryId, authorId, thumbnail, tags, status } = body

    if (!title || !content || !categoryId) {
      return NextResponse.json({ 
        error: 'Missing required fields: title, content, categoryId' 
      }, { status: 400 })
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        content,
        categoryId: parseInt(categoryId),
        authorId: authorId || 1,
        thumbnail: thumbnail || null,
        status: status || 'draft',
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

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json({ 
      error: 'Failed to create article',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}





