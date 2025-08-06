import { CommentsCRUD } from "@/components/admin/comments-crud"

export default function AdminCommentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manajemen Komentar</h1>
        <p className="text-gray-600">Kelola semua komentar dari artikel dan berita</p>
      </div>
      
      <CommentsCRUD />
    </div>
  )
}