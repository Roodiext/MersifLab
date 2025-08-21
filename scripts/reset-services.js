const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function resetServices() {
  try {
    console.log('🔄 Resetting services to initial state...')
    
    // Clear all existing services
    await prisma.$executeRaw`DELETE FROM services`
    console.log('🗑️  Cleared all services')
    
    // Insert only 1 service (Mersif Academy) like before
    await prisma.$executeRaw`
      INSERT INTO services (name, description, image, link, sortOrder, isActive) 
      VALUES ('Mersif Academy', 'Program Mersif Academy', '/uploads/1755223971498-mersifacademy.png', '/mersifacademy', 1, 1)
    `
    console.log('✅ Created service: Mersif Academy')
    
    console.log('🎉 Services reset successfully!')
  } catch (error) {
    console.error('❌ Error resetting services:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetServices()
