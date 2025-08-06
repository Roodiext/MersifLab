"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Calendar,
  User,
  Tag,
  FileText,
  Newspaper,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Article {
  id: number
  title: string
  slug: string
  content: string
  thumbnail: string
  status: 'draft' | 'published'
  createdAt: string
  category: {
    id: number
    name: string
  }
  author: {
    id: number
    username: string
  }
  tags?: string
}

interface News {
  id: number
  title: string
  slug: string
  content: string
  thumbnail: string
  status: 'draft' | 'published'
  createdAt: string
  category: {
    id: number
    name: string
  }
  author: {
    id: number
    username: string
  }
}

export default function ArticlesNewsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [articlesRes, newsRes] = await Promise.all([
        fetch('/api/articles'),
        fetch('/api/news')
      ])

      if (articlesRes.ok) {
        const articlesData = await articlesRes.json()
        setArticles(Array.isArray(articlesData) ? articlesData : [])
      }

      if (newsRes.ok) {
        const newsData = await newsRes.json()
        setNews(Array.isArray(newsData) ? newsData : [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }

  const deleteArticle = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Artikel berhasil dihapus')
        fetchData()
      } else {
        toast.error('Gagal menghapus artikel')
      }
    } catch (error) {
      console.error('Error deleting article:', error)
      toast.error('Gagal menghapus artikel')
    }
  }

  const deleteNews = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Berita berhasil dihapus')
        fetchData()
      } else {
        toast.error('Gagal menghapus berita')
      }
    } catch (error) {
      console.error('Error deleting news:', error)
      toast.error('Gagal menghapus berita')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const filterItems = (items: (Article | News)[]) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }

  const filteredArticles = filterItems(articles)
  const filteredNews = filterItems(news)
  const allItems = [...filteredArticles.map(a => ({...a, type: 'article' as const})), 
                   ...filteredNews.map(n => ({...n, type: 'news' as const}))]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const stats = {
    totalArticles: articles.length,
    totalNews: news.length,
    publishedArticles: articles.filter(a => a.status === 'published').length,
    publishedNews: news.filter(n => n.status === 'published').length,
    draftArticles: articles.filter(a => a.status === 'draft').length,
    draftNews: news.filter(n => n.status === 'draft').length
  }

  const renderContentCard = (item: (Article | News) & { type: 'article' | 'news' }) => (
    <Card key={`${item.type}-${item.id}`} className="overflow-hidden hover:shadow-lg transition-shadow">
      {item.thumbnail && (
        <div className="aspect-video overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
          <div className="flex flex-col gap-1">
            <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
              {item.status}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {item.type === 'article' ? 'Artikel' : 'Berita'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-3">
          {item.content.substring(0, 150)}...
        </p>
        
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Tag className="h-3 w-3" />
            <span>{item.category.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-3 w-3" />
            <span>{item.author.username}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(item.createdAt)}</span>
          </div>
        </div>

        {'tags' in item && item.tags && (
          <div className="flex flex-wrap gap-1">
            {item.tags.split(',').slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag.trim()}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" asChild className="flex-1">
            <Link href={`/${item.type === 'article' ? 'articles' : 'news'}/${item.slug}`}>
              <Eye className="h-3 w-3 mr-1" />
              Lihat
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild className="flex-1">
            <Link href={`/admin/articles-news/${item.id}/edit?type=${item.type}`}>
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Link>
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => item.type === 'article' ? deleteArticle(item.id) : deleteNews(item.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Kelola Artikel & Berita</h1>
              <p className="text-gray-600">Kelola semua artikel dan berita di website MersifLab</p>
            </div>
            <div className="flex gap-2">
              <Button asChild className="gap-2">
                <Link href="/admin/articles-news/new-article">
                  <FileText className="h-4 w-4" />
                  Tambah Artikel
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/admin/articles-news/new-news">
                  <Newspaper className="h-4 w-4" />
                  Tambah Berita
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Artikel</p>
                    <p className="text-2xl font-bold">{stats.totalArticles}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Newspaper className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Berita</p>
                    <p className="text-2xl font-bold">{stats.totalNews}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Eye className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Published</p>
                    <p className="text-2xl font-bold">{stats.publishedArticles + stats.publishedNews}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Edit className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Draft</p>
                    <p className="text-2xl font-bold">{stats.draftArticles + stats.draftNews}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Cari artikel atau berita..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('all')}
                  >
                    Semua
                  </Button>
                  <Button
                    variant={statusFilter === 'published' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('published')}
                  >
                    Published
                  </Button>
                  <Button
                    variant={statusFilter === 'draft' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('draft')}
                  >
                    Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Semua ({allItems.length})
              </TabsTrigger>
              <TabsTrigger value="articles" className="gap-2">
                <FileText className="h-4 w-4" />
                Artikel ({filteredArticles.length})
              </TabsTrigger>
              <TabsTrigger value="news" className="gap-2">
                <Newspaper className="h-4 w-4" />
                Berita ({filteredNews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {allItems.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <Search className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {searchTerm ? 'Tidak ada konten yang ditemukan' : 'Belum ada konten'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm 
                        ? 'Coba ubah kata kunci pencarian Anda'
                        : 'Mulai dengan membuat artikel atau berita pertama Anda'
                      }
                    </p>
                    {!searchTerm && (
                      <div className="flex gap-2 justify-center">
                        <Button asChild>
                          <Link href="/admin/articles-news/new-article">
                            <FileText className="h-4 w-4 mr-2" />
                            Tambah Artikel
                          </Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link href="/admin/articles-news/new-news">
                            <Newspaper className="h-4 w-4 mr-2" />
                            Tambah Berita
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {allItems.map(renderContentCard)}
                </div>
              )}
            </TabsContent>

            <TabsContent value="articles">
              {filteredArticles.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <FileText className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {searchTerm ? 'Tidak ada artikel yang ditemukan' : 'Belum ada artikel'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm 
                        ? 'Coba ubah kata kunci pencarian Anda'
                        : 'Mulai dengan membuat artikel pertama Anda'
                      }
                    </p>
                    {!searchTerm && (
                      <Button asChild>
                        <Link href="/admin/articles-news/new-article">
                          <Plus className="h-4 w-4 mr-2" />
                          Tambah Artikel
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredArticles.map(article => renderContentCard({...article, type: 'article'}))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="news">
              {filteredNews.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <Newspaper className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {searchTerm ? 'Tidak ada berita yang ditemukan' : 'Belum ada berita'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm 
                        ? 'Coba ubah kata kunci pencarian Anda'
                        : 'Mulai dengan membuat berita pertama Anda'
                      }
                    </p>
                    {!searchTerm && (
                      <Button asChild>
                        <Link href="/admin/articles-news/new-news">
                          <Plus className="h-4 w-4 mr-2" />
                          Tambah Berita
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredNews.map(newsItem => renderContentCard({...newsItem, type: 'news'}))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
