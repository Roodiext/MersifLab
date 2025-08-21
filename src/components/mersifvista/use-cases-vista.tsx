"use client"

import { Cpu, Trophy, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

export function VistaUseCases() {
  const cases = [
    {
      icon: <Cpu className="w-10 h-10 text-[#007bff]" />,
      title: "Pelatihan AI",
      desc: "Pelajari dasar-dasar AI, integrasi sistem, dan prototyping berbasis teknologi cerdas."
    },
    {
      icon: <Trophy className="w-10 h-10 text-[#007bff]" />,
      title: "Pelatihan Lomba",
      desc: "Persiapkan peserta mengikuti kompetisi dengan strategi, teknik, dan praktik terbaik."
    },
    {
      icon: <Briefcase className="w-10 h-10 text-[#007bff]" />,
      title: "Pengajaran Bisnis",
      desc: "Ajarkan konsep bisnis, manajemen, dan pemasaran yang aplikatif untuk dunia nyata."
    }
  ]

  return (
    <section id="pelatihan" className="w-full py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1200px]">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Pelatihan <span className="text-[#007bff]">MersifVista</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="p-4 bg-[#e6f0ff] rounded-full">{item.icon}</div>
              <h3
                className="text-lg font-semibold"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {item.title}
              </h3>
              <p
                className="text-gray-600 text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
