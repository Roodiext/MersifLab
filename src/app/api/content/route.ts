import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('Fetching content from API...')
    
    // Fetch both articles and news
    const [articles, news] = await Promise.all([
      prisma.article.findMany({
        where: { status: 'published' },
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
      }),
      prisma.news.findMany({
        where: { status: 'published' },
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
    ])
    
    console.log('Articles found:', articles.length)
    console.log('News found:', news.length)
    
    // Combine and add type field
    const combined = [
      ...articles.map(item => ({ ...item, type: 'article' })),
      ...news.map(item => ({ ...item, type: 'news' }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    console.log('Combined content:', combined.length)
    
    return NextResponse.json(combined)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
