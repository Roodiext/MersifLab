import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const news = await prisma.news.findUnique({
      where: { id: parseInt(params.id) },
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
    
    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 })
    }
    
    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    
    const news = await prisma.news.update({
      where: { id: parseInt(params.id) },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        thumbnail: data.thumbnail,
        categoryId: parseInt(data.categoryId),
        status: data.status,
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
    console.error('Error updating news:', error)
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.news.delete({
      where: { id: parseInt(params.id) }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 })
  }
}

