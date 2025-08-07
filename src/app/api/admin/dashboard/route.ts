import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Get counts from database
    const [
      totalArticles,
      publishedArticles,
      totalNews,
      publishedNews,
      totalUsers,
      totalComments,
      pendingComments,
      totalTestimonials,
      totalMersifNumbers
    ] = await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { status: 'published' } }),
      prisma.news.count(),
      prisma.news.count({ where: { status: 'published' } }),
      prisma.user.count(),
      prisma.comment.count(),
      prisma.comment.count({ where: { status: 'pending' } }),
      prisma.testimonial?.count() || 0,
      prisma.mersifNumber.count()
    ])

    // Get recent activities
    const recentArticles = await prisma.article.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        author: {
          select: { username: true }
        }
      }
    })

    const recentComments = await prisma.comment.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        status: true,
        createdAt: true,
        user: {
          select: { username: true }
        }
      }
    })

    return NextResponse.json({
      stats: {
        articles: {
          total: totalArticles,
          published: publishedArticles,
          draft: totalArticles - publishedArticles
        },
        news: {
          total: totalNews,
          published: publishedNews,
          draft: totalNews - publishedNews
        },
        users: totalUsers,
        comments: {
          total: totalComments,
          pending: pendingComments,
          approved: totalComments - pendingComments
        },
        testimonials: totalTestimonials,
        mersifNumbers: totalMersifNumbers
      },
      recentActivities: {
        articles: recentArticles,
        comments: recentComments
      }
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch dashboard data' 
    }, { status: 500 })
  }
}