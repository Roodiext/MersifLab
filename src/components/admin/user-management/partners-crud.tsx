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
  getPartners,
  addPartner,
  updatePartner,
  deletePartner,
} from "@/app/admin/partners/actions"

interface Partner {
  id: number
  name: string
  logoUrl: string
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? "Processing..." : children}
    </Button>
  )
}

export default function PartnersCRUD() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchPartners = async () => {
    const result = await getPartners()
    if (result.partners) {
      setPartners(result.partners as Partner[])
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchPartners()
  }, [])

  const handleAddPartner = async (formData: FormData) => {
    setFormError(null)
    const result = await addPartner(formData)
    if (result?.error) {
      setFormError(result.error)
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      setIsCreateDialogOpen(false)
      fetchPartners()
      toast({
        title: "Success",
        description: "Partner added successfully.",
      })
    }
  }

  const handleUpdatePartner = async (formData: FormData) => {
    setFormError(null)
    const result = await updatePartner(formData)
    if (result?.error) {
      setFormError(result.error)
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      setIsEditDialogOpen(false)
      fetchPartners()
      toast({
        title: "Success",
        description: "Partner updated successfully.",
      })
    }
  }

  const handleDeletePartner = async (id: number) => {
    const result = await deletePartner(id)
    if (result?.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      fetchPartners()
      toast({
        title: "Success",
        description: "Partner deleted successfully.",
      })
    }
  }

  const openEditDialog = (partner: Partner) => {
    setSelectedPartner(partner)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Partner</DialogTitle>
              <DialogDescription>Add a new partner logo to the website.</DialogDescription>
            </DialogHeader>
            <form action={handleAddPartner} className="grid gap-4 py-4">
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
              <div className="grid gap-2">
                <Label htmlFor="name">Partner Name</Label>
                <Input id="name" name="name" placeholder="Enter partner name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logo">Logo Image</Label>
                <Input id="logo" name="logo" type="file" accept="image/*" required />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <SubmitButton>Add Partner</SubmitButton>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                  No partners found.
                </TableCell>
              </TableRow>
            ) : (
              partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    {partner.logoUrl ? (
                      <Image
                        src={partner.logoUrl || "/placeholder.svg"}
                        alt={partner.name}
                        width={80}
                        height={80}
                        className="rounded-md object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-300" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openEditDialog(partner)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeletePartner(partner.id)} className="text-red-600">
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

      {/* Edit Partner Dialog */}
      {selectedPartner && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Partner</DialogTitle>
              <DialogDescription>Update the details of this partner.</DialogDescription>
            </DialogHeader>
            <form action={handleUpdatePartner} className="grid gap-4 py-4">
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
              <input type="hidden" name="id" value={selectedPartner.id} />
              <input type="hidden" name="existingLogoUrl" value={selectedPartner.logoUrl} />
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Partner Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  defaultValue={selectedPartner.name}
                  placeholder="Enter partner name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-logo">Logo Image</Label>
                {selectedPartner.logoUrl && (
                  <div className="mb-2">
                    <Image
                      src={selectedPartner.logoUrl || "/placeholder.svg"}
                      alt="Current Logo"
                      width={100}
                      height={100}
                      className="rounded-md object-contain"
                    />
                    <p className="text-xs text-gray-500 mt-1">Current Logo</p>
                  </div>
                )}
                <Input id="edit-logo" name="logo" type="file" accept="image/*" />
                <p className="text-xs text-gray-500">Leave blank to keep current logo.</p>
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
