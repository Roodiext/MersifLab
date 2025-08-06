import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || undefined

    const where: any = {}
    if (status) where.status = status

    const comments = await prisma.comment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true
          }
        },
        article: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        },
        news: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        },
        parent: {
          select: {
            id: true,
            content: true
          }
        },
        _count: {
          select: {
            replies: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching admin comments:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}