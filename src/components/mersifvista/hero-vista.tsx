"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function HeroVista() {
  return (
    <section id="hero" className="w-full py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1100px]">

        {/* Mobile & Tablet */}
        <div className="flex flex-col items-center text-center lg:hidden space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/img/MersifVista.png"
              alt="Mersif Vista Preview"
              width={900}
              height={600}
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Mersif<span className="text-[#007bff]">Vista</span>
            </h1>
            <p
              className="text-gray-600 max-w-[700px] mx-auto text-base sm:text-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Bagian dari <strong>MersifLab</strong>, MersifVista memberi solusi IoT untuk semua.
              Menghubungkan dan memajukan tanpa batas.
            </p>
            <Button className="bg-[#007bff] text-white rounded-full px-6 h-11 hover:bg-[#007bff]/90">
              Jelajahi Lebih Lanjut
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5"
          >
            <h1
              className="text-4xl xl:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Mersif<span className="text-[#007bff]">Vista</span>
            </h1>
            <p
              className="text-gray-600 max-w-[700px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Bagian dari <strong>MersifLab</strong>, MersifVista memberi solusi IoT untuk semua.
              Menghubungkan dan memajukan tanpa batas.
            </p>
            <Button className="bg-[#007bff] text-white rounded-full px-6 h-11 hover:bg-[#007bff]/90">
              Jelajahi Lebih Lanjut
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <Image
              src="/img/MersifVista.png"
              alt="Mersif Vista"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
  