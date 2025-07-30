import { Metadata } from "next"
import AdminDashboard from "@/components/admin/user-management/dashboard"

export const metadata: Metadata = {
  title: "Dashboard Admin - Mersif Lab",
  description: "Kelola proyek dan akses fitur admin di Mersif Lab",
}

export default function DashboardAdminPage() {
  return (
    <>
      <AdminDashboard />
    </>
  )
}