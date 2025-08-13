import { notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { CommentSection } from "@/components/comments/comment-section"

const prisma = new PrismaClient()

interface PageProps {
  params: { slug: string }
}

async function getContentBySlug(slug: string) {
  // Try to find in articles first
  const article = await prisma.article.findUnique({
    where: { slug, status: 'published' },
    include: {
      category: true,
      author: true
    }
  })

  if (article) {
    return { ...article, type: 'article' }
  }

  // Try to find in news
  const news = await prisma.news.findUnique({
    where: { slug, status: 'published' },
    include: {
      category: true,
      author: true
    }
  })

  if (news) {
    return { ...news, type: 'news' }
  }

  return null
}

async function getRelatedContent(categoryId: number, currentId: number, currentType: string) {
  const [articles, news] = await Promise.all([
    prisma.article.findMany({
      where: {
        categoryId,
        status: 'published',
        NOT: currentType === 'article' ? { id: currentId } : undefined
      },
      include: { category: true },
      take: 3,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.news.findMany({
      where: {
        categoryId,
        status: 'published',
        NOT: currentType === 'news' ? { id: currentId } : undefined
      },
      include: { category: true },
      take: 3,
      orderBy: { createdAt: 'desc' }
    })
  ])
  const combined = [
    ...articles.map(item => ({ ...item, type: 'article' })),
    ...news.map(item => ({ ...item, type: 'news' }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return combined.slice(0, 3)
}

export default async function NewsDetailPage({ params }: PageProps) {
  const content = await getContentBySlug(params.slug)

  if (!content) {
    notFound()
  }

  const relatedContent = await getRelatedContent(content.categoryId, content.id, content.type)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl lg:max-w-5xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <Link style={{ fontFamily: "Poppins, sans-serif"}} href="/news" className="flex items-center gap-2 text-sm font-medium">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Berita & Artikel
            </Link>
          </Button>
        </div>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <Badge style={{ fontFamily: "Inter, sans-serif"}} variant="outline" className="bg-white text-gray-700 border-gray-300 px-3 py-1 text-xs font-medium rounded-full">
              {content.category.name}
            </Badge>
            <Badge style={{ fontFamily: "Inter, sans-serif"}} variant={content.type === 'article' ? 'default' : 'secondary'} className="bg-blue-700 text-white px-3 py-1 text-xs font-medium rounded-full">
              {content.type === 'article' ? 'Artikel' : 'Berita'}
            </Badge>
          </div>

          <h1 style={{ fontFamily: "Poppins, sans-serif"}} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {content.title}
          </h1>

          <div style={{ fontFamily: "Inter, sans-serif"}} className="flex flex-wrap items-center gap-x-8 gap-y-2 text-gray-600 text-sm mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="font-medium">
                {new Date(content.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{content.author.username}</span>
            </div>
          </div>

          {/* Share Button */}
          <div style={{ fontFamily: "Poppins, sans-serif"}} className="flex gap-3">
            <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors duration-200 px-4 py-2 rounded-md">
              <Share2 className="h-4 w-4 mr-2" />
              Bagikan
            </Button>
          </div>
        </header>

        {/* Thumbnail */}
        {content.thumbnail && (
          <div className="mb-12">
            <img
              src={content.thumbnail || "/placeholder.svg?height=500&width=1000&query=news article thumbnail"}
              alt={content.title}
              className="w-full h-96 md:h-[500px] object-cover rounded-xl shadow-xl"
            />
          </div>
        )}

        {/* Content */}
        <article style={{ fontFamily: "Inter, sans-serif"}} className="prose prose-lg max-w-none mb-16 text-gray-800 leading-relaxed prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-700 prose-a:hover:underline">
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </article>

        {/* Additional Images */}
        {content.images && Array.isArray(content.images) && content.images.length > 0 && (
          <section className="mb-16 border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Galeri Foto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image || `/placeholder.svg?height=200&width=300&query=gallery image ${index + 1}`}
                  alt={`Gambar ${index + 1} dari ${content.title}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                />
              ))}
            </div>
          </section>
        )}

        {/* Related Content */}
        {relatedContent.length > 0 && (
          <section  className="border-t border-gray-200 pt-16">
            <h3 style={{ fontFamily: "Poppins, sans-serif"}} className="text-3xl font-bold text-gray-900 mb-8">Konten Terkait</h3>
            <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedContent.map((item) => (
                <Link
                  key={`${item.type}-${item.id}`}
                  href={`/news-detail/${item.slug}`}
                  className="group block"
                >
                  <div  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail || "/placeholder.svg?height=160&width=300&query=related content thumbnail"}
                        alt={item.title}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-medium">
                        <span>Tidak Ada Gambar</span>
                      </div>
                    )}
                    <div style={{ fontFamily: "Inter, sans-serif"}} className="p-5">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200 px-2 py-0.5 rounded-full">
                          {item.category.name}
                        </Badge>
                        <Badge
                          variant={item.type === 'article' ? 'default' : 'secondary'}
                          className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full"
                        >
                          {item.type === 'article' ? 'Artikel' : 'Berita'}
                        </Badge>
                      </div>
                      <h4 style={{ fontFamily: "Poppins, sans-serif"}} className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h4>
                      <p style={{ fontFamily: "Inter, sans-serif"}} className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Comment Section */}
        <CommentSection
        style={{ fontFamily: "Inter, sans-serif"}} 
          newsId={content.type === 'news' ? content.id : undefined}
          articleId={content.type === 'article' ? content.id : undefined}
          contentType={content.type as 'article' | 'news'}
        />
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const content = await getContentBySlug(params.slug)

  if (!content) {
    return {
      title: 'Konten Tidak Ditemukan'
    }
  }

  return {
    title: `${content.title} | MersifLab`,
    description: content.content.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: content.title,
      description: content.content.replace(/<[^>]*>/g, '').substring(0, 160),
      images: content.thumbnail ? [content.thumbnail] : [],
    }
  }
}


