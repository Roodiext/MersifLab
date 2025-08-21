const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const services = [
  {
    name: "Mersif Academy",
    description: "Platform pembelajaran online yang inovatif dengan teknologi terkini",
    image: "/img/service/mersifacademy.svg",
    link: "/mersifacademy",
    sortOrder: 1,
    isActive: true
  },
  {
    name: "Mersif IoT",
    description: "Solusi Internet of Things untuk berbagai kebutuhan industri",
    image: "/img/service/mersifiot.svg",
    link: "/mersifiot",
    sortOrder: 2,
    isActive: true
  },
  {
    name: "Mersif Creator Room",
    description: "Platform kreasi ruang virtual yang memungkinkan kolaborasi kreatif",
    image: "/img/service/mersifcreator-img.svg",
    link: "/mersifcreator",
    sortOrder: 3,
    isActive: true
  },
  {
    name: "Mersif Vista",
    description: "Visualisasi data dan analytics yang powerful dan mudah digunakan",
    image: "/img/service/mersifvista.svg",
    link: "/mersifvista",
    sortOrder: 4,
    isActive: true
  },
  {
    name: "Mersif Mobile Apps",
    description: "Aplikasi mobile yang responsif dan user-friendly untuk semua kebutuhan",
    image: "/img/service/mersifiot-img.svg",
    link: "/mersifcreator",
    sortOrder: 5,
    isActive: true
  }
]

async function seedServices() {
  try {
    console.log('🌱 Starting services seed...')
    
    // Clear existing services
    await prisma.service.deleteMany()
    console.log('🗑️  Cleared existing services')
    
    // Insert new services using raw SQL to avoid Prisma schema issues
    for (const service of services) {
      await prisma.$executeRaw`
        INSERT INTO services (name, description, image, link, sortOrder, isActive) 
        VALUES (${service.name}, ${service.description}, ${service.image}, ${service.link}, ${service.sortOrder}, ${service.isActive})
      `
      console.log(`✅ Created service: ${service.name}`)
    }
    
    console.log('🎉 Services seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding services:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedServices()
