"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"

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
  const { language } = useLanguage()
  const [latestContent, setLatestContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetchLatestContent()
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [language]) // Tambahkan language sebagai dependency

  const fetchLatestContent = async () => {
    try {
      const response = await fetch('/api/content')
      const data = await response.json()
      
      // Transform data untuk memastikan konten berita dalam bahasa Indonesia
      const transformedData = data.slice(0, 6).map((item: any) => {
        // Jika judul dalam bahasa Inggris, ganti dengan versi Indonesia
        const indonesianTitles: { [key: string]: string } = {
          "Visit of the Deputy Minister of Higher Education and Science and Technology at Universitas Sebelas Maret": 
            "Kunjungan Wakil Menteri Pendidikan Tinggi dan Ilmu Pengetahuan dan Teknologi di Universitas Sebelas Maret",
          "MersifLab and App Media Inc. Sign MoU at Korea-Indonesia Business Meeting 2025":
            "MersifLab dan App Media Inc. Menandatangani MoU pada Pertemuan Bisnis Korea-Indonesia 2025"
        }

        return {
          ...item,
          title: indonesianTitles[item.title] || item.title,
          content: item.content // Pastikan konten tetap dalam bahasa Indonesia
        }
      })
      
      setLatestContent(transformedData)
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

  // Fungsi helper untuk terjemahan hanya untuk judul section
  const getTranslation = (key: string) => {
    const translations: { [key: string]: { en: string, id: string } } = {
      pageTitle: {
        en: "Latest News & Articles",
        id: "Berita & Artikel Terbaru"
      },
      pageSubtitle: {
        en: "Follow the latest developments and interesting insights from MersifLab",
        id: "Ikuti perkembangan terbaru dan insight menarik dari MersifLab"
      },
      viewAll: {
        en: "View All News & Articles",
        id: "Lihat Semua Berita & Artikel"
      }
    }
    return translations[key][language] || translations[key]['id']
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            {getTranslation('pageTitle')}
          </h2>
          <p 
            style={{ fontFamily: "Inter, sans-serif" }} 
            className="text-xl text-gray-600 max-w-2xl mx-auto mt-6"
          >
            {getTranslation('pageSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestContent.map((item, index) => (
            <Link 
              key={`${item.type}-${item.id}`}
              href={`/news-detail/${item.slug}`}
              className="group"
            >
              <div 
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.02] relative ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  animationDelay: `${index * 150}ms`
                }}
              >
                {item.thumbnail && (
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                )}
                
                <div className="p-6 relative">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge 
                      variant="outline" 
                      className="text-xs transition-all duration-300 group-hover:border-blue-500 group-hover:text-blue-700 group-hover:bg-blue-50" 
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item.category.name}
                    </Badge>
                    <Badge 
                      variant={item.type === 'article' ? 'default' : 'secondary'}
                      className="text-xs transition-all duration-300 group-hover:scale-105"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item.type === 'article' ? 'Artikel' : 'Berita'}
                    </Badge>
                  </div>
                  
                  <h3 
                    style={{ fontFamily: "Poppins, sans-serif" }} 
                    className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2"
                  >
                    {item.title}
                  </h3>
                  
                  <p 
                    style={{ fontFamily: "Inter, sans-serif" }} 
                    className="text-gray-600 text-sm mb-4 line-clamp-3 transition-colors duration-300 group-hover:text-gray-700"
                  >
                    {truncateContent(item.content)}
                  </p>
                  
                  <div style={{ fontFamily: "Inter, sans-serif" }} className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                      <Calendar className="h-3 w-3 mr-1 group-hover:text-blue-500 transition-colors duration-300" />
                      {new Date(item.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={`text-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <Button 
            asChild 
            size="lg"
            className="group hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Link href="/news" style={{ fontFamily: "Poppins, sans-serif" }}>
              <span>{getTranslation('viewAll')}</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}