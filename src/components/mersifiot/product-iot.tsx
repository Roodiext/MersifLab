"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Mersif IoT Sensor Kit",
    price: 1200000,
    image: "/images/iot-sensor.jpg",
    specs: "Sensor suhu, kelembaban, dan cahaya",
    description:
      "Kit sensor IoT lengkap untuk pemantauan lingkungan secara real-time. Cocok untuk rumah pintar, industri, dan penelitian.",
    manualFile: "/manuals/iot-sensor-kit.pdf"
  },
  {
    id: 2,
    name: "Mersif IoT Gateway",
    price: 2500000,
    image: "/images/iot-gateway.jpg",
    specs: "Dukungan LoRa, Wi-Fi, dan Ethernet",
    description:
      "Gateway IoT berperforma tinggi untuk menghubungkan berbagai sensor dan perangkat ke cloud.",
    manualFile: "/manuals/iot-gateway.pdf"
  },
  {
    id: 3,
    name: "Mersif Smart Plug",
    price: 450000,
    image: "/images/smart-plug.jpg",
    specs: "Kontrol daya via aplikasi",
    description:
      "Smart plug untuk mengontrol peralatan rumah tangga dari jarak jauh.",
    manualFile: "/manuals/smart-plug.pdf"
  },
  {
    id: 4,
    name: "Mersif Smart Light",
    price: 300000,
    image: "/images/smart-light.jpg",
    specs: "Lampu pintar RGB, kontrol suara",
    description:
      "Lampu pintar yang dapat diatur warna dan kecerahannya via aplikasi atau suara.",
    manualFile: "/manuals/smart-light.pdf"
  },
  {
    id: 5,
    name: "Mersif Camera IoT",
    price: 1800000,
    image: "/images/iot-camera.jpg",
    specs: "Kamera HD, deteksi gerak",
    description:
      "Kamera pintar untuk keamanan rumah dengan deteksi gerak dan notifikasi real-time.",
    manualFile: "/manuals/iot-camera.pdf"
  }
]

export function ProductIoT() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Smooth continuous auto-scroll
  useEffect(() => {
    let animationFrame: number
    const speed = 0.5 // px per frame

    const scroll = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += speed
        // reset scroll if end reached
        if (
          carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
          carouselRef.current.scrollWidth - 1
        ) {
          carouselRef.current.scrollLeft = 0
        }
      }
      animationFrame = requestAnimationFrame(scroll)
    }

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
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
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
                <p className="text-blue-600 font-bold mt-2">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
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
                <p className="text-blue-600 font-bold text-lg">
                  Rp {selectedProduct.price.toLocaleString("id-ID")}
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
