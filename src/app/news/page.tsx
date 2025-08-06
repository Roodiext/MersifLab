"use client"

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image' // Import Image component for optimized images
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Search, Filter, Newspaper, BookOpen } from 'lucide-react' // Added Newspaper and BookOpen icons
import { Input } from '@/components/ui/input'

interface ContentItem {
  id: number
  title: string
  slug: string
  content: string
  thumbnail?: string
  category: { name: string }
  author: { username: string }
  createdAt: string
  type: 'article' | 'news'
}

interface Category {
  id: number
  name: string
}

export default function NewsPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  useEffect(() => {
    fetchContent()
    fetchCategories()
  }, [])

  const fetchContent = async () => {
    try {
      console.log('Fetching content...')
      const response = await fetch('/api/content')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Content received:', data)
      if (data.error) {
        throw new Error(data.error)
      }
      // Sort content items by creation date in descending order
      const sortedData = data.sort((a: ContentItem, b: ContentItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setContentItems(sortedData)
    } catch (error) {
      console.error('Failed to fetch content:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch content')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const truncateContent = (content: string, maxLength: number = 150) => {
    const textContent = content.replace(/<[^>]*>/g, '')
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + '...'
      : textContent
  }

  // Determine featured article and filter the rest
  const featuredArticle = useMemo(() => contentItems.length > 0 ? contentItems[0] : null, [contentItems]);

  const filteredItems = useMemo(() => {
    const itemsToFilter = featuredArticle ? contentItems.slice(1) : contentItems; // Exclude featured from main grid
    return itemsToFilter.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || item.category.name === categoryFilter
      const matchesType = typeFilter === 'all' || item.type === typeFilter
      return matchesSearch && matchesCategory && matchesType
    });
  }, [contentItems, featuredArticle, searchTerm, categoryFilter, typeFilter]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 font-medium">Loading content...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto shadow-lg">
              <h3 className="text-red-800 font-bold text-xl mb-3">Error Loading Content</h3>
              <p className="text-red-600 text-base mb-6">{error}</p>
              <Button
                onClick={() => {
                  setError(null)
                  setLoading(true)
                  fetchContent()
                }}
                className="w-full"
                variant="destructive"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <h1 style={{ fontFamily: "Poppins, sans-serif" }} className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Berita & Artikel
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif" }} className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Informasi terkini dan analisis mendalam dari MersifLab.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 p-6 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Cari berita atau artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-input focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Semua Tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="article">Artikel</SelectItem>
              <SelectItem value="news">Berita</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Article Section */}
        {featuredArticle && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">Berita Utama</h2>
            <Card className="rounded-xl shadow-lg overflow-hidden">
              <Link href={`/news-detail/${featuredArticle.slug}`} className="flex flex-col md:flex-row">
                <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                  {featuredArticle.thumbnail ? (
                    <Image
                      src={featuredArticle.thumbnail || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <Image
                        src="/news-article-placeholder.png"
                        alt="Placeholder image"
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <CardContent className="md:w-1/2 p-6 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-sm px-3 py-1 rounded-full border-gray-300 text-gray-700">
                      {featuredArticle.category.name}
                    </Badge>
                    <Badge variant={featuredArticle.type === 'article' ? 'default' : 'secondary'} className="text-sm px-3 py-1 rounded-full">
                      {featuredArticle.type === 'article' ? 'Artikel' : 'Berita'}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-3xl md:text-4xl mb-4 leading-tight text-gray-900 hover:text-blue-700 transition-colors duration-200">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-700 text-lg mb-6 line-clamp-4">
                    {truncateContent(featuredArticle.content, 250)}
                  </p>
                  <div className="flex items-center justify-between text-base text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span>
                        {new Date(featuredArticle.createdAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <span className="font-semibold">By {featuredArticle.author.username}</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        )}

        {/* Main Content Grid */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">Konten Lainnya</h2>
        <div className="mb-8 text-gray-700 text-lg font-medium">
          <p>
            Menampilkan {filteredItems.length} dari {contentItems.length - (featuredArticle ? 1 : 0)} konten
          </p>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card key={`${item.type}-${item.id}`} className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <Link href={`/news-detail/${item.slug}`}>
                  <div className="aspect-video overflow-hidden rounded-t-xl">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        width={600}
                        height={337}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <Image
                          src="/news-article-placeholder.png"
                          alt="Placeholder image"
                          width={600}
                          height={337}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-sm px-3 py-1 rounded-full border-gray-300 text-gray-700">
                        {item.category.name}
                      </Badge>
                      <Badge variant={item.type === 'article' ? 'default' : 'secondary'} className="text-sm px-3 py-1 rounded-full">
                        {item.type === 'article' ? 'Artikel' : 'Berita'}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-xl mb-3 line-clamp-2 text-gray-900 hover:text-blue-700 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-base mb-4 line-clamp-3">
                      {truncateContent(item.content)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>
                          {new Date(item.createdAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <span className="font-medium">By {item.author.username}</span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="text-gray-400 mb-6">
              <Filter className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              Tidak ada konten ditemukan
            </h3>
            <p className="text-gray-500 text-lg mb-6 max-w-md mx-auto">
              {contentItems.length === 0
                ? 'Belum ada artikel atau berita yang dipublikasikan. Silakan buat sample data terlebih dahulu.'
                : 'Coba ubah filter atau kata kunci pencarian Anda untuk menemukan konten.'
              }
            </p>
            {contentItems.length === 0 ? (
              <Button asChild size="lg">
                <Link href="/seed-data">
                  Buat Sample Data
                </Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setSearchTerm('')
                  setCategoryFilter('all')
                  setTypeFilter('all')
                }}
              >
                Reset Filter
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
