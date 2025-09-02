"use client"

import { motion } from "framer-motion"

export default function ServiceAcademy() {
  return (
    <section className="relative bg-white py-32">
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
            <img
              src="/img/fasilitas-academy.svg"
              alt="Service Illustration"
              className="w-full max-w-md"
            />
          </motion.div>

          {/* Kolom Kanan - Teks + Layanan & Fasilitas */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Layanan & Fasilitas</h2>
            <p style={{ fontFamily: "Inter, sans-serif" }} className="text-gray-600">
              Kami menyediakan berbagai layanan dan fasilitas untuk mendukung pengembangan keterampilan dan pengalaman belajar.
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
                  title: "Kelas Interaktif",
                  desc: "Pembelajaran berbasis diskusi & praktik langsung.",
                },
                {
                  title: "Laboratorium Digital",
                  desc: "Akses ke perangkat & software terbaru.",
                },
                {
                  title: "Mentoring",
                  desc: "Bimbingan dari para mentor berpengalaman.",
                },
                {
                  title: "Komunitas",
                  desc: "Bergabung dengan komunitas pembelajar aktif.",
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
                  <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-lg">{item.title}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif" }} className="text-gray-500 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
