"use server";

import { query } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

// Helper to save and compress image
async function saveAndCompressImage(imageFile: File): Promise<string> {
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`;
  const uploadDir = path.join(process.cwd(), "public/uploads/testimonials");

  await fs.mkdir(uploadDir, { recursive: true });

  const outputPath = path.join(uploadDir, filename);

  await sharp(buffer)
    .resize(200) // Resize for testimonial avatars
    .webp({ quality: 80 })
    .toFile(outputPath);

  return `/uploads/testimonials/${filename}`;
}

export async function getTestimonials() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." };
  }
  try {
    const testimonials = await query("SELECT * FROM testimonials ORDER BY id ASC");
    return { testimonials };
  } catch (e: any) {
    return { error: `Terjadi kesalahan saat mengambil testimoni: ${e.message}` };
  }
}

export async function addTestimonial(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." };
  }

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const initials = formData.get("initials") as string;
  const text = formData.get("text") as string;
  const imageFile = formData.get("image") as File;

  if (!name || !role || !initials || !text) {
    return { error: "Nama, Jabatan, Inisial, dan Isi Testimoni harus diisi." };
  }

  let imageUrl = null;
  if (imageFile && imageFile.size > 0) {
    try {
      imageUrl = await saveAndCompressImage(imageFile);
    } catch (e: any) {
      return { error: `Gagal mengunggah gambar: ${e.message}` };
    }
  }

  try {
    await query(
      "INSERT INTO testimonials (name, role, initials, text, imageUrl) VALUES (?, ?, ?, ?, ?)",
      [name, role, initials, text, imageUrl]
    );
  } catch (e: any) {
    return { error: `Terjadi kesalahan saat menambahkan testimoni: ${e.message}` };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/"); // Revalidate homepage to update testimonials
  revalidatePath("/api/testimonials"); // Revalidate API route
}

export async function updateTestimonial(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." };
  }

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const initials = formData.get("initials") as string;
  const text = formData.get("text") as string;
  const imageFile = formData.get("image") as File;
  const existingImageUrl = formData.get("existingImageUrl") as string;

  if (!id || !name || !role || !initials || !text) {
    return { error: "ID, Nama, Jabatan, Inisial, dan Isi Testimoni harus diisi." };
  }

  let imageUrlToUse = existingImageUrl;
  if (imageFile && imageFile.size > 0) {
    try {
      imageUrlToUse = await saveAndCompressImage(imageFile);
    } catch (e: any) {
      return { error: `Gagal mengunggah gambar baru: ${e.message}` };
    }
  }

  try {
    await query(
      "UPDATE testimonials SET name = ?, role = ?, initials = ?, text = ?, imageUrl = ? WHERE id = ?",
      [name, role, initials, text, imageUrlToUse, id]
    );
  } catch (e: any) {
    return { error: `Terjadi kesalahan saat memperbarui testimoni: ${e.message}` };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/"); // Revalidate homepage to update testimonials
  revalidatePath("/api/testimonials"); // Revalidate API route
}

export async function deleteTestimonial(id: number) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." };
  }

  try {
    const [testimonial]: any = await query("SELECT imageUrl FROM testimonials WHERE id = ?", [id]);
    if (testimonial && testimonial.imageUrl && testimonial.imageUrl.startsWith('/uploads/testimonials/')) {
      const filePath = path.join(process.cwd(), "public", testimonial.imageUrl);
      try {
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.warn(`Failed to delete image file ${filePath}:`, unlinkError);
      }
    }
    await query("DELETE FROM testimonials WHERE id = ?", [id]);
  } catch (e: any) {
    return { error: `Terjadi kesalahan saat menghapus testimoni: ${e.message}` };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/"); // Revalidate homepage to update testimonials
  revalidatePath("/api/testimonials"); // Revalidate API route
}export async function reorderTestimonials(ids: number[]) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." };
  }

  if (!Array.isArray(ids) || ids.length === 0) {
    return { error: "Daftar ID testimoni tidak valid." };
  }

  try {
    const values = ids.map((id, index) => `(${id}, ${index + 1})`).join(", ");
    await query(`INSERT INTO testimonials (id, sortOrder) VALUES ${values} ON DUPLICATE KEY UPDATE sortOrder = VALUES(sortOrder)`);
  } catch (e: any) {
    return { error: `Terjadi kesalahan saat mengurutkan testimoni: ${e.message}` };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/"); // Revalidate homepage to update testimonials
  revalidatePath("/api/testimonials"); // Revalidate API route
}
