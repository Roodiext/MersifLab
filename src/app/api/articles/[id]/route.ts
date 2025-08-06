import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findUnique({
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
    
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }
    
    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    
    const article = await prisma.article.update({
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
    
    return NextResponse.json(article)
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.article.delete({
      where: { id: parseInt(params.id) }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}

