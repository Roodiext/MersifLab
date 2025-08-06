import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Test tables exist
    const userCount = await prisma.user.count()
    const articleCount = await prisma.article.count()
    const newsCount = await prisma.news.count()
    
    // Test comment table
    const commentCount = await prisma.comment.count()
    
    // Test create comment
    const testComment = await prisma.comment.create({
      data: {
        content: "Test comment from API",
        status: "approved",
        userId: 1, // Pastikan user dengan ID 1 ada
        articleId: 1 // Pastikan article dengan ID 1 ada
      }
    })

    return NextResponse.json({
      success: true,
      counts: {
        users: userCount,
        articles: articleCount,
        news: newsCount,
        comments: commentCount
      },
      testComment
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}