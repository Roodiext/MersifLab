"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Send, Edit, Trash2, Reply, MoreHorizontal, Crown, User, UserX, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Comment {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  status: string
  parentId?: number | null
  user?: {
    id: number
    username: string
    email: string
    avatar?: string
    role?: string
  }
  replies?: Comment[]
}

interface CommentSectionProps {
  articleId?: number
  newsId?: number
  contentType: 'article' | 'news'
}

export function CommentSection({ articleId, newsId, contentType }: CommentSectionProps) {
  const { data: session, update } = useSession()
  const { toast } = useToast()

  // Force refresh session to get latest avatar
  useEffect(() => {
    if (session) {
      update()
    }
  }, [])
  
  // ADD DEBUG LOGS
  console.log('CommentSection props:', { articleId, newsId, contentType })
  console.log('Session:', session)
  
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [showComments, setShowComments] = useState(true)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [editingComment, setEditingComment] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null)

  useEffect(() => {
    fetchComments()
  }, [articleId, newsId])

  const fetchComments = async () => {
    try {
      const params = new URLSearchParams()
      if (articleId) params.append('articleId', articleId.toString())
      if (newsId) params.append('newsId', newsId.toString())
      params.append('status', 'approved')
      
      const response = await fetch(`/api/comments?${params}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const handleSubmitComment = async () => {
    if (!session) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk menambahkan komentar",
        variant: "destructive"
      })
      return
    }

    if (!newComment.trim()) {
      toast({
        title: "Komentar Kosong", 
        description: "Silakan tulis komentar terlebih dahulu",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      console.log('=== SUBMITTING COMMENT ===')
      console.log('Session user:', session.user)
      console.log('Article ID:', articleId)
      console.log('News ID:', newsId)
      console.log('Content:', newComment)

      const requestBody = {
        content: newComment,
        articleId,
        newsId
      }
      console.log('Request body:', requestBody)

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))
      
      // Get response as text first to see raw response
      const responseText = await response.text()
      console.log('Raw response text:', responseText)
      
      let responseData
      try {
        responseData = responseText ? JSON.parse(responseText) : {}
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError)
        console.error('Response was:', responseText)
        throw new Error(`Invalid response: ${responseText}`)
      }
      
      console.log('Parsed response data:', responseData)

      if (response.ok) {
        setNewComment("")
        fetchComments()
        toast({
          title: "Berhasil",
          description: "Komentar berhasil ditambahkan"
        })
      } else {
        console.error('API Error Response:', responseData)
        throw new Error(responseData.error || responseData.details || `HTTP ${response.status}`)
      }
    } catch (error) {
      console.error('=== COMMENT SUBMISSION ERROR ===')
      console.error('Error:', error)
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menambahkan komentar",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReply = async (parentId: number) => {
    if (!session) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk membalas komentar",
        variant: "destructive"
      })
      return
    }

    if (!replyContent.trim()) {
      toast({
        title: "Balasan Kosong",
        description: "Silakan tulis balasan terlebih dahulu",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      console.log('=== SUBMITTING REPLY ===')
      console.log('Parent ID:', parentId)
      console.log('Reply content:', replyContent)
      console.log('Article ID:', articleId)
      console.log('News ID:', newsId)

      const requestBody = {
        content: replyContent,
        articleId,
        newsId,
        parentId
      }
      console.log('Reply request body:', requestBody)

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      const responseData = await response.json()
      console.log('Reply response:', responseData)

      if (response.ok) {
        setReplyContent("")
        setReplyingTo(null)
        fetchComments() // Refresh comments to show new reply
        toast({
          title: "Berhasil",
          description: "Balasan berhasil ditambahkan"
        })
      } else {
        console.error('Reply API Error Response:', responseData)
        throw new Error(responseData.error || responseData.details || `HTTP ${response.status}`)
      }
    } catch (error) {
      console.error('=== REPLY SUBMISSION ERROR ===')
      console.error('Error:', error)
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menambahkan balasan",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEditComment = async (commentId: number) => {
    if (!editContent.trim()) {
      toast({
        title: "Konten Kosong",
        description: "Silakan tulis konten terlebih dahulu",
        variant: "destructive"
      })
      return
    }

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent })
      })

      if (response.ok) {
        setEditingComment(null)
        setEditContent("")
        fetchComments()
        toast({
          title: "Berhasil",
          description: "Komentar berhasil diperbarui"
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update comment')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal memperbarui komentar",
        variant: "destructive"
      })
    }
  }

  const handleDeleteComment = async () => {
    if (!commentToDelete) return

    try {
      const response = await fetch(`/api/comments/${commentToDelete}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchComments()
        toast({
          title: "Berhasil",
          description: "Komentar berhasil dihapus"
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete comment')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menghapus komentar",
        variant: "destructive"
      })
    } finally {
      setDeleteDialogOpen(false)
      setCommentToDelete(null)
    }
  }

  const getDisplayName = (comment: Comment) => {
    return comment.user?.username || 'Anonymous'
  }

  const getAvatarFallback = (comment: Comment) => {
    const name = getDisplayName(comment)
    return name.substring(0, 2).toUpperCase()
  }

  const getAvatarSrc = (comment: Comment) => {
    return comment.user?.avatar || undefined
  }

  const canEditDelete = (comment: Comment) => {
    if (session?.user?.role === 'admin') return true
    if (session?.user?.id && comment.user?.id === parseInt(session.user.id)) return true
    return false
  }

  const getUserBadge = (comment: Comment) => {
    if (comment.user?.role === 'admin') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <Crown className="w-3 h-3 mr-1" />
          Admin
        </span>
      )
    }
    if (comment.user) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <User className="w-3 h-3 mr-1" />
          Member
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        <UserX className="w-3 h-3 mr-1" />
        Guest
      </span>
    )
  }

  // Add this function to count total comments including replies
  const countTotalComments = (comments: Comment[]): number => {
    let total = comments.length
    comments.forEach(comment => {
      if (comment.replies) {
        total += countTotalComments(comment.replies)
      }
    })
    return total
  }

  // Update the totalComments calculation
  const totalComments = countTotalComments(comments)

  // Get current user avatar from session
  const getCurrentUserAvatar = () => {
    return session?.user?.avatar || undefined
  }

  return (
    <div className="mt-12 pt-8 border-t border-slate-200">
      {/* ADD DEBUG INFO */}
      <div className="mb-4 p-4 bg-yellow-100 rounded">
        <p>Debug Info:</p>
        <p>Article ID: {articleId}</p>
        <p>News ID: {newsId}</p>
        <p>Content Type: {contentType}</p>
        <p>Session: {session ? 'Logged in' : 'Not logged in'}</p>
        <p>User Role: {session?.user?.role}</p>
        <p>Replying To: {replyingTo}</p>
        <p>Total Comments: {totalComments}</p>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Komentar ({totalComments})
        </h3>
        <Button
          variant="ghost"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2"
        >
          {showComments ? "Sembunyikan" : "Tampilkan"} Komentar
        </Button>
      </div>

      {showComments && (
        <>
          {/* Comment Form */}
          {session ? (
            <Card className="mb-8 border-2 border-dashed border-slate-200 hover:border-slate-300 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 ring-2 ring-slate-200">
                    <AvatarImage src={getCurrentUserAvatar()} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {session?.user?.name?.substring(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Textarea
                      placeholder="Tulis komentar Anda..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[100px] border-slate-300 focus:border-blue-500 resize-none"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-slate-500">
                        Berikan komentar yang konstruktif dan sopan
                      </p>
                      <Button
                        onClick={handleSubmitComment}
                        disabled={loading || !newComment.trim()}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Send className="w-4 h-4" />
                        {loading ? "Mengirim..." : "Kirim"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-8 border-2 border-dashed border-orange-200 bg-orange-50">
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">
                      Login Diperlukan
                    </h3>
                    <p className="text-orange-700 mb-4">
                      Silakan login terlebih dahulu untuk menambahkan komentar
                    </p>
                    <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
                      <Link href="/login">Login Sekarang</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 ring-2 ring-slate-200">
                      <AvatarImage src={getAvatarSrc(comment)} />
                      <AvatarFallback className="bg-gradient-to-br from-slate-500 to-slate-600 text-white">
                        {getAvatarFallback(comment)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-slate-900">
                              {getDisplayName(comment)}
                            </p>
                            {getUserBadge(comment)}
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Clock className="w-3 h-3" />
                            <span>
                              {formatDistanceToNow(new Date(comment.createdAt), { 
                                addSuffix: true, 
                                locale: id 
                              })}
                            </span>
                            {comment.updatedAt !== comment.createdAt && (
                              <span className="text-xs text-slate-400">(diedit)</span>
                            )}
                          </div>
                        </div>
                        
                        {canEditDelete(comment) && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingComment(comment.id)
                                  setEditContent(comment.content)
                                }}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCommentToDelete(comment.id)
                                  setDeleteDialogOpen(true)
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>

                      {editingComment === comment.id ? (
                        <div className="space-y-3">
                          <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="min-h-[80px] border-slate-300 focus:border-blue-500"
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleEditComment(comment.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Simpan
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingComment(null)
                                setEditContent("")
                              }}
                            >
                              Batal
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="prose prose-sm max-w-none mb-4">
                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                              {comment.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setReplyingTo(comment.id)}
                              className="text-slate-500 hover:text-slate-700 h-8"
                            >
                              <Reply className="w-4 h-4 mr-2" />
                              Balas
                            </Button>
                          </div>
                        </>
                      )}

                      {/* Reply Form */}
                      {replyingTo === comment.id && (
                        <div className="mt-4 pl-4 border-l-2 border-blue-200">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={getCurrentUserAvatar()} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                                {session?.user?.name?.substring(0, 2).toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-3">
                              <Textarea
                                placeholder="Tulis balasan..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="min-h-[80px] border-slate-300 focus:border-blue-500"
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleReply(comment.id)}
                                  disabled={!replyContent.trim() || loading}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  <Send className="w-3 h-3 mr-2" />
                                  {loading ? "Mengirim..." : "Balas"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setReplyingTo(null)
                                    setReplyContent("")
                                  }}
                                >
                                  Batal
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-slate-200 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-3">
                              <Avatar className="w-8 h-8 ring-1 ring-slate-200">
                                <AvatarImage src={getAvatarSrc(reply)} />
                                <AvatarFallback className="bg-gradient-to-br from-slate-400 to-slate-500 text-white text-xs">
                                  {getAvatarFallback(reply)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium text-slate-900 text-sm">
                                      {getDisplayName(reply)}
                                    </p>
                                    {getUserBadge(reply)}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                                      <Clock className="w-3 h-3" />
                                      <span>
                                        {formatDistanceToNow(new Date(reply.createdAt), { 
                                          addSuffix: true, 
                                          locale: id 
                                        })}
                                      </span>
                                    </div>
                                    {canEditDelete(reply) && (
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                            <MoreHorizontal className="h-3 w-3" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem
                                            onClick={() => {
                                              setEditingComment(reply.id)
                                              setEditContent(reply.content)
                                            }}
                                          >
                                            <Edit className="w-3 h-3 mr-2" />
                                            Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={() => {
                                              setCommentToDelete(reply.id)
                                              setDeleteDialogOpen(true)
                                            }}
                                            className="text-red-600"
                                          >
                                            <Trash2 className="w-3 h-3 mr-2" />
                                            Hapus
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    )}
                                  </div>
                                </div>

                                {editingComment === reply.id ? (
                                  <div className="space-y-2">
                                    <Textarea
                                      value={editContent}
                                      onChange={(e) => setEditContent(e.target.value)}
                                      className="min-h-[60px] border-slate-300 focus:border-blue-500 text-sm"
                                    />
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => handleEditComment(reply.id)}
                                        className="bg-green-600 hover:bg-green-700 text-xs h-7"
                                      >
                                        Simpan
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setEditingComment(null)
                                          setEditContent("")
                                        }}
                                        className="text-xs h-7"
                                      >
                                        Batal
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                                    {reply.content}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Komentar</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus komentar ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteComment}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}












