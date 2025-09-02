"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroVista() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight font-[Poppins]">
            Empowering Learning <br />
            <span className="text-black">Inspiring Futures</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed font-[Inter] max-w-lg mx-auto lg:mx-0">
            <span className="text-[#007bff] font-semibold">MersifVista</span> adalah program pelatihan digital gratis untuk guru, siswa, 
            dan mahasiswa yang dirancang untuk membekali keterampilan teknologi 
            sesuai kebutuhan dunia saat ini.
          </p>

          {/* Tombol */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4">
            <Button
              className="w-full sm:w-auto bg-[#007bff] text-white rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold
                         hover:bg-[#007bff]/90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Explore Programs
              <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
            </Button>

            <Button
              className="w-full sm:w-auto group bg-transparent border-2 border-[#007bff] text-[#007bff] rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold
                         hover:bg-[#007bff] hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Join Training
              <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:text-white transition-colors duration-300" />
            </Button>
          </div>
        </motion.div>

        {/* Image Section */} 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex justify-center lg:justify-end"
        >
          <Image
            src="/img/herovista.svg" // gambar orang + background biru
            alt="Mersif Vista People"
            width={480}
            height={480}
            className="w-full max-w-[480px] h-auto object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
