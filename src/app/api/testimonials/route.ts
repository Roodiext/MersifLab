import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    console.log("API: Starting to fetch testimonials...")
    
    // Test database connection first
    const testConnection = await query("SELECT 1 as test")
    console.log("API: Database connection test:", testConnection)
    
    // Check if table exists
    const tableExists = await query("SHOW TABLES LIKE 'testimonials'")
    console.log("API: Table exists check:", tableExists)
    
    // Fetch testimonials
    const testimonials = await query("SELECT * FROM testimonials ORDER BY created_at DESC")
    console.log("API: Testimonials fetched:", testimonials)
    
    return NextResponse.json({ 
      success: true,
      testimonials: testimonials || []
    })
  } catch (error: any) {
    console.error("API: Detailed error:", {
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch testimonials",
        details: error.message 
      },
      { status: 500 }
    )
  }
}


