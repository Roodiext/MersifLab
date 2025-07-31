"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createOrUpdateProduct } from "@/app/admin/product/action"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function NewProductPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [price, setPrice] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct = { name, description, image_url: imageUrl, price: Number.parseFloat(price) || 0 }
    const success = await createOrUpdateProduct(newProduct)

    if (success) {
      toast({
        title: "Success!",
        description: "Product created successfully.",
      })
      router.push("/admin/product")
    } else {
      toast({
        title: "Error",
        description: "Failed to create product.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={6}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/placeholder.svg?height=200&width=200"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price (IDR)</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" />
          </div>
          <Button type="submit">Create Product</Button>
        </form>
      </CardContent>
    </Card>
  )
}
// This page is for creating a new product in the admin panel.
// It includes a form for entering product details such as name, description, image URL, and