  "use client"

  import { useState, useEffect } from 'react'
  import Link from 'next/link'
  import { Badge } from '@/components/ui/badge'
  import { Button } from '@/components/ui/button'
  import { Calendar, ArrowRight } from 'lucide-react'

  interface ContentItem {
    id: number
    title: string
    slug: string
    content: string
    thumbnail?: string
    category: { name: string }
    createdAt: string
    type: 'article' | 'news'
  }

  export function NewsBlogSection() {
    const [latestContent, setLatestContent] = useState<ContentItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      fetchLatestContent()
    }, [])

    const fetchLatestContent = async () => {
      try {
        const response = await fetch('/api/content')
        const data = await response.json()
        setLatestContent(data.slice(0, 6)) // Get latest 6 items
      } catch (error) {
        console.error('Failed to fetch content')
      } finally {
        setLoading(false)
      }
    }

    const truncateContent = (content: string, maxLength: number = 120) => {
      const textContent = content.replace(/<[^>]*>/g, '')
      return textContent.length > maxLength 
        ? textContent.substring(0, maxLength) + '...'
        : textContent
    }

    if (loading) {
      return (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">Loading...</div>
          </div>
        </section>
      )
    }

    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              Berita & Artikel Terbaru
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif" }} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ikuti perkembangan terbaru dan insight menarik dari MersifLab
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {latestContent.map((item) => (
              <Link 
                key={`${item.type}-${item.id}`}
                href={`/news-detail/${item.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {item.thumbnail && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {item.category.name}
                      </Badge>
                      <Badge 
                        variant={item.type === 'article' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {item.type === 'article' ? 'Artikel' : 'Berita'}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {truncateContent(item.content)}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/news" style={{ fontFamily: "Poppins, sans-serif" }}>
                Lihat Semua Berita & Artikel
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }
