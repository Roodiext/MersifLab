"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"

export function VistaTestimonials() {
  const testimonials = [
    {
      name: "Rina Putri",
      role: "Peserta Pelatihan VR",
      text: "Abis ikut pelatihan ini, skill saya naik banget! Materinya jelas, instruktur sabar, mantap deh.",
      rating: 5
    },
    {
      name: "Agus Santoso",
      role: "Peserta IoT Workshop",
      text: "Seru banget! Praktiknya banyak, nggak cuma teori. Langsung bisa bikin proyek sendiri.",
      rating: 5
    },
    {
      name: "Dewi Lestari",
      role: "Peserta Kreativitas Digital",
      text: "Awalnya ragu, tapi ternyata mudah diikuti. Abis pelatihan, ide-ide kreatif jadi lancar!",
      rating: 4
    }
  ]

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1100px]">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Komen <span className="text-[#007bff]">Abis Pelatihan</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="flex mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                “{item.text}”
              </p>
              <div>
                <p className="font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
