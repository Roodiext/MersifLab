"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Trash2, CheckCircle, XCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

interface Comment {
  id: number
  content: string
  status: string
  createdAt: string
  user?: {
    username: string
    email: string
  }
  guestName?: string
  guestEmail?: string
  article?: {
    title: string
  }
  news?: {
    title: string
  }
}

export function CommentsCRUD() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/admin/comments')
      if (response.ok) {
        const data = await response.json()
        setComments(data)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateCommentStatus = async (commentId: number, status: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        fetchComments()
        toast({
          title: "Berhasil",
          description: `Komentar berhasil ${status === 'approved' ? 'disetujui' : 'ditolak'}`
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengupdate status komentar",
        variant: "destructive"
      })
    }
  }

  const deleteComment = async (commentId: number) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchComments()
        toast({
          title: "Berhasil",
          description: "Komentar berhasil dihapus"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus komentar",
        variant: "destructive"
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Disetujui</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Ditolak</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Komentar</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pengguna</TableHead>
              <TableHead>Konten</TableHead>
              <TableHead>Artikel/Berita</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">
                      {comment.user?.username || comment.guestName || 'Anonymous'}
                    </p>
                    <p className="text-sm text-slate-500">
                      {comment.user?.email || comment.guestEmail}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="max-w-xs truncate">
                    {comment.content}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-sm">
                    {comment.article?.title || comment.news?.title}
                  </p>
                </TableCell>
                <TableCell>
                  {getStatusBadge(comment.status)}
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(comment.createdAt), { 
                    addSuffix: true, 
                    locale: id 
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {comment.status !== 'approved' && (
                        <DropdownMenuItem
                          onClick={() => updateCommentStatus(comment.id, 'approved')}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Setujui
                        </DropdownMenuItem>
                      )}
                      {comment.status !== 'rejected' && (
                        <DropdownMenuItem
                          onClick={() => updateCommentStatus(comment.id, 'rejected')}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Tolak
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => deleteComment(comment.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


