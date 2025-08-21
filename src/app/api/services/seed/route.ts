import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { services } = await request.json()
    
    if (!Array.isArray(services)) {
      return NextResponse.json(
        { error: "Services data must be an array" },
        { status: 400 }
      )
    }

    // Clear existing services first
    await query("DELETE FROM services")
    
    // Insert new services
    for (const service of services) {
      await query(
        "INSERT INTO services (name, description, image, link, sortOrder, isActive) VALUES (?, ?, ?, ?, ?, ?)",
        [
          service.name,
          service.description,
          service.image,
          service.link,
          service.sortOrder || 0,
          true
        ]
      )
    }
    
    return NextResponse.json({ 
      success: true,
      message: `${services.length} services seeded successfully`
    })
  } catch (error) {
    console.error("Seed API Error:", error)
    return NextResponse.json(
      { error: "Failed to seed services data" },
      { status: 500 }
    )
  }
}
