"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function AboutVista() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative w-full bg-white overflow-hidden overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
        {/* Gambar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center lg:justify-start"
        >
          <Image
            src="/img/vista-about.svg"
            alt="Tentang MersifVista"
            width={420}
            height={420}
            className="max-w-full h-auto object-contain"
            priority
          />
        </motion.div>

        {/* Teks */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 text-center lg:text-left space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black font-[Poppins]">
            {t("vista.about.title")} <span className="text-[#00A8FF]">{t("vista.about.title.highlight")}</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-[Inter] max-w-lg mx-auto lg:mx-0">
            {t("vista.about.description")}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
