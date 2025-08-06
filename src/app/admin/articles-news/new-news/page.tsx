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
  name: stringcvv
}

interface FormData {
  title: string
  slug: string
  content: string
  categoryId: string
  status: 'draft' | 'published'
}

export default function NewNewsPage() {
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
        if (Array.isArray(data)) {
          setCategories(data)
        } else {
          setCategories([])
          toast.error('Format data kategori tidak valid')
        }
      } else {
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
    
    console.log('Form data before validation:', formData)
    
    if (!formData.title.trim()) {
      toast.error('Judul berita harus diisi')
      return
    }
    
    if (!formData.content.trim()) {
      toast.error('Konten berita harus diisi')
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
        console.log('Uploading thumbnail...')
        thumbnailPath = await uploadFile(thumbnail)
        console.log('Thumbnail uploaded:', thumbnailPath)
      }

      const newsData = {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        authorId: 1, // TODO: Get from session
        thumbnail: thumbnailPath
      }
      
      console.log('Sending news data:', newsData)

      // Create news
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsData)
      })

      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Response data:', result)
      
      if (response.ok) {
        toast.success('Berita berhasil dibuat')
        router.push('/admin/articles-news')
      } else {
        console.error('API Error:', result)
        throw new Error(result.error || result.details || 'Failed to create news')
      }
    } catch (error) {
      console.error('Error creating news:', error)
      toast.error(error instanceof Error ? error.message : 'Gagal membuat berita')
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Berita Baru</h1>
            <p className="text-gray-600">Tambahkan berita baru untuk website MersifLab</p>
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
                      Informasi Berita
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Judul Berita *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder="Masukkan judul berita"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="url-berita"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        URL: /news/{formData.slug || 'url-berita'}
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="content">Konten Berita *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Tulis konten berita di sini..."
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
                      Thumbnail Berita
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {thumbnailPreview ? (
                      <div className="relative">
                        <img
                          src={thumbnailPreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
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
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Upload thumbnail berita</p>
                        <p className="text-sm text-gray-500 mb-4">
                          JPEG, PNG, atau WebP (Maks. 5MB)
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                          className="max-w-xs mx-auto"
                        />
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
                        {tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="gap-1">
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
                        {loading ? 'Menyimpan...' : 'Simpan Berita'}
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => router.push('/admin/articles-news')}
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


