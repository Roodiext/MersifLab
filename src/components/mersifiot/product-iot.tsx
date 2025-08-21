"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Agnivolt",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8f9fa' stroke='%23dee2e6'/%3E%3Cg transform='translate(150,100)'%3E%3Ccircle cx='0' cy='0' r='30' fill='none' stroke='%23495057' stroke-width='2'/%3E%3Cpath d='M-15,-5 L15,-5 M-15,5 L15,5 M-5,-15 L-5,15 M5,-15 L5,15' stroke='%23495057' stroke-width='2'/%3E%3Ctext x='0' y='50' text-anchor='middle' font-size='14' fill='%23495057'%3EAgnivolt%3C/text%3E%3C/g%3E%3C/svg%3E",
    specs: "Sensor daya listrik untuk pompa air",
    description:
      "Sistem monitoring pintar untuk menghitung konsumsi daya listrik pada pompa air. Membantu mengoptimalkan penggunaan energi dan biaya operasional pompa air rumah tangga atau industri.",
    manualFile: "/manuals/agnivolt.pdf"
  },
  {
    id: 2,
    name: "Mosyen AI",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8f9fa' stroke='%23dee2e6'/%3E%3Cg transform='translate(150,100)'%3E%3Crect x='-25' y='-25' width='50' height='50' fill='none' stroke='%23495057' stroke-width='2'/%3E%3Cpath d='M-15,-15 L15,15 M15,-15 L-15,15' stroke='%23495057' stroke-width='2'/%3E%3Ccircle cx='-30' cy='-30' r='3' fill='%23495057'/%3E%3Ccircle cx='30' cy='-30' r='3' fill='%23495057'/%3E%3Ccircle cx='-30' cy='30' r='3' fill='%23495057'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%23495057'/%3E%3Ctext x='0' y='50' text-anchor='middle' font-size='14' fill='%23495057'%3EMosyen AI%3C/text%3E%3C/g%3E%3C/svg%3E",
    specs: "AI-powered 3D design software",
    description:
      "Software desain 3D berbasis AI yang memudahkan pembuatan model dan desain tiga dimensi. Menggunakan teknologi artificial intelligence untuk mempercepat proses desain dan rendering.",
    manualFile: "/manuals/mosyen-ai.pdf"
  },
  {
    id: 3,
    name: "Project Dummy 1",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8f9fa' stroke='%23dee2e6'/%3E%3Cg transform='translate(150,100)'%3E%3Crect x='-3' y='-40' width='6' height='60' fill='%23495057'/%3E%3Ccircle cx='0' cy='-45' r='5' fill='%23495057'/%3E%3Cpath d='M-8,25 Q0,15 8,25' fill='none' stroke='%23495057' stroke-width='2'/%3E%3Ctext x='0' y='50' text-anchor='middle' font-size='12' fill='%23495057'%3EProject Dummy 1%3C/text%3E%3C/g%3E%3C/svg%3E",
    specs: "Pensil warna-warni dengan penghapus",
    description:
      "Pensil ajaib yang bisa menulis dalam berbagai warna dan dilengkapi dengan penghapus yang tidak pernah habis. Cocok untuk anak-anak dan dewasa yang suka menggambar.",
    manualFile: "/manuals/project-dummy-1.pdf"
  }
]

export function ProductIoT() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Fixed smooth continuous auto-scroll
  useEffect(() => {
    let animationFrame: number
    const speed = 1 // px per frame

    const scroll = () => {
      if (carouselRef.current) {
        const container = carouselRef.current
        const maxScroll = container.scrollWidth - container.clientWidth
        
        container.scrollLeft += speed
        
        // Reset to beginning when reaching the end
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0
        }
      }
      animationFrame = requestAnimationFrame(scroll)
    }

    // Start scrolling
    animationFrame = requestAnimationFrame(scroll)
    
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Produk IoT Kami
        </h2>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Duplicate products for seamless loop */}
          {[...products, ...products].map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="min-w-[300px] max-w-[300px] flex-shrink-0 border rounded-xl shadow-md bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="object-cover w-full h-48 rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.specs}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <DialogContent className="max-w-md p-4 overflow-y-auto max-h-[90vh] rounded-xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={500}
                  height={350}
                  className="rounded-lg"
                />
                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Download Manual */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center"
                >
                  <a href={selectedProduct.manualFile} download>
                    <Download className="mr-2 h-4 w-4" /> Download Manual
                  </a>
                </Button>

                {/* Form Pemesanan */}
                <form className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nama"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Jumlah"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    min="1"
                    required
                  />
                  <Button className="w-full bg-[#007bff] text-white hover:bg-[#0069d9]">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Pesan Sekarang
                  </Button>
                </form>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}