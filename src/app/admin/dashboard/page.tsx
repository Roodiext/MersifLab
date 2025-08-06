import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin/user-management/dashboard"
import { AdminHeader } from "@/components/admin/user-management/admin-header"

export const metadata: Metadata = {
  title: "Dashboard Admin - Mersif Lab",
  description: "Kelola proyek dan akses fitur admin di Mersif Lab",
}

export default async function DashboardAdminPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={session.user} />
      <AdminDashboard />
    </div>
  )
}
