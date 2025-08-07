import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    console.log("Testing testimonials table...")
    
    // Check if table exists
    const tableCheck = await query("SHOW TABLES LIKE 'testimonials'")
    console.log("Table exists:", tableCheck)
    
    // Check table structure
    const structure = await query("DESCRIBE testimonials")
    console.log("Table structure:", structure)
    
    // Count records
    const count = await query("SELECT COUNT(*) as count FROM testimonials")
    console.log("Record count:", count)
    
    // Get all records
    const records = await query("SELECT * FROM testimonials")
    console.log("All records:", records)
    
    return NextResponse.json({
      success: true,
      tableExists: tableCheck,
      structure,
      count,
      records
    })
  } catch (error: any) {
    console.error("Test error:", error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}