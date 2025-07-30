"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

export function ProductsSection() {
  const [showMoreProducts, setShowMoreProducts] = useState(false)

  const products = [
    {
      name: "Mersif Room",
      description: "Ruang belajar menggunakan VR",
      image: "/img/product/product-mersifroom.png",
      link: "https://room.mersiflab.com/",
    },
    {
      name: "Mersif Creator",
      description: "Membuat Ruangan VR",
      image: "/img/product/product-mersifcreator.png",
      link: "https://room.mersiflab.com/",
    },
    {
      name: "Mersif Mobile Apps",
      description: "Aplikasi mobile Pembelajaran",
      image: "/img/product/product-mersifmobileapps.png",
      link: "/products/mersif-mobile-app",
    },
  ]

  const moreProducts = [
    {
      name: "Mersif AR",
      description: "Pembelajaran dengan Augmented Reality",
      image: "/img/product/product-gamifikasipembelajaran.png",
      link: "/products/mersif-ar",
    },
    {
      name: "Mersif Forum",
      description: "Forum Mersiflab",
      image: "/img/product/product-mersifforum.png",
      link: "/products/mersif-iot",
    },
    {
      name: "Buku Edukasi Berbasis AR",
      description: "Analisis Data Pembelajaran",
      image: "/img/product/product-bukuberbasisar.png",
      link: "/products/mersif-analytics",
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

  const toggleMoreProducts = () => {
    setShowMoreProducts(!showMoreProducts)
  }

  return (
    <section id="products" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-blue-500 text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl text-center">
          Produk
        </h2>
        <p className="max-w-[700px] mx-auto text-black font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 text-center"
           style={{ fontFamily: "Poppins, sans-serif" }}>
          Produk menakjubkan kami untuk Anda coba
        </p>

        {/* Produk utama */}
        <motion.div
          ref={ref}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center group transition-all duration-300"
              variants={itemVariants}
            >
              <Link href={product.link} className="block w-full">
                <div className="w-full aspect-square bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-blue-300">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
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
                <Link href={product.link} className="block">
                  <h3 style={{ fontFamily: "Inter, sans-serif" }} className="text-blue-500 text-lg font-bold group-hover:text-blue-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-base text-gray-900 mt-1 group-hover:text-gray-700 transition-colors">
                    {product.description}
                  </p>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Produk tambahan */}
        <AnimatePresence>
          {showMoreProducts && (
            <motion.div
              key="more-products"
              className="mt-20 md:mt-24 lg:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24"
              variants={containerVariants}
              
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {moreProducts.map((product, index) => (
                <motion.div
                  key={`more-${index}`}
                  className="relative flex flex-col items-center group transition-all duration-300"
                  variants={itemVariants}
                >
                  <Link href={product.link} className="block w-full">
                    <div  className="w-full aspect-square bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-blue-300">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
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
                    <Link href={product.link} className="block">
                      <h3 style={{ fontFamily: "Inter, sans-serif" }}  className="text-blue-500 text-lg font-bold group-hover:text-blue-700 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-base text-gray-900 mt-1 group-hover:text-gray-700 transition-colors">
                        {product.description}
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
            onClick={toggleMoreProducts}
            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-300"
            aria-label="Toggle more products"
          >
            {showMoreProducts ? (
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
