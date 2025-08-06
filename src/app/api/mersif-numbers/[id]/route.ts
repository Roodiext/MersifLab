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
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    const mersifNumber = await prisma.mersifNumber.update({
      where: { id: parseInt(params.id) },
      data: {
        label: data.label,
        value: data.value,
        icon: data.icon,
        color: data.color,
        sortOrder: data.sortOrder
      }
    })
    
    return NextResponse.json(mersifNumber)
  } catch (error) {
    console.error('Error updating mersif number:', error)
    return NextResponse.json({ error: 'Failed to update mersif number' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.mersifNumber.delete({
      where: { id: parseInt(params.id) }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting mersif number:', error)
    return NextResponse.json({ error: 'Failed to delete mersif number' }, { status: 500 })
  }
}