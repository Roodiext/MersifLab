"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Redirect ke halaman user management jika user adalah admin.
 * Dipanggil dari server (bukan dari komponen client).
 */
export async function goToUserManagement() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    throw new Error("Akses ditolak. Hanya admin yang dapat mengakses halaman ini.");
  }

  redirect("/admin/user-management");
}


export async function refreshDashboardData() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    throw new Error("Akses ditolak. Hanya admin yang dapat melakukan ini.");
  }

  // Revalidate paths for all sections that might be affected
  revalidatePath("/admin/dashboard");
  revalidatePath("/"); // Revalidate homepage for Mersif Numbers, Partners, Products, Testimonials, News
  revalidatePath("/news"); // Specific for news page
}
