"use client"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/contexts/language-context"

export function ProductsSection() {
  const { t } = useLanguage()
  
  const allServices = [
    {
      name: t('services.academy.title'),
      description: t('services.academy.description'),
      image: "/img/service/mersifacademy-img.svg",
      link: "/mersif-academy",
    },
    {
      name: t('services.iot.title'),
      description: t('services.iot.description'),
      image: "/img/service/mersifiot-img.svg",
      link: "/mersifiot",
    },
    {
      name: t('services.creator.title'),
      description: t('services.creator.description'),
      image: "/img/service/mersifcreator-img.svg",
      link: "/mersifcreator",
    },
    {
      name: t('services.vista.title'),
      description: t('services.vista.description'),
      image: "/img/service/mersif-vista.svg",
      link: "/mersifvista",
    },
    {
      name: t('products.mobile.title'),
      description: t('products.mobile.description'),
      image: "/img/product/product-mersifmobileapps.png",
      link: "/product/product-mersifmobileapps.png",
    },
   
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 10, stiffness: 100 },
    },
  }

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-blue-500 text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl text-center">
          {t('services.title')}
        </h2>
        <p className="max-w-[700px] mx-auto text-black font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 text-center"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          {t('services.subtitle')}
        </p>
        {/* Semua Layanan */}
        <motion.div
          ref={ref}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-16 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {allServices.map((service, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center group transition-all duration-300 hover:-translate-y-2 max-w-[12rem] w-full"
              variants={itemVariants}
            >
              <Link href={service.link} className="block w-full h-full">
                <div className="w-full h-full bg-gray-200 rounded-xl relative overflow-hidden aspect-[3/4] shadow-md"> {/* Card container */}
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-xl transition-all duration-300 group-hover:opacity-50" // Gambar meredup saat hover
                  />
                  {/* Teks nama layanan selalu di bawah, tidak bergerak */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl">
                    <h3 className="text-white text-lg font-bold text-center" style={{ fontFamily: "Inter, sans-serif" }}>
                      {service.name}
                    </h3>
                  </div>
                  {/* Overlay "Go Now" saat hover */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span style={{ fontFamily: "Inter, sans-serif" }} className="text-white text-xl font-bold">{t('common.view.more')}</span>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}