import { MersifNumbersCrud } from "@/components/admin/user-management/mersif-numbers-crud"

export default function MersifNumbersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mersif Numbers Management</h1>
      <p className="text-muted-foreground">Manage the impact numbers displayed on the homepage.</p>
      <MersifNumbersCrud />
    </div>
  )
}
// This page is for managing the Mersif numbers displayed on the homepage.
// It includes a CRUD interface for adding, editing, and deleting impact numbers.   