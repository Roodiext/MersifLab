"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function HeroVista() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="relative w-full bg-white overflow-hidden overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-12 lg:py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight font-[Poppins] text-black">
            {t("vista.hero.title")} <br />
            {t("vista.hero.title.highlight")}
          </h1>
          <p className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed font-[Inter] max-w-lg mx-auto lg:mx-0">
            <span className="text-[#00A8FF] font-semibold">MersifVista</span> {t("vista.hero.description")}
          </p>

          {/* Tombol */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Button
              style={{ fontFamily: "Inter, sans-serif" }}
              className="w-full sm:w-auto bg-[#00A8FF] text-white rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold
                         hover:bg-[#0090dd] transition-all duration-300 transform hover:scale-105"
            >
              {t("vista.hero.explore.programs")}
            </Button>

            <Button
              style={{ fontFamily: "Inter, sans-serif" }}
              className="w-full sm:w-auto bg-[#00A8FF] text-white rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold
                         hover:bg-[#0090dd] transition-all duration-300 transform hover:scale-105"
            >
              {t("vista.hero.join.training")}
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
            src="/img/herovista.svg"
            alt="Mersif Vista People"
            width={520}
            height={520}
            className="w-full max-w-[500px] h-auto object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
