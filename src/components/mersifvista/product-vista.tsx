"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function VistaDemo() {
  const galleryItems = [
    { 
      src: "/img/VistaSMK2.png", 
      alt: "Pelatihan Dokumentasi", 
      title: "Pelatihan AI untuk Siswa SMK Negeri 2 Surakarta", 
      desc: "MersifLab Wujudkan Inovasi Berkelanjutan melalui Program Mersif Vista, Dimulai dengan Pelatihan Web Portfolio di SMKN 2 Surakarta",
      location: "SMK Negeri 2 Surakarta, Jl. LU Adisucipto No.33, Jajar, Laweyan",
      date: "15 November 2024"
    },
    { 
      src: "/img/VistaSMP1Pedan.jpg", 
      alt: "Sesi Interaktif", 
      title: "MersifLab Adakan Pelatihan Pembuatan Website Berbasis Cursor AI di SMP Negeri 1 Pedan", 
      desc: "Siswa SMP Pedan Belajar Membuat Website Cerdas dengan Cursor AI",
      location: "SMP Negeri 1 Pedan, Pedan, Klaten, Jawa Tengah",
      date: "9 Agustus 2025"
    },
    { 
      src: "/img/VistaSMKN6.png", 
      alt: "Workshop Praktik", 
      title: "Pelatihan Dasar-dasar AI Automation dan Integrasi untuk Prototying Berbasis IT", 
      desc: "Kerjasama Jurusan Pengembangan Perangkat Lunak dan Gim SMK Negeri 6 Surakarta dengan Mersiflab dan ROSUS",
      location: "SMK Negeri 6 Surakarta, Jl. LU Adisucipto No.45, Pucang Sawit",
      date: "12 -13 Agustus 2025"
    },
  ]

  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1200px]">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ fontFamily: "Poppins, sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Galeri <span className="text-[#007bff]">Pelatihan</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer bg-white group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="w-full aspect-[4/3] relative">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-md mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{item.title}</h3>
                <p className="text-gray-600 text-xs mb-2" style={{ fontFamily: "Inter, sans-serif" }}>{item.desc}</p>
                <div className="flex items-center justify-between text-[10px] text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {item.location.split(',')[0]}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {item.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="relative bg-white rounded-lg overflow-hidden max-w-lg w-full mx-2"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-lg font-bold z-10 bg-white bg-opacity-90 rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </button>

              <div className="w-full aspect-[4/3] relative">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3">
                <h3 className="text-md font-bold mb-1 text-gray-800" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {selectedItem.title}
                </h3>

                <p className="text-gray-600 text-sm mb-2 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  {selectedItem.desc}
                </p>

                <div className="space-y-1 pt-2 border-t border-gray-200 text-xs">
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-600">{selectedItem.location}</p>
                  </div>

                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-600">{selectedItem.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
