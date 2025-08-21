"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { query } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getServices() {
  try {
    const services = await query("SELECT * FROM services ORDER BY sortOrder ASC, created_at ASC")
    return { services }
  } catch (error: any) {
    console.error("Error fetching services:", error)
    return { error: `Database error: ${error.message}` }
  }
}

export async function addService(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." }
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as string
  const link = formData.get("link") as string
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0

  if (!name || !description || !image || !link) {
    return { error: "Semua field harus diisi." }
  }

  try {
    await query(
      "INSERT INTO services (name, description, image, link, sortOrder, isActive) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, image, link, sortOrder, true]
    )
    
    revalidatePath("/admin/services")
    revalidatePath("/")
    return { success: true }
  } catch (error: any) {
    console.error("Error adding service:", error)
    return { error: `Terjadi kesalahan saat menambahkan layanan: ${error.message}` }
  }
}

export async function updateService(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." }
  }

  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as string
  const link = formData.get("link") as string
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0

  if (!id || !name || !description || !image || !link) {
    return { error: "Semua field harus diisi." }
  }

  try {
    await query(
      "UPDATE services SET name = ?, description = ?, image = ?, link = ?, sortOrder = ? WHERE id = ?",
      [name, description, image, link, sortOrder, parseInt(id)]
    )
    
    revalidatePath("/admin/services")
    revalidatePath("/")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating service:", error)
    return { error: `Terjadi kesalahan saat mengupdate layanan: ${error.message}` }
  }
}

export async function deleteService(id: number) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." }
  }

  try {
    await query("DELETE FROM services WHERE id = ?", [id])
    
    revalidatePath("/admin/services")
    revalidatePath("/")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting service:", error)
    return { error: `Terjadi kesalahan saat menghapus layanan: ${error.message}` }
  }
}