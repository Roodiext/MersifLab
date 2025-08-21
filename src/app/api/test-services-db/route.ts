import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Check table structure
    const structure = await query("DESCRIBE services")
    console.log('Services table structure:', structure)
    
    // Get all data
    const services = await query("SELECT * FROM services")
    console.log('Services data:', services)
    
    return NextResponse.json({
      success: true,
      structure,
      services
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}