import { CommentSection } from "@/components/comments/comment-section"

export default function NewsPage({ params }: { params: { slug: string } }) {
  // ... existing code to get news data ...
  
  return (
    <div>
      {/* News content */}
      <article>
        <h1>{news.title}</h1>
        <div>{news.content}</div>
      </article>
      
      {/* Comment Section - pastikan ini ada */}
      <CommentSection 
        newsId={news.id} 
        contentType="news" 
      />
    </div>
  )
}