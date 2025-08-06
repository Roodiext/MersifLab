import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    await prisma.$connect()
    console.log('Database connected successfully')
    
    const userCount = await prisma.user.count()
    const articleCount = await prisma.article.count()
    
    console.log('Counts:', { userCount, articleCount })
    
    return NextResponse.json({
      success: true,
      counts: { userCount, articleCount }
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}