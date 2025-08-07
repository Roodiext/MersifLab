import { NextResponse } from "next/server"

// Mock data untuk testing - nanti bisa diganti dengan database
const mockServices = [
  {
    id: 1,
    name: "Mersif Academy",
    description: "Platform pembelajaran online",
    image: "/img/services/academy.jpg",
    link: "/services/mersif-academy",
    sortOrder: 1
  },
  {
    id: 2,
    name: "Mersif IoT",
    description: "Internet of Things solutions",
    image: "/img/services/iot.jpg", 
    link: "/services/mersif-iot",
    sortOrder: 2
  },
  {
    id: 3,
    name: "Mersif Creator Room",
    description: "Platform kreasi ruang virtual",
    image: "/img/services/creator-room.jpg",
    link: "/services/mersif-creator-room", 
    sortOrder: 3
  },
  {
    id: 4,
    name: "Mersif Vista",
    description: "Visualisasi data dan analytics",
    image: "/img/services/vista.jpg",
    link: "/services/mersif-vista",
    sortOrder: 4
  },
  {
    id: 5,
    name: "Mersif Mobile Apps",
    description: "Aplikasi mobile untuk semua kebutuhan",
    image: "/img/services/mobile-apps.jpg",
    link: "/services/mersif-mobile-apps",
    sortOrder: 5
  }
]

export async function GET() {
  try {
    // Simulasi delay untuk testing loading state
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({ 
      services: mockServices.sort((a, b) => a.sortOrder - b.sortOrder)
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    )
  }
}

