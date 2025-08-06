"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreateAdminPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const createAdmin = async () => {
    setLoading(true)
    setMessage('Membuat admin user...')

    try {
      const response = await fetch('/api/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'admin',
          email: 'admin@mersiflab.com',
          password: 'admin123',
          role: 'admin'
        })
      })

      const result = await response.json()
      
      if (response.ok) {
        setMessage('✅ Admin user berhasil dibuat! Username: admin, Password: admin123')
      } else {
        setMessage(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('❌ Gagal membuat admin user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Admin User</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={createAdmin} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Creating...' : 'Create Admin User'}
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