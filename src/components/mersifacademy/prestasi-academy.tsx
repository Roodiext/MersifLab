"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function PrestasiAcademy() {
  const { t } = useLanguage()

  return (
    <section id="prestasi" className="relative bg-white py-20">
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Judul */}
        <motion.h2
          style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "0.05em" }}
          className="text-4xl text-center mb-12"
          variants={fadeUp}
        >
          {t("academy.achievements.title")}
        </motion.h2>

        {/* Grid Prestasi */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={container}>
          {[
            {
              type: "juara",
              src: "mersif-academy/14.jpg",
              alt: "Juara I",
              text: t("academy.achievements.juara1.kti"),
            },
            {
              type: "produk",
              src: "mersif-academy/10.png",
              alt: "Robot Teleoperasi",
              text: t("academy.achievements.robot.teleoperasi"),
            },
            {
              type: "produk",
              src: "mersif-academy/11.png",
              alt: "Stasiun Cuaca",
              text: t("academy.achievements.stasiun.cuaca"),
            },
            {
              type: "juara",
              src: "mersif-academy/16.jpg",
              alt: "Juara II",
              text: t("academy.achievements.juara2.air"),
            },
            {
              type: "produk",
              src: "mersif-academy/13.png",
              alt: "Lampu Portabel",
              text: t("academy.achievements.lampu.portabel"),
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              className={`relative rounded-xl overflow-hidden shadow transition cursor-pointer ${
                item.type === "produk" ? "bg-gray-100" : ""
              }`}
            >
              <img
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                className={`w-full aspect-square ${item.type === "juara" ? "object-cover" : "object-contain p-6"}`}
              />
              <div
                className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t ${
                  item.type === "juara" ? "from-black/70 to-transparent" : "from-black/60 to-transparent"
                }`}
              >
                <p
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className={`text-sm font-medium ${item.type === "juara" ? "text-white" : "text-gray-800"}`}
                >
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}

          {/* CTA Besar */}
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white rounded-2xl shadow-lg p-6 flex flex-col justify-center cursor-pointer"
          >
            <h3 style={{ fontFamily: "Inter, sans-serif" }} className="text-2xl font-bold mb-3">
              {t("academy.achievements.cta.title")}
            </h3>
            <button
              style={{ fontFamily: "Inter, sans-serif" }}
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl flex items-center justify-between hover:bg-gray-100 transition"
            >
              {t("academy.achievements.cta.button")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
