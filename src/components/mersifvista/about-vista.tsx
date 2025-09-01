"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutVista() {
  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-14">
        
        {/* Bagian kiri - Gambar */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full md:w-1/2 flex justify-center"
        >
          <Image 
            src="/img/vista-about.svg"
            alt="Tentang Kami"
            width={420}
            height={420}
          />
        </motion.div>

        {/* Bagian kanan - Teks */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Tentang MersifVista 
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            <span className="font-semibold">MersifVista </span> hadir sebagai inisiatif 
            digital training untuk menjawab tantangan dunia pendidikan di era teknologi. 
            Kami percaya bahwa <span className="font-semibold">inovasi, kolaborasi, dan keberlanjutan </span> 
            adalah kunci dalam mencetak generasi pembelajar yang adaptif dan kreatif.
          </p>

          {/* Button */}
          <a 
            href="#"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl"
          >
            Lihat Selengkapnya
          </a>
        </motion.div>
      </div>
    </section>
  )
}
