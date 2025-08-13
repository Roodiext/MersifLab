"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function VistaCTA() {
  return (
    <section className="w-full py-16 bg-[#007bff] text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1000px] text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Siap Menghubungkan dan Memajukan?
        </h2>
        <p
          className="text-base md:text-lg mb-8 text-blue-100"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Mulai gunakan MersifVista sekarang dan rasakan dampaknya untuk bisnis maupun komunitas Anda.
        </p>
        <Button
          className="bg-white text-[#007bff] rounded-full px-6 h-12 hover:bg-gray-100"
        >
          Mulai Sekarang
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  )
}
