"use client"

import { useState, useEffect } from "react"
import { CommentSection } from "@/components/comments/comment-section"

export default function NewsDetail({ newsId }: { newsId: number }) {
  const [newsData, setNewsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNewsData()
  }, [newsId])

  const fetchNewsData = async () => {
    try {
      const response = await fetch(`/api/news/${newsId}`)
      if (response.ok) {
        const data = await response.json()
        setNewsData(data)
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!newsData) {
    return <div className="container mx-auto px-4 py-8">News not found</div>
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Existing news content */}
      <article className="prose prose-lg prose-slate max-w-none">
        <h1>{newsData.title}</h1>
        {newsData.thumbnail && (
          <img src={newsData.thumbnail} alt={newsData.title} />
        )}
        <div>{newsData.content}</div>
      </article>

      {/* Comment Section */}
      <CommentSection 
        newsId={newsId} 
        contentType="news"
      />
    </main>
  )
}
