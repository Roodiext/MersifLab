"use client" // This component uses client-side hooks like useRef and useInView
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion" // Import motion and useInView
import { useRef, useState } from "react" // Import useRef and useState

export function ProductsSection() {
  const [showMoreProducts, setShowMoreProducts] = useState(false) // State to control additional products visibility

  const products = [
    {
      name: "Mersif Room",
      description: "Ruang belajar menggunakan VR",
      image: "/img/product/product-mersifroom.png",
      link: "/products/mersif-room",
    },
    {
      name: "Mersif Creator",
      description: "Membuat Ruangan VR",
      image: "/img/product/product-mersifcreator.png",
      link: "/products/mersif-creator",
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
  // Trigger animation once when 30% of the element is in view
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  // Variants for the container to stagger children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger the animation of children by 0.15 seconds
      },
    },
  }
  // Variants for each individual product item
  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden, slightly below
    visible: {
      opacity: 1,
      y: 0, // Animate to original position
      transition: {
        type: "spring", // Use spring for a smoother, more natural feel
        damping: 10, // Controls the oscillation
        stiffness: 100, // Controls the speed
      },
    },
  }
  // Function to toggle additional products visibility
  const toggleMoreProducts = () => {
    setShowMoreProducts(!showMoreProducts)
  }
  return (
    <section id="products" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <h2 className="text-blue-500 text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl text-center">
          Product
        </h2>
        <p className="max-w-[700px] mx-auto text-black font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 text-center">
          Our astonishing product for you to try
        </p>

        {/* Main Products Grid - Always visible */}
        <motion.div
          ref={ref} // Attach the ref to the grid container
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"} // Animate based on isInView status
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center group overflow-visible transition-all duration-300 ease-in-out group-hover:shadow-lg"
              variants={itemVariants} // Apply item variants to each product card
            >
              {/* Top rounded box for image */}
              {/* Link ini yang mengarahkan ke product.link */}
              <Link href={product.link} className="block w-full">
                <div className="w-full aspect-square bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-blue-300">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill // Fills the parent div
                    style={{ objectFit: "cover" }} // Ensures image covers the area without distortion
                    className="rounded-xl transition-all duration-300 group-hover:blur-sm" // Applies border-radius to the image and blur on hover
                  />
                  {/* "Go Now" overlay */}
                  {/* motion.div ini berada di dalam Link di atas, sehingga teks "Go Now" akan mengikuti jalur Link tersebut */}
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
              {/* Overlapping bottom rounded pill */}
              <div className="absolute bottom-0 translate-y-1/2 w-[calc(100%-2rem)] mx-auto bg-white border border-gray-200 rounded-full px-6 py-4 text-center shadow-lg transition-all duration-300 group-hover:translate-y-[calc(50%-1rem)] group-hover:bg-blue-50 group-hover:border-blue-500">
                <Link href={product.link} className="block">
                  <h3 className="text-blue-500 text-lg font-bold transition-colors duration-300 group-hover:text-blue-700">
                    {product.name}
                  </h3>
                  <p className="text-base text-gray-900 mt-1 transition-colors duration-300 group-hover:text-gray-700">
                    {product.description}
                  </p>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Toggle Button - Show only when additional products are closed */}
        {!showMoreProducts && (
          <div className="mt-20 md:mt-24 lg:mt-32 flex justify-center">
            <button
              onClick={toggleMoreProducts}
              className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Show more products"
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
        {/* Additional Products Grid - Conditionally rendered */}
        {showMoreProducts && (
          <motion.div
            className="mt-20 md:mt-24 lg:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {moreProducts.map((product, index) => (
              <motion.div
                key={`more-${index}`}
                className="relative flex flex-col items-center group overflow-visible transition-all duration-300 ease-in-out group-hover:shadow-lg"
                variants={itemVariants} // Apply item variants to each product card
              >
                {/* Top rounded box for image */}
                {/* Link ini yang mengarahkan ke product.link */}
                <Link href={product.link} className="block w-full">
                  <div className="w-full aspect-square bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-blue-300">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill // Fills the parent div
                      style={{ objectFit: "cover" }} // Ensures image covers the area without distortion
                      className="rounded-xl transition-all duration-300 group-hover:blur-sm" // Applies border-radius to the image and blur on hover
                    />
                    {/* "Go Now" overlay */}
                    {/* motion.div ini berada di dalam Link di atas, sehingga teks "Go Now" akan mengikuti jalur Link tersebut */}
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
                {/* Overlapping bottom rounded pill */}
                <div className="absolute bottom-0 translate-y-1/2 w-[calc(100%-2rem)] mx-auto bg-white border border-gray-200 rounded-full px-6 py-4 text-center shadow-lg transition-all duration-300 group-hover:translate-y-[calc(50%-1rem)] group-hover:bg-blue-50 group-hover:border-blue-500">
                  <Link href={product.link} className="block">
                    <h3 className="text-blue-500 text-lg font-bold transition-colors duration-300 group-hover:text-blue-700">
                      {product.name}
                    </h3>
                    <p className="text-base text-gray-900 mt-1 transition-colors duration-300 group-hover:text-gray-700">
                      {product.description}
                    </p>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        {/* Toggle Button - Show at bottom when additional products are open */}
        {showMoreProducts && (
          <div className="mt-20 md:mt-24 lg:mt-32 flex justify-center">
            <button
              onClick={toggleMoreProducts}
              className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Hide more products"
            >
              <ChevronUp className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
