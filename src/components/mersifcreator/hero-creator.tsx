"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSectionCreator() {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    setShowAnimation(true)
  }, [])

  return (
    <section id="hero" className="w-full py-8 lg:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-[1600px]">
        {/* Mobile & Tablet */}
        <div className="flex flex-col items-center text-center lg:hidden space-y-6">
          <div className="relative w-full max-w-[500px]">
            <Image
              src="/images/mersif-creator.jpg"
              alt="Ilustrasi Mersif Creator"
              width={600}
              height={400}
              priority
              className={`rounded-xl border border-gray-200 shadow-lg object-cover w-full ${
                showAnimation ? "animate-fadeIn" : ""
              }`}
            />
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Mersif <span className="text-[#007bff]">Creator</span>
            </h1>
            <p
              className="max-w-[600px] text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed px-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Buat game interaktif dalam hitungan menit! Semua game yang dibuat dengan Mersif Creator akan otomatis
              tersedia di Mersif Room untuk dimainkan bersama.
            </p>
            <div className="flex justify-center pt-2">
              <Button className="rounded-full bg-[#007bff] px-6 text-white hover:bg-[#007bff]/90">
                Mulai Buat Game
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid gap-8 items-center lg:grid-cols-[1fr_580px]">
          {/* Text */}
          <div className="flex flex-col justify-center space-y-5 lg:pl-8">
            <h1
              className="lg:text-4xl xl:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Mersif <span className="text-[#007bff]">Creator</span> Room
            </h1>
            <p
              className="text-lg xl:text-xl text-gray-600 leading-relaxed max-w-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Lihat game dan aplikasi interaktif yang mengedukasi dan menghibur. Sampaikan materi pembelajaran dengan
              cara yang menyenangkan dan mudah dipahami.
            </p>
            <div>
              <Button className="rounded-full bg-[#007bff] px-6 text-white hover:bg-[#007bff]/90">
                Jelajahi
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Image
              src="/img/product/product-mersifcreator.png"
              alt="Ilustrasi Mersif Creator"
              width={800}
              height={600}
              priority
              className={`rounded-xl border border-gray-200 shadow-lg object-cover w-full ${
                showAnimation ? "animate-fadeIn" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
