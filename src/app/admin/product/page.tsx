import { ProductsCrud } from "@/components/admin/products-crud"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button asChild>
          <Link href="/admin/product/new">Add New Product</Link>
        </Button>
      </div>
      <p className="text-muted-foreground">Manage the products offered by MersifLab.</p>
      <ProductsCrud />
    </div>
  )
}
