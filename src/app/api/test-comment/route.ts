import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('Testing comment creation...')
    
    // Test session
    const session = await getServerSession(authOptions)
    console.log('Session:', session)
    
    // Test database connection
    await prisma.$connect()
    console.log('Database connected')
    
    // Check tables
    const userCount = await prisma.user.count()
    const articleCount = await prisma.article.count()
    const commentCount = await prisma.comment.count()
    
    console.log('Counts:', { userCount, articleCount, commentCount })
    
    // Get first user and article
    const firstUser = await prisma.user.findFirst()
    const firstArticle = await prisma.article.findFirst()
    
    console.log('First user:', firstUser)
    console.log('First article:', firstArticle)
    
    // Try to create a test comment
    if (firstUser && firstArticle) {
      const testComment = await prisma.comment.create({
        data: {
          content: "Test comment from API test",
          userId: firstUser.id,
          articleId: firstArticle.id,
          status: "approved"
        },
        include: {
          user: true,
          article: true
        }
      })
      
      console.log('Test comment created:', testComment)
      
      return NextResponse.json({
        success: true,
        session,
        counts: { userCount, articleCount, commentCount },
        firstUser,
        firstArticle,
        testComment
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'No user or article found',
        counts: { userCount, articleCount, commentCount }
      })
    }
    
  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}