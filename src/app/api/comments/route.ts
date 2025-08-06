import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get('articleId')
    const newsId = searchParams.get('newsId')
    const status = searchParams.get('status') || 'approved'

    const where: any = { 
      status,
      parentId: null // Only parent comments
    }
    if (articleId) where.articleId = parseInt(articleId)
    if (newsId) where.newsId = parseInt(newsId)

    const comments = await prisma.comment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
            role: true
          }
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                role: true
              }
            }
          },
          orderBy: { createdAt: 'asc' },
          where: { status: 'approved' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  console.log('=== POST /api/comments START ===')
  
  try {
    // Step 1: Test basic response
    console.log('Step 1: API route accessed')
    
    // Step 2: Test session
    console.log('Step 2: Getting session...')
    const session = await getServerSession(authOptions)
    console.log('Session:', session)
    
    if (!session?.user) {
      console.log('No session - returning 401')
      return NextResponse.json({ 
        error: 'Authentication required' 
      }, { status: 401 })
    }

    // Step 3: Parse request
    console.log('Step 3: Parsing request...')
    const data = await request.json()
    console.log('Request data:', data)
    
    const { content, articleId, newsId } = data

    // Step 4: Basic validation
    console.log('Step 4: Validation...')
    if (!content?.trim()) {
      return NextResponse.json({ 
        error: 'Content is required' 
      }, { status: 400 })
    }

    if (!articleId && !newsId) {
      return NextResponse.json({ 
        error: 'Article ID or News ID is required' 
      }, { status: 400 })
    }

    // Step 5: Test database connection
    console.log('Step 5: Testing database...')
    await prisma.$connect()
    console.log('Database connected')

    // Step 6: Create comment
    console.log('Step 6: Creating comment...')
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        userId: parseInt(session.user.id),
        articleId: articleId ? parseInt(articleId) : null,
        newsId: newsId ? parseInt(newsId) : null,
        status: 'approved'
      }
    })

    console.log('Comment created:', comment)
    console.log('=== POST /api/comments SUCCESS ===')
    
    return NextResponse.json(comment)
    
  } catch (error) {
    console.error('=== POST /api/comments ERROR ===')
    console.error('Error:', error)
    
    return NextResponse.json({ 
      error: 'Failed to create comment',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

