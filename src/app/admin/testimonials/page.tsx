"use client"

import TestimonialsCRUD from "@/components/admin/user-management/testimonials-crud"

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manajemen Testimonials</h1>
      </div>
      
      <TestimonialsCRUD />
    </div>
  )
}


