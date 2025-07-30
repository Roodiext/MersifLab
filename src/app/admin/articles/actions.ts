// src/app/admin/articles/actions.ts

"use server";

import { query } from "@/lib/db"; // Menggunakan fungsi query dari db.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { IncomingForm } from "formidable";
import { NextApiRequest } from "next";

// Fungsi untuk parsing form data karena Server Actions tidak langsung handle file
async function parseFormData(req: any) {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            
            // formidable v3 memberikan array untuk fields
            const simplifiedFields: { [key: string]: string } = {};
            for (const key in fields) {
                if (fields[key]) {
                    simplifiedFields[key] = fields[key]![0];
                }
            }
            resolve({ fields: simplifiedFields, files });
        });
    });
}


export async function addArticle(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    return { error: "Akses ditolak. Anda bukan admin." };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !content || !imageFile || imageFile.size === 0) {
    return { error: "Semua field harus diisi." };
  }

  try {
    // 1. Simpan file gambar
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    // Pastikan direktori ada
    await fs.mkdir(uploadDir, { recursive: true });
    
    await fs.writeFile(
      path.join(uploadDir, filename),
      buffer
    );

    const imageUrl = `/uploads/${filename}`;

    // 2. Simpan data ke database
    await query(
      "INSERT INTO articles (title, content, imageUrl, authorId) VALUES (?, ?, ?, ?)",
      [title, content, imageUrl, session.user.id]
    );

  } catch (e: any) {
    return { error: `Terjadi kesalahan: ${e.message}` };
  }

  // 3. Revalidate path agar halaman news menampilkan data baru
  revalidatePath("/news");
  revalidatePath("/admin/dashboard");

  // 4. Redirect ke dashboard
  redirect("/admin/dashboard");
}