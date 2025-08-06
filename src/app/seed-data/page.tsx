"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SeedDataPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const seedData = async () => {
    setLoading(true)
    setMessage('Sedang membuat sample data...')

    try {
      // 1. Create Categories
      const categories = [
        { name: 'Teknologi', description: 'Berita dan artikel tentang teknologi' },
        { name: 'Pendidikan', description: 'Konten seputar pendidikan' },
        { name: 'Inovasi', description: 'Inovasi dan penelitian terbaru' },
        { name: 'Event', description: 'Event dan kegiatan MersifLab' },
        { name: 'Partnership', description: 'Kemitraan dan kolaborasi' }
      ]

      for (const category of categories) {
        await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(category)
        })
      }

      // 2. Create Sample Articles
      const articles = [
        {
          title: 'Revolusi Teknologi 3D Printing dalam Pendidikan',
          slug: 'revolusi-teknologi-3d-printing-dalam-pendidikan',
          content: `<p>Teknologi 3D printing telah mengubah cara kita memandang pembelajaran di era digital. Di MersifLab, kami telah mengimplementasikan teknologi ini untuk memberikan pengalaman belajar yang lebih interaktif dan menarik bagi siswa.</p>

<p>Dengan menggunakan printer 3D, siswa dapat mewujudkan ide-ide kreatif mereka menjadi objek nyata. Hal ini tidak hanya meningkatkan pemahaman konsep, tetapi juga mengembangkan keterampilan problem-solving dan kreativitas.</p>

<p>Program pelatihan yang kami selenggarakan telah mencakup lebih dari 200 guru di berbagai sekolah, dengan hasil yang sangat positif dalam meningkatkan kualitas pembelajaran.</p>`,
          thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
          categoryId: 1, // Teknologi
          authorId: 4, // Atha_hy (admin)
          status: 'published'
        },
        {
          title: 'Strategi Pembelajaran Digital di Era Modern',
          slug: 'strategi-pembelajaran-digital-di-era-modern',
          content: `<p>Era digital menuntut pendekatan pembelajaran yang lebih adaptif dan inovatif. MersifLab hadir sebagai solusi untuk menjembatani kesenjangan teknologi dalam dunia pendidikan.</p>

<p>Melalui berbagai program dan workshop, kami membantu institusi pendidikan untuk mengintegrasikan teknologi dalam proses pembelajaran. Mulai dari penggunaan VR untuk pembelajaran immersive hingga IoT untuk eksperimen sains yang lebih menarik.</p>

<p>Hasil evaluasi menunjukkan peningkatan engagement siswa hingga 85% ketika menggunakan teknologi dalam pembelajaran.</p>`,
          thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
          categoryId: 2, // Pendidikan
          authorId: 4,
          status: 'published'
        },
        {
          title: 'Inovasi IoT untuk Smart Classroom',
          slug: 'inovasi-iot-untuk-smart-classroom',
          content: `<p>Internet of Things (IoT) membuka peluang besar untuk menciptakan ruang kelas yang lebih cerdas dan responsif. MersifLab telah mengembangkan solusi IoT yang dapat diterapkan di berbagai tingkat pendidikan.</p>

<p>Sistem yang kami kembangkan mencakup monitoring suhu ruangan, pencahayaan otomatis, dan sistem absensi digital yang terintegrasi. Semua data dapat diakses secara real-time oleh pengelola sekolah.</p>

<p>Pilot project yang dilakukan di 5 sekolah menunjukkan efisiensi energi meningkat 30% dan tingkat kehadiran siswa meningkat 15%.</p>`,
          thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
          categoryId: 3, // Inovasi
          authorId: 4,
          status: 'published'
        }
      ]

      for (const article of articles) {
        await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(article)
        })
      }

      // 3. Create Sample News
      const news = [
        {
          title: 'MersifLab Raih Penghargaan Inovasi Pendidikan 2024',
          slug: 'mersiflab-raih-penghargaan-inovasi-pendidikan-2024',
          content: `<p>MersifLab dengan bangga mengumumkan pencapaian penghargaan "Inovasi Pendidikan Terbaik 2024" dari Kementerian Pendidikan dan Kebudayaan.</p>

<p>Penghargaan ini diberikan atas kontribusi MersifLab dalam mengembangkan teknologi pendidikan yang telah diimplementasikan di lebih dari 50 sekolah di Indonesia.</p>

<p>CEO MersifLab menyatakan bahwa penghargaan ini menjadi motivasi untuk terus berinovasi dalam menciptakan solusi pendidikan yang lebih baik.</p>`,
          thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
          categoryId: 4, // Event
          authorId: 4,
          status: 'published'
        },
        {
          title: 'Kemitraan Strategis dengan Universitas Terkemuka',
          slug: 'kemitraan-strategis-dengan-universitas-terkemuka',
          content: `<p>MersifLab menjalin kemitraan strategis dengan 3 universitas terkemuka di Indonesia untuk mengembangkan program penelitian dan pengembangan teknologi pendidikan.</p>

<p>Kemitraan ini akan fokus pada pengembangan kurikulum berbasis teknologi, pelatihan dosen, dan penelitian bersama dalam bidang educational technology.</p>

<p>Program ini diharapkan dapat menghasilkan lulusan yang lebih siap menghadapi tantangan industri 4.0.</p>`,
          thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop',
          categoryId: 5, // Partnership
          authorId: 4,
          status: 'published'
        },
        {
          title: 'Workshop 3D Printing Sukses Diselenggarakan',
          slug: 'workshop-3d-printing-sukses-diselenggarakan',
          content: `<p>Workshop 3D Printing yang diselenggarakan MersifLab di SMP Negeri 13 Surakarta telah berhasil dilaksanakan dengan antusias tinggi dari para peserta.</p>

<p>Sebanyak 50 guru dari berbagai sekolah mengikuti workshop ini dan mendapatkan sertifikat kompetensi dalam penggunaan teknologi 3D printing untuk pembelajaran.</p>

<p>Peserta workshop menyatakan bahwa materi yang diberikan sangat aplikatif dan dapat langsung diterapkan di kelas masing-masing.</p>`,
          thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop',
          categoryId: 4, // Event
          authorId: 4,
          status: 'published'
        }
      ]

      for (const newsItem of news) {
        await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newsItem)
        })
      }

      setMessage('✅ Sample data berhasil dibuat! Silakan cek halaman /news')
    } catch (error) {
      console.error('Error seeding data:', error)
      setMessage('❌ Gagal membuat sample data. Cek console untuk detail error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Seed Sample Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Klik tombol di bawah untuk membuat sample data (categories, articles, dan news) 
            untuk testing sistem berita dan artikel.
          </p>
          
          <Button 
            onClick={seedData} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Membuat Data...' : 'Buat Sample Data'}
          </Button>
          
          {message && (
            <div className={`p-4 rounded-lg ${
              message.includes('✅') ? 'bg-green-50 text-green-800' : 
              message.includes('❌') ? 'bg-red-50 text-red-800' : 
              'bg-blue-50 text-blue-800'
            }`}>
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}