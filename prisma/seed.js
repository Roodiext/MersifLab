const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mersiflab.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@mersiflab.com',
      password: hashedPassword,
      role: 'admin'
    }
  })

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Technology' },
      update: {},
      create: { name: 'Technology' }
    }),
    prisma.category.upsert({
      where: { name: 'Partnership' },
      update: {},
      create: { name: 'Partnership' }
    }),
    prisma.category.upsert({
      where: { name: 'Event' },
      update: {},
      create: { name: 'Event' }
    })
  ])

  console.log('Seed completed!')
  console.log('Admin user:', admin)
  console.log('Categories:', categories)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

