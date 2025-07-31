"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

export function ProductsSection() {
  const [showMoreServices, setShowMoreServices] = useState(false)

  const services = [
    {
      name: "Mersif Academy",
      description: "Platform pembelajaran online",
      image: "/img/service/mersifacademy-img.svg",
      link: "/services/mersif-academy",
    },
    {
      name: "Mersif Iot",
      description: "Internet of Things solutions",
      image: "/img/service/mersifiot-img.svg",
      link: "/services/mersif-iot",
    },
    {
      name: "Mersif Creator Room",
      description: "Platform kreasi ruang virtual",
      image: "/img/service/mersifcreator-img.svg",
      link: "/services/mersif-creator-room",
    },
    {
      name: "Mersif Vista",
      description: "Visualisasi data dan analytics",
      image: "/img/service/mersif-vista.svg",
      link: "/services/mersif-vista",
    },
  ]

  const moreServices = [
    {
      name: "Mersif Mobile Apps",
      description: "Aplikasi mobile Pembelajaran",
      image: "/img/product/product-mersifmobileapps.png",
      link: "/product/product-mersifmobileapps.png",
    },
    {
      name: "Mersif AR",
      description: "Pembelajaran dengan Augmented Reality",
      image: "/img/service/mersif-ar.svg,",
      link: "/services/mersif-ar",
    },
    {
      name: "Buku Edukasi Berbasis AR",
      description: "Analisis Data Pembelajaran",
      image: "/img/product/product-bukuberbasisar.png",
      link: "/services/mersif-analytics",
    },
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 10, stiffness: 100 },
    },
  }

  const toggleMoreServices = () => {
    setShowMoreServices(!showMoreServices)
  }

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-blue-500 text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl text-center">
          Layanan
        </h2>
        <p className="max-w-[700px] mx-auto text-black font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 text-center"
           style={{ fontFamily: "Poppins, sans-serif" }}>
          Layanan menakjubkan kami untuk Anda coba
        </p>

        {/* Layanan utama */}
        <motion.div
          ref={ref}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center group transition-all duration-300"
              variants={itemVariants}
            >
              <Link href={service.link} className="block w-full">
                <div className="w-full aspect-square bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-blue-300">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-xl transition-all duration-300 group-hover:blur-sm"
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-xl font-bold">Go Now</span>
                  </motion.div>
                </div>
              </Link>
              <div className="absolute bottom-0 translate-y-1/2 w-[calc(100%-2rem)] mx-auto bg-white border border-gray-200 rounded-full px-6 py-4 text-center shadow-lg transition-all duration-300 group-hover:translate-y-[calc(50%-1rem)] group-hover:bg-blue-50 group-hover:border-blue-500">
                <Link href={service.link} className="block">
                  <h3 style={{ fontFamily: "Inter, sans-serif" }} className="text-blue-500 text-lg font-bold group-hover:text-blue-700 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-base text-gray-900 mt-1 group-hover:text-gray-700 transition-colors">
                    {service.description}
                  </p>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Layanan tambahan */}
        <AnimatePresence>
          {showMoreServices && (
            <motion.div
              key="more-services"
              className="mt-20 md:mt-24 lg:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 lg:max-w-4xl lg:mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {moreServices.map((service, index) => (
                <motion.div
                  key={`more-${index}`}
                  className="relative flex flex-col items-center group transition-all duration-300"
                  variants={itemVariants}
                >
                  <Link href={service.link} className="block w-full">
                    <div className="w-full aspect-square bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-blue-300">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-xl transition-all duration-300 group-hover:blur-sm"
                      />
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-white text-xl font-bold">Go Now</span>
                      </motion.div>
                    </div>
                  </Link>
                  <div className="absolute bottom-0 translate-y-1/2 w-[calc(100%-2rem)] mx-auto bg-white border border-gray-200 rounded-full px-6 py-4 text-center shadow-lg transition-all duration-300 group-hover:translate-y-[calc(50%-1rem)] group-hover:bg-blue-50 group-hover:border-blue-500">
                    <Link href={service.link} className="block">
                      <h3 style={{ fontFamily: "Inter, sans-serif" }} className="text-blue-500 text-lg font-bold group-hover:text-blue-700 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-base text-gray-900 mt-1 group-hover:text-gray-700 transition-colors">
                        {service.description}
                      </p>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tombol toggle pindah ke bagian paling bawah */}
        <div className="mt-20 md:mt-24 lg:mt-32 flex justify-center">
          <button
            onClick={toggleMoreServices}
            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-300"
            aria-label="Toggle more services"
          >
            {showMoreServices ? (
              <ChevronUp className="w-6 h-6 text-white" />
            ) : (
              <ChevronDown className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </section>
  )
}