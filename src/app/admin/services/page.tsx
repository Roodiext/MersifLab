"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

interface Service {
  id: number
  name: string
  description: string
  image: string
  link: string
  sortOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      console.log('🔄 Fetching services...')
      const response = await fetch('/api/services')
      
      console.log('📡 Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('📊 API Response:', data)
      
      if (data.success && data.services) {
        setServices(data.services)
        console.log('✅ Services loaded:', data.services.length)
      } else {
        console.error('❌ API returned error:', data)
        toast.error(data.error || 'Gagal memuat layanan')
      }
    } catch (error) {
      console.error('❌ Fetch error:', error)
      toast.error('Gagal memuat layanan: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const deleteService = async (id: number) => {
    if (!confirm('Yakin ingin menghapus layanan ini?')) return

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Layanan berhasil dihapus')
        fetchServices()
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast.error('Gagal menghapus layanan')
    }
  }

  const toggleActive = async (id: number, isActive: boolean) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        toast.success('Status layanan berhasil diubah')
        fetchServices()
      }
    } catch (error) {
      toast.error('Gagal mengubah status layanan')
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Layanan</h1>
          <p className="text-gray-600">Kelola layanan yang ditampilkan di website</p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Layanan
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <Badge variant={service.isActive ? "default" : "secondary"}>
                  {service.isActive ? "Aktif" : "Nonaktif"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                />
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2">
                {service.description}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ExternalLink className="h-3 w-3" />
                <span className="truncate">{service.link}</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild className="flex-1">
                  <Link href={service.link} target="_blank">
                    <Eye className="h-3 w-3 mr-1" />
                    Lihat
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild className="flex-1">
                  <Link href={`/admin/services/${service.id}/edit`}>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => toggleActive(service.id, service.isActive)}
                  className="px-2"
                >
                  {service.isActive ? "Hide" : "Show"}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => deleteService(service.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Belum ada layanan</p>
          <Button asChild className="mt-4">
            <Link href="/admin/services/new">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Layanan Pertama
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

