"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { query } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getTestimonials() {
  // Remove session check for now to test
  try {
    console.log("Starting to fetch testimonials...")
    const testimonials = await query("SELECT * FROM testimonials ORDER BY created_at DESC")
    console.log("Testimonials fetched successfully:", testimonials)
    return { testimonials }
  } catch (error: any) {
    console.error("Detailed error in getTestimonials:", error)
    return { error: `Database error: ${error.message}` }
  }
}

export async function addTestimonial(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." }
  }

  const name = formData.get("name") as string
  const role = formData.get("role") as string
  const initials = formData.get("initials") as string
  const text = formData.get("text") as string
  const imageFile = formData.get("image") as File

  if (!name || !role || !initials || !text) {
    return { error: "Nama, Jabatan, Inisial, dan Isi Testimoni harus diisi." }
  }

  let imageUrl = null
  if (imageFile && imageFile.size > 0) {
    // For now, we'll skip image upload and just store null
    // You can implement image upload later
    imageUrl = null
  }

  try {
    await query(
      "INSERT INTO testimonials (name, role, initials, text, imageUrl) VALUES (?, ?, ?, ?, ?)",
      [name, role, initials, text, imageUrl]
    )
    
    revalidatePath("/admin/testimonials")
    revalidatePath("/")
    return { success: true }
  } catch (error: any) {
    console.error("Error adding testimonial:", error)
    return { error: `Terjadi kesalahan saat menambahkan testimoni: ${error.message}` }
  }
}

export async function updateTestimonial(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." }
  }

  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const role = formData.get("role") as string
  const initials = formData.get("initials") as string
  const text = formData.get("text") as string
  const imageFile = formData.get("image") as File
  const existingImageUrl = formData.get("existingImageUrl") as string

  if (!id || !name || !role || !initials || !text) {
    return { error: "ID, Nama, Jabatan, Inisial, dan Isi Testimoni harus diisi." }
  }

  let imageUrl = existingImageUrl
  if (imageFile && imageFile.size > 0) {
    // For now, we'll keep existing image
    // You can implement image upload later
    imageUrl = existingImageUrl
  }

  try {
    await query(
      "UPDATE testimonials SET name = ?, role = ?, initials = ?, text = ?, imageUrl = ? WHERE id = ?",
      [name, role, initials, text, imageUrl, parseInt(id)]
    )
    
    revalidatePath("/admin/testimonials")
    revalidatePath("/")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating testimonial:", error)
    return { error: `Terjadi kesalahan saat mengupdate testimoni: ${error.message}` }
  }
}

export async function deleteTestimonial(id: number) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." }
  }

  try {
    await query("DELETE FROM testimonials WHERE id = ?", [id])
    
    revalidatePath("/admin/testimonials")
    revalidatePath("/")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting testimonial:", error)
    return { error: `Terjadi kesalahan saat menghapus testimoni: ${error.message}` }
  }
}






