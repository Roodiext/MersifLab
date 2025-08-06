import { CommentSection } from "@/components/comments/comment-section"

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // ... existing code ...
  
  return (
    <div>
      {/* Article content */}
      
      {/* Add comment section */}
      <CommentSection 
        articleId={article.id} 
        contentType="article" 
      />
    </div>
  )
}
