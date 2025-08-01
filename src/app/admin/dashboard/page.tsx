import { Metadata } from "next"
import AdminDashboard from "@/components/admin/user-management/dashboard"
import { AdminHeader } from "@/components/admin/user-management/admin-header"

export const metadata: Metadata = {
  title: "Dashboard Admin - Mersif Lab",
  description: "Kelola proyek dan akses fitur admin di Mersif Lab",
}

export default function DashboardAdminPage() {
  return (
    <>
      <AdminHeader />
      <AdminDashboard />
    </>
  )
}