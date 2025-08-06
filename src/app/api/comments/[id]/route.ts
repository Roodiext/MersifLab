import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    const data = await request.json()
    const commentId = parseInt(params.id)

    // Get existing comment
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId }
    })

    if (!existingComment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    // Check permission: owner or admin
    const isOwner = session?.user?.id && parseInt(session.user.id) === existingComment.userId
    const isAdmin = session?.user?.role === 'admin'

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: {
        content: data.content,
        status: data.status || existingComment.status
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json(comment)
  } catch (error) {
    console.error('Error updating comment:', error)
    return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    const commentId = parseInt(params.id)

    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId }
    })

    if (!existingComment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    // Check permission
    const isOwner = session?.user?.id && parseInt(session.user.id) === existingComment.userId
    const isAdmin = session?.user?.role === 'admin'

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    await prisma.comment.delete({
      where: { id: commentId }
    })

    return NextResponse.json({ message: 'Comment deleted successfully' })
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 })
  }
}