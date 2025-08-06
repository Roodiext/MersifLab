"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface Category {
  id: number
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      } else {
        toast.error('Gagal memuat kategori')
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Gagal memuat kategori')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Nama kategori harus diisi')
      return
    }

    try {
      const url = editingCategory 
        ? `/api/categories/${editingCategory.id}`
        : '/api/categories'
      
      const method = editingCategory ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingCategory ? 'Kategori berhasil diupdate' : 'Kategori berhasil ditambahkan')
        setIsDialogOpen(false)
        setEditingCategory(null)
        setFormData({ name: '' })
        fetchCategories()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Gagal menyimpan kategori')
      }
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error('Gagal menyimpan kategori')
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (category: Category) => {
    if (!confirm(`Yakin ingin menghapus kategori "${category.name}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/categories/${category.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Kategori berhasil dihapus')
        fetchCategories()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Gagal menghapus kategori')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Gagal menghapus kategori')
    }
  }

  const handleAdd = () => {
    setEditingCategory(null)
    setFormData({ name: '' })
    setIsDialogOpen(true)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Kelola Kategori</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAdd} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Kategori
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Kategori *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Contoh: Teknologi"
                      required
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingCategory ? 'Update' : 'Tambah'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Belum ada kategori</p>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kategori Pertama
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-gray-500">{category.slug}</TableCell>
                    <TableCell>
                      {new Date(category.createdAt).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(category)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(category)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
