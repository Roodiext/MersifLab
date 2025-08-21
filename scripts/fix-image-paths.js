const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function fixImagePaths() {
  try {
    console.log('�� Fixing image paths to match admin panel...')
    
    // Update Mersif Academy to use the same path as admin panel
    await prisma.$executeRaw`
      UPDATE services 
      SET image = '/uploads/1755223971498-mersifacademy.png' 
      WHERE name = 'Mersif Academy'
    `
    console.log('✅ Updated Mersif Academy image path to match admin panel')
    
    // Check current data
    const services = await prisma.$queryRaw`SELECT * FROM services`
    console.log('📊 Current services in database:', services)
    
    console.log('🎉 Image paths updated to match admin panel!')
  } catch (error) {
    console.error('❌ Error fixing image paths:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixImagePaths()
