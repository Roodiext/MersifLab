"use client"

import ServicesCRUD from "@/components/admin/user-management/services-crud"

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manajemen Layanan</h1>
      </div>
      
      <ServicesCRUD />
    </div>
  )
}