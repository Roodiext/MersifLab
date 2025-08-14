import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Mock data untuk services (sementara sampai database siap)
const mockServices = [
  {
    id: 1,
    name: "Mersif Academy",
    description: "Platform pembelajaran online",
    image: "/img/service/mersifacademy-img.svg",
    link: "/services/mersif-academy",
    sortOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "Mersif Iot",
    description: "Internet of Things solutions",
    image: "/img/service/mersifiot-img.svg",
    link: "/services/mersif-iot",
    sortOrder: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: "Mersif Creator Room",
    description: "Platform kreasi ruang virtual",
    image: "/img/service/mersifcreator-img.svg",
    link: "/services/mersif-creator-room",
    sortOrder: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    name: "Mersif Vista",
    description: "Visualisasi data dan analytics",
    image: "/img/service/mersifvista.svg",
    link: "/services/mersif-vista",
    sortOrder: 4,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    name: "Mersif Mobile Apps",
    description: "Aplikasi mobile untuk semua kebutuhan",
    image: "/img/service/mersif-ar.svg", // Menggunakan AR sebagai placeholder untuk mobile apps
    link: "/services/mersif-mobile-apps",
    sortOrder: 5,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// GET all services
export async function GET() {
  try {
    // Coba ambil dari database dulu
    const services = await query("SELECT * FROM services ORDER BY sortOrder ASC, created_at ASC");
    
    // Jika berhasil, return data dari database
    if (services && services.length > 0) {
      return NextResponse.json(services);
    }
    
    // Jika database kosong atau error, gunakan mock data
    console.log("Using mock services data");
    return NextResponse.json(mockServices);
    
  } catch (error) {
    console.error("Error fetching services from database, using mock data:", error);
    // Fallback ke mock data jika database error
    return NextResponse.json(mockServices);
  }
}
