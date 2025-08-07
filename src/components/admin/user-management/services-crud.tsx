"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, MoreHorizontal, Upload, X } from 'lucide-react'
import Image from "next/image"
import { useFormStatus } from "react-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { validateFile } from "@/lib/upload"
import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "@/app/admin/services/actions"

interface Service {
  id: number
  name: string
  description: string
  image: string
  link: string
  sortOrder: number
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? "Processing..." : children}
    </Button>
  )
}

export default function ServicesCRUD() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  
  // Image upload states
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [editImageFile, setEditImageFile] = useState<File | null>(null)
  const [editImagePreview, setEditImagePreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  
  const { toast } = useToast()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    try {
      const result = await getServices()
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        setServices(result.services || [])
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!validateFile(file)) {
        toast({
          title: "Error",
          description: "File tidak valid. Gunakan JPEG, PNG, atau WebP dengan ukuran maksimal 5MB",
          variant: "destructive",
        })
        return
      }
      
      if (isEdit) {
        setEditImageFile(file)
        const reader = new FileReader()
        reader.onload = () => setEditImagePreview(reader.result as string)
        reader.readAsDataURL(file)
      } else {
        setImageFile(file)
        const reader = new FileReader()
        reader.onload = () => setImagePreview(reader.result as string)
        reader.readAsDataURL(file)
      }
    }
  }

  const removeImage = (isEdit = false) => {
    if (isEdit) {
      setEditImageFile(null)
      setEditImagePreview('')
    } else {
      setImageFile(null)
      setImagePreview('')
    }
  }

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    const result = await response.json()
    if (!result.success) throw new Error(result.error || 'Upload failed')
    return result.filePath
  }

  const handleAddService = async (formData: FormData) => {
    setFormError(null)
    setUploading(true)
    
    try {
      let imagePath = ''
      
      // Upload image if exists
      if (imageFile) {
        imagePath = await uploadFile(imageFile)
      }
      
      // Add image path to form data
      formData.set('image', imagePath)
      
      const result = await addService(formData)
      if (result?.error) {
        setFormError(result.error)
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        setIsCreateDialogOpen(false)
        setImageFile(null)
        setImagePreview('')
        await fetchServices()
        toast({
          title: "Success",
          description: "Service added successfully.",
        })
      }
    } catch (error: any) {
      setFormError(error.message)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleUpdateService = async (formData: FormData) => {
    setFormError(null)
    setUploading(true)
    
    try {
      let imagePath = selectedService?.image || ''
      
      // Upload new image if exists
      if (editImageFile) {
        imagePath = await uploadFile(editImageFile)
      }
      
      // Add image path to form data
      formData.set('image', imagePath)
      
      const result = await updateService(formData)
      if (result?.error) {
        setFormError(result.error)
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        setIsEditDialogOpen(false)
        setEditImageFile(null)
        setEditImagePreview('')
        fetchServices()
        toast({
          title: "Success",
          description: "Service updated successfully.",
        })
      }
    } catch (error: any) {
      setFormError(error.message)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteService = async (id: number) => {
    const result = await deleteService(id)
    if (result?.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      fetchServices()
      toast({
        title: "Success",
        description: "Service deleted successfully.",
      })
    }
  }

  const openEditDialog = (service: Service) => {
    setSelectedService(service)
    setIsEditDialogOpen(true)
    setFormError(null)
    setEditImageFile(null)
    setEditImagePreview('')
  }

  if (loading) {
    return <div className="p-6">Loading services...</div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Service</DialogTitle>
              <DialogDescription>Add a new service to the platform.</DialogDescription>
            </DialogHeader>
            <form action={handleAddService} className="grid gap-4 py-4">
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
              <div className="grid gap-2">
                <Label htmlFor="name">Service Name</Label>
                <Input id="name" name="name" placeholder="Enter service name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Enter service description" required />
              </div>
              
              {/* Image Upload Section */}
              <div className="grid gap-2">
                <Label>Service Image</Label>
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeImage(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, false)}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                        <Upload className="h-4 w-4" />
                        Ganti Gambar
                      </div>
                    </Label>
                  </div>
                ) : (
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, false)}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Klik untuk upload gambar
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, WebP hingga 5MB
                        </p>
                      </div>
                    </Label>
                  </div>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="link">Link</Label>
                <Input id="link" name="link" placeholder="/services/example" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input id="sortOrder" name="sortOrder" type="number" placeholder="0" defaultValue="0" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <SubmitButton>{uploading ? "Uploading..." : "Add Service"}</SubmitButton>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No services found.
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell className="max-w-[250px] truncate">{service.description}</TableCell>
                  <TableCell>{service.link}</TableCell>
                  <TableCell>{service.sortOrder}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openEditDialog(service)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteService(service.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Service Dialog */}
      {selectedService && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
              <DialogDescription>Update the details of this service.</DialogDescription>
            </DialogHeader>
            <form action={handleUpdateService} className="grid gap-4 py-4">
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
              <input type="hidden" name="id" value={selectedService.id} />
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Service Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  defaultValue={selectedService.name}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  defaultValue={selectedService.description}
                  required
                />
              </div>
              
              {/* Edit Image Upload Section */}
              <div className="grid gap-2">
                <Label>Service Image</Label>
                {editImagePreview ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={editImagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeImage(true)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, true)}
                      className="hidden"
                      id="edit-image-upload"
                    />
                    <Label htmlFor="edit-image-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                        <Upload className="h-4 w-4" />
                        Ganti Gambar
                      </div>
                    </Label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedService.image && (
                      <div className="relative">
                        <img
                          src={selectedService.image}
                          alt="Current"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <p className="text-xs text-gray-500 mt-1">Gambar saat ini</p>
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, true)}
                      className="hidden"
                      id="edit-image-upload"
                    />
                    <Label htmlFor="edit-image-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Klik untuk upload gambar baru
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, WebP hingga 5MB
                        </p>
                      </div>
                    </Label>
                  </div>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-link">Link</Label>
                <Input
                  id="edit-link"
                  name="link"
                  defaultValue={selectedService.link}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-sortOrder">Sort Order</Label>
                <Input
                  id="edit-sortOrder"
                  name="sortOrder"
                  type="number"
                  defaultValue={selectedService.sortOrder}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <SubmitButton>{uploading ? "Uploading..." : "Update Service"}</SubmitButton>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

