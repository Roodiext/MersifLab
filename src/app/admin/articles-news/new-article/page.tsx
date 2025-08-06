"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Upload, X, Eye, ImageIcon, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { generateSlug, validateFile, formatFileSize } from '@/lib/upload'

interface Category {
  id: number
  name: string
}

interface FormData {
  title: string
  slug: string
  content: string
  categoryId: string
  status: 'draft' | 'published'
}

export default function NewArticlePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    content: '',
    categoryId: '',
    status: 'draft'
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        console.log('Categories data:', data) // Debug log
        
        // Pastikan data adalah array
        if (Array.isArray(data)) {
          setCategories(data)
        } else {
          console.error('Categories data is not an array:', data)
          setCategories([])
          toast.error('Format data kategori tidak valid')
        }
      } else {
        console.error('Failed to fetch categories:', response.status)
        setCategories([])
        toast.error('Gagal memuat kategori')
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
      toast.error('Gagal memuat kategori')
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!validateFile(file)) {
        toast.error('File tidak valid. Gunakan JPEG, PNG, atau WebP dengan ukuran maksimal 5MB')
        return
      }
      
      setThumbnail(file)
      const reader = new FileReader()
      reader.onload = () => setThumbnailPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const removeThumbnail = () => {
    setThumbnail(null)
    setThumbnailPreview('')
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    const result = await response.json()
    if (!result.success) throw new Error(result.error || 'Upload failed')
    return result.filePath
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Judul artikel harus diisi')
      return
    }
    
    if (!formData.content.trim()) {
      toast.error('Konten artikel harus diisi')
      return
    }
    
    if (!formData.categoryId) {
      toast.error('Kategori harus dipilih')
      return
    }

    setLoading(true)

    try {
      let thumbnailPath = ''

      // Upload thumbnail if exists
      if (thumbnail) {
        thumbnailPath = await uploadFile(thumbnail)
      }

      // Create article
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          categoryId: parseInt(formData.categoryId),
          authorId: 1, // TODO: Get from session
          thumbnail: thumbnailPath,
          tags: tags.join(',')
        })
      })

      const result = await response.json()
      
      if (response.ok) {
        toast.success('Artikel berhasil dibuat')
        router.push('/admin/articles')
      } else {
        console.error('API Error:', result)
        throw new Error(result.error || result.details || 'Failed to create article')
      }
    } catch (error) {
      console.error('Error creating article:', error)
      toast.error(error instanceof Error ? error.message : 'Gagal membuat artikel')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Artikel Baru</h1>
            <p className="text-gray-600">Tambahkan artikel baru untuk website MersifLab</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Informasi Artikel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Judul Artikel *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder="Masukkan judul artikel"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="url-artikel"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        URL: /articles/{formData.slug || 'url-artikel'}
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="content">Konten Artikel *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Tulis konten artikel di sini..."
                        rows={12}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Thumbnail */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Thumbnail Artikel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {thumbnailPreview ? (
                      <div className="relative">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={removeThumbnail}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        {thumbnail && (
                          <p className="text-sm text-gray-500 mt-2">
                            {thumbnail.name} ({formatFileSize(thumbnail.size)})
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <div className="space-y-2">
                          <Label htmlFor="thumbnail" className="cursor-pointer">
                            <span className="text-blue-600 hover:text-blue-700 font-medium">
                              Klik untuk upload thumbnail
                            </span>
                            <Input
                              id="thumbnail"
                              type="file"
                              accept="image/*"
                              onChange={handleThumbnailChange}
                              className="hidden"
                            />
                          </Label>
                          <p className="text-sm text-gray-500">
                            PNG, JPG, WebP hingga 5MB
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publish Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Publikasi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="category">Kategori *</Label>
                      <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-categories" disabled>
                              Tidak ada kategori tersedia
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value: 'draft' | 'published') => setFormData(prev => ({ ...prev, status: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Tambah tag"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} size="sm">
                        Tambah
                      </Button>
                    </div>
                    
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            {tag}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loading}
                      >
                        {loading ? 'Menyimpan...' : 'Simpan Artikel'}
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => router.push('/admin/articles')}
                      >
                        Batal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
