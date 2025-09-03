"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function ServiceAcademy() {
  const { t } = useLanguage()

  return (
    <section id="program" className="relative bg-white py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri - Gambar */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img src="/img/fasilitas-academy.svg" alt="Service Illustration" className="w-full max-w-md" />
          </motion.div>

          {/* Kolom Kanan - Teks + Layanan & Fasilitas */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
              {t("academy.services.title")}
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif" }} className="text-gray-600">
              {t("academy.services.subtitle")}
            </p>

            {/* Grid dengan stagger */}
            <motion.div
              className="grid sm:grid-cols-2 gap-6 mt-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {[
                {
                  title: t("academy.services.interactive.classes"),
                  desc: t("academy.services.interactive.desc"),
                },
                {
                  title: t("academy.services.digital.lab"),
                  desc: t("academy.services.digital.desc"),
                },
                {
                  title: t("academy.services.mentoring"),
                  desc: t("academy.services.mentoring.desc"),
                },
                {
                  title: t("academy.services.community"),
                  desc: t("academy.services.community.desc"),
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                  }}
                >
                  <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-lg">
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif" }} className="text-gray-500 text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
