import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const mersifNumbers = await prisma.mersifNumber.findMany({
      orderBy: { sortOrder: 'asc' }
    })
    
    return NextResponse.json(mersifNumbers)
  } catch (error) {
    console.error('Error fetching mersif numbers:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch mersif numbers',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    console.log('POST /api/mersif-numbers called')
    
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      console.log('Unauthorized access attempt')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    console.log('Received data:', data)
    
    if (!data.label || !data.value) {
      console.log('Missing required fields')
      return NextResponse.json({ 
        error: 'Label and value are required' 
      }, { status: 400 })
    }

    const mersifNumber = await prisma.mersifNumber.create({
      data: {
        label: data.label,
        value: data.value,
        icon: data.icon || '/img/mersif-number-img/default-icon.svg',
        color: data.color || 'text-blue-600',
        sortOrder: data.sortOrder || 0
      }
    })
    
    console.log('Created mersif number:', mersifNumber)
    return NextResponse.json(mersifNumber)
  } catch (error) {
    console.error('Error creating mersif number:', error)
    return NextResponse.json({ 
      error: 'Failed to create mersif number',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
