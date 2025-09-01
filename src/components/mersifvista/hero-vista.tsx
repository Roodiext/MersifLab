"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function HeroVista() {
  return (
    <section id="hero" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1400px]">

        {/* Mobile & Tablet */}
        <div className="flex flex-col items-center text-center lg:hidden space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            <Image
              src="/img/MersifVista.png"
              alt="Mersif Vista Preview"
              width={950}
              height={700}
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Empowering Learning, <span className="text-[#007bff]">Inspiring Futures</span>
            </h1>
            <p
              className="text-gray-600 max-w-[800px] mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              MersifVista adalah program pelatihan digital gratis untuk guru, siswa, dan mahasiswa yang dirancang untuk membekali keterampilan teknologi sesuai kebutuhan dunia saat ini.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button className="bg-[#007bff] text-white rounded-full px-8 py-6 text-lg font-semibold hover:bg-[#007bff]/90 transition-all duration-300 transform hover:scale-105">
                Explore Programs
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button className="bg-transparent border-2 border-[#007bff] text-[#007bff] rounded-full px-8 py-6 text-lg font-semibold hover:bg-[#007bff]/10 transition-all duration-300 transform hover:scale-105">
                Join Training
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-20 xl:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1
              className="text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Empowering Learning, <span className="text-[#007bff]">Inspiring Futures</span>
            </h1>
            <p
              className="text-gray-600 text-xl xl:text-2xl leading-relaxed max-w-[600px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              MersifVista adalah program pelatihan digital gratis untuk guru, siswa, dan mahasiswa yang dirancang untuk membekali keterampilan teknologi sesuai kebutuhan dunia saat ini.
            </p>
            <div className="flex gap-4 pt-4">
              <Button className="bg-[#007bff] text-white rounded-full px-8 py-6 text-lg font-semibold hover:bg-[#007bff]/90 transition-all duration-300 transform hover:scale-105">
                Explore Programs
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button className="bg-transparent border-2 border-[#007bff] text-[#007bff] rounded-full px-8 py-6 text-lg font-semibold hover:bg-[#007bff]/10 transition-all duration-300 transform hover:scale-105">
                Join Training
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </div>
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
              className="w-full h-auto max-w-2xl"
            />
          </motion.div>
        </div>

      </div>
    </section>
  )
}