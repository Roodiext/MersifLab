"use client"

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Search, Filter } from 'lucide-react'
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

  const truncateContent = (content: string, maxLength: number = 100) => {
    const textContent = content.replace(/<[^>]*>/g, '')
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + '...'
      : textContent
  }

  const featuredArticle = useMemo(() => contentItems.length > 0 ? contentItems[0] : null, [contentItems]);

  const filteredItems = useMemo(() => {
    const itemsToFilter = featuredArticle ? contentItems.slice(1) : contentItems;
    return itemsToFilter.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || item.category.name === categoryFilter
      const matchesType = typeFilter === 'all' || item.type === typeFilter
      return matchesSearch && matchesCategory && matchesType
    });
  }, [contentItems, featuredArticle, searchTerm, categoryFilter, typeFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-base text-gray-700 font-medium">Loading content...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto shadow-lg">
              <h3 className="text-red-800 font-bold text-lg mb-2">Error Loading Content</h3>
              <p className="text-red-600 text-sm mb-4">{error}</p>
              <Button
                onClick={() => {
                  setError(null)
                  setLoading(true)
                  fetchContent()
                }}
                className="w-full"
                variant="destructive"
                size="sm"
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
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        {/* Header - Compact */}
        <div className="text-center mb-8">
          <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Berita & Artikel
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif' }}  className="text-sm md:text-base text-gray-600">
            Informasi terkini dan analisis mendalam dari MersifLab.
          </p>
        </div>

        {/* Filters - Compact */}
        <div className="mb-6 p-3 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
            style={{ fontFamily: 'Inter, sans-serif' }} 
              placeholder="Cari berita atau artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm h-9"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger style={{ fontFamily: 'Inter, sans-serif' }} className="w-full md:w-36 h-9">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Semua Tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem style={{ fontFamily: 'Inter, sans-serif' }} value="all">Semua Tipe</SelectItem>
              <SelectItem style={{ fontFamily: 'Inter, sans-serif' }} value="article">Artikel</SelectItem>
              <SelectItem style={{ fontFamily: 'Inter, sans-serif' }} value="news">Berita</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger style={{ fontFamily: 'Inter, sans-serif' }} className="w-full md:w-36 h-9">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" style={{ fontFamily: 'Inter, sans-serif' }}>Semua Kategori</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Article - Compact */}
        {featuredArticle && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-blue-600 pb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Berita Utama</h2>
            <Card className="rounded-lg shadow-md overflow-hidden">
              <Link href={`/news-detail/${featuredArticle.slug}`} className="flex flex-col md:flex-row">
                <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                  {featuredArticle.thumbnail ? (
                    <Image
                      src={featuredArticle.thumbnail || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Image
                        src="/news-article-placeholder.png"
                        alt="Placeholder image"
                        width={400}
                        height={225}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <CardContent className="md:w-3/5 p-4">
                  <div style={{ fontFamily: 'Inter, sans-serif' }} className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      {featuredArticle.category.name}
                    </Badge>
                    <Badge variant={featuredArticle.type === 'article' ? 'default' : 'secondary'} className="text-xs px-2 py-1">
                      {featuredArticle.type === 'article' ? 'Artikel' : 'Berita'}
                    </Badge>
                  </div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif' }} className="font-bold text-lg md:text-xl mb-2 text-gray-900 hover:text-blue-700 transition-colors line-clamp-2">
                    {featuredArticle.title}
                  </h3>
                  <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-gray-700 text-sm mb-3 line-clamp-3">
                    {truncateContent(featuredArticle.content, 180)}
                  </p>
                  <div style={{ fontFamily: 'Inter, sans-serif' }} className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(featuredArticle.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <span className="font-medium">{featuredArticle.author.username}</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        )}

        {/* Main Content Grid - More items, smaller cards */}
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontFamily: 'Poppins, sans-serif' }} className="text-lg font-bold text-gray-900">Konten Lainnya</h2>
          <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm text-gray-600">
            {filteredItems.length} dari {contentItems.length - (featuredArticle ? 1 : 0)} konten
          </p>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredItems.map((item) => (
              <Card key={`${item.type}-${item.id}`} className="rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <Link href={`/news-detail/${item.slug}`}>
                  <div className="aspect-video overflow-hidden">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        width={300}
                        height={169}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Image
                          src="/news-article-placeholder.png"
                          alt="Placeholder image"
                          width={300}
                          height={169}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <div style={{ fontFamily: 'Inter, sans-serif' }} className="flex flex-wrap items-center gap-1 mb-2">
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5 text-xs">
                        {item.category.name}
                      </Badge>
                      <Badge variant={item.type === 'article' ? 'default' : 'secondary'} className="text-xs px-1.5 py-0.5">
                        {item.type === 'article' ? 'Artikel' : 'Berita'}
                      </Badge>
                    </div>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif' }} className="font-semibold text-sm mb-2 line-clamp-2 text-gray-900 hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-gray-600 text-xs mb-2 line-clamp-2">
                      {truncateContent(item.content, 80)}
                    </p>
                    <div style={{ fontFamily: 'Inter, sans-serif' }} className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(item.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                      <span className="font-medium text-xs truncate max-w-16">{item.author.username}</span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              Tidak ada konten ditemukan
            </h3>
            <p className="text-gray-500 text-sm mb-4 max-w-md mx-auto">
              {contentItems.length === 0
                ? 'Belum ada artikel atau berita yang dipublikasikan.'
                : 'Coba ubah filter atau kata kunci pencarian Anda.'
              }
            </p>
            {contentItems.length === 0 ? (
              <Button asChild size="sm">
                <Link href="/seed-data">
                  Buat Sample Data
                </Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
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