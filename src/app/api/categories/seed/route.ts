import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST() {
  try {
    const categories = [
      { name: 'Mersiflab', description: 'Berita dan update tentang Mersiflab' },
      { name: 'MersifAcademy', description: 'Konten seputar platform pembelajaran MersifAcademy' },
      { name: 'MersifIoT', description: 'Berita dan artikel tentang solusi IoT Mersif' },
      { name: 'Mersif Impact', description: 'Dampak dan kontribusi Mersif untuk masyarakat' },
      { name: 'Berita', description: 'Berita umum dan informasi terkini' },
      { name: 'Pengumuman', description: 'Pengumuman resmi dan informasi penting' }
    ]

    const results = []
    
    for (const category of categories) {
      // Cek apakah kategori sudah ada
      const existing = await prisma.category.findUnique({
        where: { name: category.name }
      })
      
      if (!existing) {
        const newCategory = await prisma.category.create({
          data: {
            name: category.name,
            slug: category.name.toLowerCase().replace(/\s+/g, '-'),
            description: category.description
          }
        })
        results.push({ action: 'created', category: newCategory })
      } else {
        results.push({ action: 'exists', category: existing })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Kategori berhasil ditambahkan',
      results
    })

  } catch (error) {
    console.error('Error seeding categories:', error)
    return NextResponse.json({
      error: 'Gagal menambahkan kategori',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}