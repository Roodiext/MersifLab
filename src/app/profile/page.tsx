"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { User, Mail, Calendar, Shield, Camera, Save, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface UserProfile {
  id: number
  email: string
  username: string
  name: string | null
  avatar: string | null
  role: string
  createdAt: string
}

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  })

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }
    fetchProfile()
  }, [session, router])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setFormData({
          name: data.name || '',
          username: data.username || '',
          email: data.email || ''
        })
      } else {
        toast.error('Gagal memuat profil')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast.error('Gagal memuat profil')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 5MB')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const uploadResponse = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData
      })

      if (uploadResponse.ok) {
        const { avatarUrl } = await uploadResponse.json()
        
        const updateResponse = await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatar: avatarUrl })
        })

        if (updateResponse.ok) {
          const updatedProfile = await updateResponse.json()
          setProfile(updatedProfile)
          
          // Update session with new avatar
          await update({
            ...session,
            user: {
              ...session?.user,
              avatar: avatarUrl
            }
          })
          
          toast.success('Foto profil berhasil diperbarui')
          
          // Refresh page after short delay to ensure session is updated
          setTimeout(() => {
            window.location.reload()
          }, 500)
        }
      }
    } catch (error) {
      toast.error('Gagal mengunggah foto')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        
        // Update session
        await update({
          ...session,
          user: {
            ...session?.user,
            name: updatedProfile.name,
            username: updatedProfile.username,
            email: updatedProfile.email
          }
        })
        
        toast.success('Profil berhasil diperbarui')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Gagal memperbarui profil')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Gagal memperbarui profil')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat profil...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Profil tidak ditemukan</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/" style={{ fontFamily: "Inter, sans-serif" }} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Profil Saya</h1>
          <p className="text-gray-600 mt-2" style={{ fontFamily: "Inter, sans-serif" }}>Kelola informasi profil dan pengaturan akun Anda</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24 mx-auto ring-4 ring-white shadow-lg">
                    <AvatarImage src={profile.avatar || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
                      {profile.name?.substring(0, 2).toUpperCase() || profile.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer shadow-lg transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  {uploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {profile.name || profile.username}
                </h2>
                <p className="text-gray-500 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>@{profile.username}</p>
                
                <Badge variant="secondary" style={{ fontFamily: "Inter, sans-serif" }} className="mb-4">
                  <Shield className="w-3 h-3 mr-1" />
                  {profile.role}
                </Badge>
                
                <Separator className="my-4" />
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4"  />
                    <span style={{ fontFamily: "Inter, sans-serif" }}>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span style={{ fontFamily: "Inter, sans-serif" }} >Bergabung {new Date(profile.createdAt).toLocaleDateString('id-ID', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: "Poppins, sans-serif" }} className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Edit Profil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name" style={{ fontFamily: "Inter, sans-serif" }}>Nama Lengkap</Label>
                      <Input
                        id="name"
                        style={{ fontFamily: "Inter, sans-serif" }}
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <Label htmlFor="username" style={{ fontFamily: "Inter, sans-serif" }}>Username</Label>
                      <Input
                      style={{ fontFamily: "Inter, sans-serif" }}
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        placeholder="Masukkan username"
                        required
                      />
                    </div>
                  </div>
                  
                  <div style={{ fontFamily: "Inter, sans-serif" }}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Masukkan email"
                      required
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button style={{ fontFamily: "Poppins, sans-serif" }} type="submit" disabled={saving} className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                    <Button style={{ fontFamily: "Poppins, sans-serif" }} type="button" variant="outline" asChild>
                      <Link href="/settings">Pengaturan Lanjutan</Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}



