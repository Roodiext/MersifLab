"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

interface MersifNumber {
  id: number
  label: string
  value: string
  icon: string
  color: string
  sortOrder: number
}

const iconOptions = [
  { value: "/img/mersif-number-img/student-graduate.svg", label: "Siswa" },
  { value: "/img/mersif-number-img/teacher-class.svg", label: "Guru" },
  { value: "/img/mersif-number-img/school-icon.svg", label: "Sekolah" },
  { value: "/img/mersif-number-img/earth-icon.svg", label: "Dunia" },
]

const colorOptions = [
  { value: "text-teal-600", label: "Teal" },
  { value: "text-blue-600", label: "Blue" },
  { value: "text-orange-500", label: "Orange" },
  { value: "text-red-500", label: "Red" },
  { value: "text-green-600", label: "Green" },
  { value: "text-purple-600", label: "Purple" },
]

export function MersifNumbersCrud() {
  const [mersifNumbers, setMersifNumbers] = useState<MersifNumber[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    label: "",
    value: "",
    icon: iconOptions[0].value,
    color: colorOptions[0].value,
    sortOrder: 0
  })

  useEffect(() => {
    fetchMersifNumbers()
  }, [])

  const fetchMersifNumbers = async () => {
    try {
      const response = await fetch('/api/mersif-numbers')
      if (response.ok) {
        const data = await response.json()
        setMersifNumbers(data)
      } else {
        toast({
          title: "Error",
          description: "Gagal memuat data Mersif Numbers",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error fetching mersif numbers:', error)
      toast({
        title: "Error",
        description: "Gagal memuat data Mersif Numbers",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (mersifNumber: MersifNumber) => {
    setEditingId(mersifNumber.id)
    setFormData({
      label: mersifNumber.label,
      value: mersifNumber.value,
      icon: mersifNumber.icon,
      color: mersifNumber.color,
      sortOrder: mersifNumber.sortOrder
    })
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingId(null)
    setFormData({
      label: "",
      value: "",
      icon: iconOptions[0].value,
      color: colorOptions[0].value,
      sortOrder: mersifNumbers.length
    })
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!formData.label.trim() || !formData.value.trim()) {
      toast({
        title: "Error",
        description: "Label dan Value harus diisi",
        variant: "destructive",
      })
      return
    }

    try {
      const url = editingId 
        ? `/api/mersif-numbers/${editingId}`
        : '/api/mersif-numbers'
      
      const method = editingId ? 'PUT' : 'POST'
      
      console.log('Sending request:', { url, method, data: formData })
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Response data:', result)

      if (response.ok) {
        await fetchMersifNumbers()
        setIsDialogOpen(false)
        toast({
          title: "Success!",
          description: `Mersif Number berhasil ${editingId ? 'diperbarui' : 'ditambahkan'}`,
        })
      } else {
        console.error('API Error:', result)
        toast({
          title: "Error",
          description: result.error || result.details || 'Failed to save mersif number',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error saving mersif number:', error)
      toast({
        title: "Error",
        description: `Gagal ${editingId ? 'memperbarui' : 'menambahkan'} Mersif Number: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return

    try {
      const response = await fetch(`/api/mersif-numbers/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchMersifNumbers()
        toast({
          title: "Success!",
          description: "Mersif Number berhasil dihapus",
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      console.error('Error deleting mersif number:', error)
      toast({
        title: "Error",
        description: "Gagal menghapus Mersif Number",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Kelola Mersif Numbers</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Edit' : 'Tambah'} Mersif Number
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="label">Label *</Label>
                  <Input
                    id="label"
                    value={formData.label}
                    onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                    placeholder="Contoh: Siswa Tercapai"
                  />
                </div>
                
                <div>
                  <Label htmlFor="value">Value *</Label>
                  <Input
                    id="value"
                    value={formData.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="Contoh: 15,000+"
                  />
                </div>

                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="color">Warna</Label>
                  <Select
                    value={formData.color}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full bg-current ${option.value}`}></div>
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sortOrder">Urutan</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                    min="0"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Simpan
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Batal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {mersifNumbers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Belum ada data Mersif Numbers</p>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Data Pertama
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Warna</TableHead>
                <TableHead>Urutan</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mersifNumbers.map((num) => (
                <TableRow key={num.id}>
                  <TableCell className="font-medium">{num.label}</TableCell>
                  <TableCell>{num.value}</TableCell>
                  <TableCell>
                    <img src={num.icon} alt="icon" className="w-6 h-6" />
                  </TableCell>
                  <TableCell>
                    <div className={`w-4 h-4 rounded-full bg-current ${num.color}`}></div>
                  </TableCell>
                  <TableCell>{num.sortOrder}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(num)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(num.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
