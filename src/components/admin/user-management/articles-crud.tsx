"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { deleteArticle, createOrUpdateArticle } from "@/app/admin/articles/actions"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Article {
  id: string
  title: string
  content: string
  image_url: string
  published_date: string
  category: string
}

const initialArticles: Article[] = [
  {
    id: "1",
    title: "Potensi Kerja Sama Berkelanjutan MersifLab",
    content:
      "Surakarta - Kesuksesan workshop 3D printing yang dilaksanakan di SMP Negeri 13 Surakarta melibatkan tim MersifLab sebagai...",
    image_url: "/placeholder.svg?height=100&width=150",
    published_date: "2025-06-25T10:00:00Z",
    category: "Partnership",
  },
  {
    id: "2",
    title: "Hari ke-2: MersifLab Menjadi Narasumber Peningkatan...",
    content:
      "Surakarta - Hari kedua Peningkatan Kompetensi Guru Pemanfaatan Teknologi Printer 3D Dalam Media Pembelajaran Inovatif di SMP...",
    image_url: "/placeholder.svg?height=100&width=150",
    published_date: "2025-06-24T10:00:00Z",
    category: "Event",
  },
  {
    id: "3",
    title: "Hari ke-1: MersifLab Menjadi Narasumber Peningkatan...",
    content:
      "Surakarta - Pada hari pertama Peningkatan Kompetensi Guru Pemanfaatan Teknologi Printer 3D Dalam Media Pembelajaran Inovatif di SMP...",
    image_url: "/placeholder.svg?height=100&width=150",
    published_date: "2025-06-23T10:00:00Z",
    category: "Event",
  },
]

export function ArticlesCrud() {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      const success = await deleteArticle(id)
      if (success) {
        setArticles(articles.filter((article) => article.id !== id))
        toast({
          title: "Success!",
          description: "Article deleted successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete article.",
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (article: Article) => {
    setCurrentArticle(article)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentArticle) return

    const success = await createOrUpdateArticle(currentArticle)
    if (success) {
      setArticles(articles.map((art) => (art.id === currentArticle.id ? currentArticle : art)))
      setIsEditDialogOpen(false)
      setCurrentArticle(null)
      toast({
        title: "Success!",
        description: "Article updated successfully.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to update article.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>{new Date(article.published_date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(article)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(article.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Article</DialogTitle>
            </DialogHeader>
            {currentArticle && (
              <form onSubmit={handleSaveEdit} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="edit-title"
                    value={currentArticle.title}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-content" className="text-right">
                    Content
                  </Label>
                  <Textarea
                    id="edit-content"
                    value={currentArticle.content}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, content: e.target.value })}
                    className="col-span-3"
                    rows={6}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-imageUrl" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="edit-imageUrl"
                    value={currentArticle.image_url}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, image_url: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={currentArticle.category}
                    onValueChange={(value) => setCurrentArticle({ ...currentArticle, category: value })}
                  >
                    <SelectTrigger id="edit-category" className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
export default ArticlesCrud 