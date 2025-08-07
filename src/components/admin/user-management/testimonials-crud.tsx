"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, MoreHorizontal, ImageIcon } from 'lucide-react'
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
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/app/admin/testimonials/actions"

interface Testimonial {
  id: number
  name: string
  role: string
  initials: string
  text: string
  imageUrl: string | null
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? "Processing..." : children}
    </Button>
  )
}

export default function TestimonialsCRUD() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchTestimonials = async () => {
    console.log("Fetching testimonials...")
    const result = await getTestimonials()
    console.log("Result:", result)
    if (result.testimonials) {
      console.log("Setting testimonials:", result.testimonials)
      setTestimonials(result.testimonials as Testimonial[])
    } else if (result.error) {
      console.error("Error:", result.error)
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleAddTestimonial = async (formData: FormData) => {
    setFormError(null)
    const result = await addTestimonial(formData)
    if (result?.error) {
      setFormError(result.error)
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      setIsCreateDialogOpen(false)
      // Force refresh
      await fetchTestimonials()
      toast({
        title: "Success",
        description: "Testimonial added successfully.",
      })
    }
  }

  const handleUpdateTestimonial = async (formData: FormData) => {
    setFormError(null)
    const result = await updateTestimonial(formData)
    if (result?.error) {
      setFormError(result.error)
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      setIsEditDialogOpen(false)
      fetchTestimonials()
      toast({
        title: "Success",
        description: "Testimonial updated successfully.",
      })
    }
  }

  const handleDeleteTestimonial = async (id: number) => {
    const result = await deleteTestimonial(id)
    if (result?.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      fetchTestimonials()
      toast({
        title: "Success",
        description: "Testimonial deleted successfully.",
      })
    }
  }

  const openEditDialog = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Testimonial</DialogTitle>
              <DialogDescription>Add a new customer testimonial.</DialogDescription>
            </DialogHeader>
            <form action={handleAddTestimonial} className="grid gap-4 py-4">
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Enter customer name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role/Position</Label>
                <Input id="role" name="role" placeholder="e.g., Siswa SMK Negeri 6 Surakarta" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="initials">Initials</Label>
                <Input id="initials" name="initials" placeholder="e.g., EL" maxLength={10} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="text">Testimonial Text</Label>
                <Textarea id="text" name="text" placeholder="Write the testimonial content" rows={5} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image (Optional)</Label>
                <Input id="image" name="image" type="file" accept="image/*" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <SubmitButton>Add Testimonial</SubmitButton>
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
              <TableHead>Role</TableHead>
              <TableHead>Testimonial</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No testimonials found.
                </TableCell>
              </TableRow>
            ) : (
              testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    {testimonial.imageUrl ? (
                      <Image
                        src={testimonial.imageUrl || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-10 h-10 text-gray-300" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell>{testimonial.role}</TableCell>
                  <TableCell className="max-w-[250px] truncate">{testimonial.text}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openEditDialog(testimonial)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteTestimonial(testimonial.id)} className="text-red-600">
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

      {/* Edit Testimonial Dialog */}
      {selectedTestimonial && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Testimonial</DialogTitle>
              <DialogDescription>Update the details of this testimonial.</DialogDescription>
            </DialogHeader>
            <form action={handleUpdateTestimonial} className="grid gap-4 py-4">
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
              <input type="hidden" name="id" value={selectedTestimonial.id} />
              <input type="hidden" name="existingImageUrl" value={selectedTestimonial.imageUrl || ""} />
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  defaultValue={selectedTestimonial.name}
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role/Position</Label>
                <Input
                  id="edit-role"
                  name="role"
                  defaultValue={selectedTestimonial.role}
                  placeholder="e.g., Siswa SMK Negeri 6 Surakarta"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-initials">Initials</Label>
                <Input
                  id="edit-initials"
                  name="initials"
                  defaultValue={selectedTestimonial.initials}
                  placeholder="e.g., EL"
                  maxLength={10}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-text">Testimonial Text</Label>
                <Textarea
                  id="edit-text"
                  name="text"
                  defaultValue={selectedTestimonial.text}
                  placeholder="Write the testimonial content"
                  rows={5}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image (Optional)</Label>
                {selectedTestimonial.imageUrl && (
                  <div className="mb-2">
                    <Image
                      src={selectedTestimonial.imageUrl || "/placeholder.svg"}
                      alt="Current Image"
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                    <p className="text-xs text-gray-500 mt-1">Current Image</p>
                  </div>
                )}
                <Input id="edit-image" name="image" type="file" accept="image/*" />
                <p className="text-xs text-gray-500">Leave blank to keep current image.</p>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <SubmitButton>Save Changes</SubmitButton>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
