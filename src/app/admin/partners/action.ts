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
  const uploadDir = path.join(process.cwd(), "public/uploads/partners");

  await fs.mkdir(uploadDir, { recursive: true });

  const outputPath = path.join(uploadDir, filename);

  await sharp(buffer)
    .resize(200) // Resize for logos
    .webp({ quality: 80 })
    .toFile(outputPath);

  return `/uploads/partners/${filename}`;
}

export async function getPartners() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." };
  }
  try {
    const partners = await query("SELECT * FROM partners ORDER BY id ASC");
    return { partners };
  } catch (e: any) {
    return { error: `Terjadi kesalahan saat mengambil partner: ${e.message}` };
  }
}

export async function addPartner(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." };
  }

  const name = formData.get("name") as string;
  const logoFile = formData.get("logo") as File;

  if (!name || !logoFile || logoFile.size === 0) {
    return { error: "Nama dan Logo harus diisi." };
  }

  let logoUrl = null;
  try {
    logoUrl = await saveAndCompressImage(logoFile);
  } catch (e: any) {
    return { error: `Gagal mengunggah logo: ${e.message}` };
  }

  try {
    await query(
      "INSERT INTO partners (name, logoUrl) VALUES (?, ?)",
      [name, logoUrl]
    );
  } catch (e: any) {
    return { error: `Terjadi kesalahan saat menambahkan partner: ${e.message}` };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/"); // Revalidate homepage
}

export async function updatePartner(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." };
  }

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const logoFile = formData.get("logo") as File;
  const existingLogoUrl = formData.get("existingLogoUrl") as string;

  if (!id || !name) {
    return { error: "ID dan Nama harus diisi." };
  }

  let logoUrlToUse = existingLogoUrl;
  if (logoFile && logoFile.size > 0) {
    try {
      logoUrlToUse = await saveAndCompressImage(logoFile);
    } catch (e: any) {
      return { error: `Gagal mengunggah logo baru: ${e.message}` };
    }
  }

  try {
    await query(
      "UPDATE partners SET name = ?, logoUrl = ? WHERE id = ?",
      [name, logoUrlToUse, id]
    );
  } catch (e: any) {
    return { error: `Terjadi kesalahan saat memperbarui partner: ${e.message}` };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/"); // Revalidate homepage
}

export async function deletePartner(id: number) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." };
  }

  try {
    const [partner]: any = await query("SELECT logoUrl FROM partners WHERE id = ?", [id]);
    if (partner && partner.logoUrl && partner.logoUrl.startsWith('/uploads/partners/')) {
      const filePath = path.join(process.cwd(), "public", partner.logoUrl);
      try {
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.warn(`Failed to delete logo file ${filePath}:`, unlinkError);
      }
    }
    await query("DELETE FROM partners WHERE id = ?", [id]);
  } catch (e: any) {
    return { error: `Terjadi kesalahan saat menghapus partner: ${e.message}` };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/"); // Revalidate homepage
}
