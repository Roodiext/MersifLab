import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    // Mengambil data dari database
    const services = await query("SELECT * FROM services WHERE isActive = true ORDER BY sortOrder ASC, created_at ASC") as any[]
    
    // Mapping data dengan path gambar yang benar
    const mappedServices = services.map((service: any) => ({
      id: service.id,
      name: service.name,
      description: service.description,
      image: service.image || getDefaultImage(service.name),
      link: service.link,
      sortOrder: service.sortOrder
    }))
    
    return NextResponse.json({ 
      services: mappedServices
    })
  } catch (error) {
    console.error("API Error:", error)
    
    // Fallback ke mock data jika database error
    const mockServices = [
      {
        id: 1,
        name: "Mersif Academy",
        description: "Platform pembelajaran online",
        image: "/img/service/mersifacademy.svg",
        link: "/mersifacademy",
        sortOrder: 1
      },
      {
        id: 2,
        name: "Mersif IoT",
        description: "Internet of Things solutions",
        image: "/img/service/mersifiot.svg", 
        link: "/mersifiot",
        sortOrder: 2
      },
      {
        id: 3,
        name: "Mersif Creator Room",
        description: "Platform kreasi ruang virtual",
        image: "/img/service/mersifcreator-img.svg",
        link: "/mersifcreator", 
        sortOrder: 3
      },
      {
        id: 4,
        name: "Mersif Vista",
        description: "Visualisasi data dan analytics",
        image: "/img/service/mersifvista.svg",
        link: "/mersifvista",
        sortOrder: 4
      },
      {
        id: 5,
        name: "Mersif Mobile Apps",
        description: "Aplikasi mobile untuk semua kebutuhan",
        image: "/img/service/mersifiot-img.svg",
        link: "/mersifcreator",
        sortOrder: 5
      }
    ]
    
    return NextResponse.json({ 
      services: mockServices
    })
  }
}

// Helper function untuk mendapatkan gambar default berdasarkan nama service
function getDefaultImage(serviceName: string): string {
  const name = serviceName.toLowerCase()
  
  if (name.includes('academy')) {
    return "/img/service/mersifacademy.svg"
  } else if (name.includes('iot')) {
    return "/img/service/mersifiot.svg"
  } else if (name.includes('creator')) {
    return "/img/service/mersifcreator-img.svg"
  } else if (name.includes('vista')) {
    return "/img/service/mersifvista.svg"
  } else if (name.includes('mobile')) {
    return "/img/service/mersifiot-img.svg"
  }
  
  return "/img/service/mersifacademy.svg" // default fallback
}