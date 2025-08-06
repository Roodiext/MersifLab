import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name } = body

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const category = await prisma.category.update({
      where: { id: parseInt(params.id) },
      data: {
        name: name.trim(),
        slug: name.trim().toLowerCase().replace(/\s+/g, '-')
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error updating category:', error)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json({ error: 'Category name already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if category is being used
    const articlesCount = await prisma.article.count({
      where: { categoryId: parseInt(params.id) }
    })
    
    const newsCount = await prisma.news.count({
      where: { categoryId: parseInt(params.id) }
    })

    if (articlesCount > 0 || newsCount > 0) {
      return NextResponse.json({ 
        error: `Cannot delete category. It's being used by ${articlesCount} articles and ${newsCount} news.` 
      }, { status: 400 })
    }

    await prisma.category.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
