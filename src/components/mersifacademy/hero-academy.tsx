"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function HeroWithAbout() {
  const [showAbout, setShowAbout] = useState(false)
  const { t } = useLanguage()

  return (
    <>
      {/* HERO */}
      <section id="hero" className="relative bg-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              {t("academy.hero.title").split(" ")[0]}{" "}
              <span className="text-blue-600">{t("academy.hero.title").split(" ")[1]}</span>
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg sm:text-xl mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              style={{ fontFamily: "Inter, sans-serif" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              {t("academy.hero.subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap justify-center md:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <button
                onClick={() => setShowAbout(true)}
                style={{ fontFamily: "Inter, sans-serif" }}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition"
              >
                {t("academy.hero.learn.more")}
              </button>
              <a
                href="#daftar"
                style={{ fontFamily: "Inter, sans-serif" }}
                className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition"
              >
                {t("academy.hero.register.now")}
              </a>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            <img src="/img/hero-academy.svg" alt="Hero" className="w-[400px] sm:w-[500px] md:w-[600px] rounded-lg" />
          </motion.div>
        </div>
      </section>

      {/* ABOUT muncul kalau tombol diklik */}
      {showAbout && (
        <motion.section
          id="about"
          className="bg-white py-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-6 space-y-28">
            {/* BAGIAN ATAS */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center md:justify-start">
                <motion.img
                  src="/img/selengkapnya-academy.svg"
                  alt="Prestasi"
                  className="w-[400px] sm:w-[500px] md:w-[600px] object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
              <div>
                <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {t("academy.hero.about.title")}
                </h2>
                <p className="text-gray-600 text-lg sm:text-xl mb-6">{t("academy.hero.about.description")}</p>
              </div>
            </motion.div>

            {/* BAGIAN TENGAH */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-10">
                <motion.img
                  src="/img/vr-selengkapnya.svg"
                  alt="VR"
                  className="w-[400px] sm:w-[500px] md:w-[650px] object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </div>

              {/* VISI MISI */}
              <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-10">
                {t("academy.hero.vision.mission")}
              </h1>

              <motion.div
                className="max-w-4xl mx-auto text-gray-600 space-y-6 text-lg sm:text-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p>{t("academy.hero.vision.text1")}</p>
                <p>{t("academy.hero.vision.text2")}</p>
                <p>{t("academy.hero.vision.text3")}</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}
    </>
  )
}
