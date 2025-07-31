"use server"

interface ProductData {
  id?: string
  name: string
  description: string
  image_url: string
  price: number
}

// In a real application, you would interact with a database here.
// For demonstration, we'll simulate data operations.

let products: ProductData[] = [
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

export async function createOrUpdateProduct(data: ProductData): Promise<boolean> {
  console.log("Simulating create/update product:", data)
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

  if (data.id) {
    // Update existing product
    const index = products.findIndex((p) => p.id === data.id)
    if (index !== -1) {
      products[index] = { ...products[index], ...data }
      console.log("Product updated (simulated).")
      return true
    }
    return false // Product not found
  } else {
    // Create new product
    const newId = `prod${products.length + 1}`
    products.push({ ...data, id: newId })
    console.log("Product created (simulated).")
    return true
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  console.log(`Simulating delete product with ID: ${id}`)
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

  const initialLength = products.length
  products = products.filter((product) => product.id !== id)
  if (products.length < initialLength) {
    console.log("Product deleted (simulated).")
    return true
  } else {
    console.error("Failed to delete product (simulated). Product not found.")
    return false
  }
}

export async function getProducts(): Promise<ProductData[]> {
  console.log("Simulating fetching products.")
  await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate network delay
  return products
}
