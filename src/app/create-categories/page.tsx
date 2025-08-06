"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreateCategoriesPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const createCategories = async () => {
    setLoading(true)
    setMessage('Membuat categories...')

    try {
      const categories = [
        { name: 'Teknologi', description: 'Berita dan artikel tentang teknologi' },
        { name: 'Pendidikan', description: 'Konten seputar pendidikan' },
        { name: 'Event', description: 'Event dan kegiatan MersifLab' }
      ]

      for (const category of categories) {
        await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(category)
        })
      }

      setMessage('✅ Categories berhasil dibuat!')
    } catch (error) {
      setMessage('❌ Gagal membuat categories')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={createCategories} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Creating...' : 'Create Categories'}
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