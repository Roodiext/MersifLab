"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { deleteProduct, createOrUpdateProduct } from "@/app/admin/product/action"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Product {
  id: string
  name: string
  description: string
  image_url: string
  price: number
}

const initialProducts: Product[] = [
  {
    id: "prod1",
    name: "Mersif IoT Starter Kit",
    description: "A comprehensive kit to get started with IoT solutions.",
    image_url: "/placeholder.svg?height=100&width=100",
    price: 1500000,
  },
  {
    id: "prod2",
    name: "Mersif Creator Room VR Headset",
    description: "High-fidelity VR headset for immersive virtual creation.",
    image_url: "/placeholder.svg?height=100&width=100",
    price: 3500000,
  },
]

export function ProductsCrud() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const success = await deleteProduct(id)
      if (success) {
        setProducts(products.filter((product) => product.id !== id))
        toast({
          title: "Success!",
          description: "Product deleted successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete product.",
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (product: Product) => {
    setCurrentProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentProduct) return

    const success = await createOrUpdateProduct(currentProduct)
    if (success) {
      setProducts(products.map((prod) => (prod.id === currentProduct.id ? currentProduct : prod)))
      setIsEditDialogOpen(false)
      setCurrentProduct(null)
      toast({
        title: "Success!",
        description: "Product updated successfully.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to update product.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>Rp{product.price.toLocaleString("id-ID")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(product)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(product.id)}>Delete</DropdownMenuItem>
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
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            {currentProduct && (
              <form onSubmit={handleSaveEdit} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={currentProduct.description}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
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
                    value={currentProduct.image_url}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, image_url: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={currentProduct.price}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, price: Number.parseFloat(e.target.value) || 0 })
                    }
                    className="col-span-3"
                    step="0.01"
                  />
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
export default ProductsCrud
// This component provides a CRUD interface for managing products in the admin panel.