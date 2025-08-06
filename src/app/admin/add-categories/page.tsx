"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function AddCategoriesPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const addCategories = async () => {
    setLoading(true)
    setMessage('Menambahkan kategori...')

    try {
      const response = await fetch('/api/categories/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const result = await response.json()

      if (result.success) {
        setMessage('✅ Kategori berhasil ditambahkan!')
        console.log('Results:', result.results)
      } else {
        setMessage('❌ Gagal menambahkan kategori')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('❌ Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Tambah Kategori Berita</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            <p>Kategori yang akan ditambahkan:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Mersiflab</li>
              <li>MersifAcademy</li>
              <li>MersifIoT</li>
              <li>Mersif Impact</li>
              <li>Berita</li>
              <li>Pengumuman</li>
            </ul>
          </div>
          
          <Button 
            onClick={addCategories} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Menambahkan...' : 'Tambah Kategori'}
          </Button>
          
          {message && (
            <div className={`p-4 rounded-lg text-sm ${
              message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}