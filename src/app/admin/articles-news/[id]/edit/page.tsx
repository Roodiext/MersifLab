"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Upload, X, Eye, ImageIcon, FileText, Newspaper, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { generateSlug, validateFile } from '@/lib/upload'
import Link from 'next/link'

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

interface ContentItem {
  id: number
  title: string
  slug: string
  content: string
  thumbnail: string
  categoryId: number
  status: 'draft' | 'published'
  category: Category
  author: {
    id: number
    username: string
  }
}

export default function EditContentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const contentType = searchParams.get('type') as 'article' | 'news'
  
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('')
  const [existingThumbnail, setExistingThumbnail] = useState<string>('')
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
    if (!contentType || !['article', 'news'].includes(contentType)) {
      toast.error('Tipe konten tidak valid')
      router.push('/admin/articles-news')
      return
    }
    
    fetchCategories()
    fetchContent()
  }, [params.id, contentType])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Gagal memuat kategori')
    }
  }

  const fetchContent = async () => {
    try {
      const endpoint = contentType === 'article' ? '/api/articles' : '/api/news'
      const response = await fetch(`${endpoint}/${params.id}`)
      
      if (response.ok) {
        const data: ContentItem = await response.json()
        setFormData({
          title: data.title,
          slug: data.slug,
          content: data.content,
          categoryId: data.categoryId.toString(),
          status: data.status
        })
        
        if (data.thumbnail) {
          setExistingThumbnail(data.thumbnail)
          setThumbnailPreview(data.thumbnail)
        }
      } else {
        toast.error('Konten tidak ditemukan')
        router.push('/admin/articles-news')
      }
    } catch (error) {
      console.error('Error fetching content:', error)
      toast.error('Gagal memuat data')
      router.push('/admin/articles-news')
    } finally {
      setInitialLoading(false)
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
    setThumbnailPreview(existingThumbnail)
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
      toast.error(`Judul ${contentType === 'article' ? 'artikel' : 'berita'} harus diisi`)
      return
    }
    
    if (!formData.content.trim()) {
      toast.error(`Konten ${contentType === 'article' ? 'artikel' : 'berita'} harus diisi`)
      return
    }
    
    if (!formData.categoryId) {
      toast.error('Kategori harus dipilih')
      return
    }

    setLoading(true)

    try {
      let thumbnailPath = existingThumbnail

      // Upload new thumbnail if changed
      if (thumbnail) {
        thumbnailPath = await uploadFile(thumbnail)
      }

      const updateData = {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        thumbnail: thumbnailPath
      }

      const endpoint = contentType === 'article' ? '/api/articles' : '/api/news'
      const response = await fetch(`${endpoint}/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })
      
      if (response.ok) {
        toast.success(`${contentType === 'article' ? 'Artikel' : 'Berita'} berhasil diperbarui`)
        router.push('/admin/articles-news')
      } else {
        const result = await response.json()
        throw new Error(result.error || 'Failed to update')
      }
    } catch (error) {
      console.error('Error updating content:', error)
      toast.error(error instanceof Error ? error.message : 'Gagal memperbarui konten')
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" asChild>
                <Link href="/admin/articles-news" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Kembali
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Edit {contentType === 'article' ? 'Artikel' : 'Berita'}
            </h1>
            <p className="text-gray-600">
              Perbarui {contentType === 'article' ? 'artikel' : 'berita'} untuk website MersifLab
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {contentType === 'article' ? (
                        <FileText className="h-5 w-5" />
                      ) : (
                        <Newspaper className="h-5 w-5" />
                      )}
                      Informasi {contentType === 'article' ? 'Artikel' : 'Berita'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">
                        Judul {contentType === 'article' ? 'Artikel' : 'Berita'} *
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder={`Masukkan judul ${contentType === 'article' ? 'artikel' : 'berita'}`}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="url-konten"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        URL: /{contentType === 'article' ? 'articles' : 'news'}/{formData.slug || 'url-konten'}
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="content">Konten *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Tulis konten di sini..."
                        className="min-h-[300px]"
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
                      Thumbnail
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {thumbnailPreview ? (
                      <div className="space-y-4">
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
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                          className="hidden"
                          id="thumbnail-upload"
                        />
                        <Label htmlFor="thumbnail-upload" className="cursor-pointer">
                          <div className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                            <Upload className="h-4 w-4" />
                            Ganti Thumbnail
                          </div>
                        </Label>
                      </div>
                    ) : (
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                          className="hidden"
                          id="thumbnail-upload"
                        />
                        <Label htmlFor="thumbnail-upload" className="cursor-pointer">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              Klik untuk upload thumbnail
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG, WebP hingga 5MB
                            </p>
                          </div>
                        </Label>
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
                      <Select
                        value={formData.categoryId}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: 'draft' | 'published') => 
                          setFormData(prev => ({ ...prev, status: value }))
                        }
                      >
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

                {/* Actions */}
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? 'Menyimpan...' : 'Perbarui'}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      asChild
                    >
                      <Link href="/admin/articles-news">
                        Batal
                      </Link>
                    </Button>
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