"use server"

import { revalidatePath } from "next/cache"

interface ProductData {
  id?: number
  name: string
  description: string
  image_url: string
  price: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "" // misal: "http://localhost:3000"

// CREATE or UPDATE product (service)
export async function createOrUpdateProduct(data: ProductData): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/service${data.id ? `/${data.id}` : ""}`, {
      method: data.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    revalidatePath("/admin/product")
    return res.ok
  } catch (err) {
    console.error("Error saving product:", err)
    return false
  }
}

// DELETE product (service)
export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/service/${id}`, { method: "DELETE" })
    revalidatePath("/admin/product")
    return res.ok
  } catch (err) {
    console.error("Error deleting product:", err)
    return false
  }
}

// GET all products (services)
export async function getProducts(): Promise<ProductData[]> {
  try {
    const res = await fetch(`${API_URL}/api/service`, { cache: "no-store" })
    if (!res.ok) throw new Error("Failed to fetch")
    return await res.json()
  } catch (err) {
    console.error("Error fetching products:", err)
    return []
  }
}
