import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import { CommentSection } from "@/components/comments/comment-section"

const prisma = new PrismaClient()

async function getNewsBySlug(slug: string) {
  const news = await prisma.news.findUnique({
    where: { slug, status: 'published' },
    include: {
      category: true,
      author: true
    }
  })
  
  return news
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const news = await getNewsBySlug(slug)
  
  if (!news) {
    notFound()
  }
  
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back to Admin Button */}
        <Link 
          href="/admin/articles-news"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Kembali ke Admin Panel</span>
        </Link>
        
        {/* Category Badge */}
        {news.category && (
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {news.category.name}
            </span>
          </div>
        )}
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {news.title}
        </h1>
        
        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          {news.author && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{news.author.name || news.author.username}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{new Date(news.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        
        {/* Thumbnail */}
        {news.thumbnail && (
          <div className="mb-6">
            <img 
              src={news.thumbnail} 
              alt={news.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        )}
        
        {/* Content */}
        <article className="prose prose-lg prose-slate max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </article>
        
        {/* Comment Section */}
        <CommentSection 
          newsId={news.id} 
          contentType="news" 
        />
      </div>
    </main>
  )
}