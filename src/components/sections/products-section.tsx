"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

interface Service {
  id: number
  name: string
  description: string
  image: string
  link: string
  sortOrder: number
}

export function ProductsSection() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
  try {
    console.log('Fetching services from API...');
    const response = await fetch('/api/services');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('API response:', data);
    // API mengembalikan array langsung, bukan {services: [...]}
    const servicesArray = Array.isArray(data) ? data : [];
    console.log('Services array:', servicesArray);
    setServices(servicesArray);
  } catch (error) {
    console.error('Error fetching services:', error);
    // Fallback data biar tidak kosong
    setServices([
      {
        id: 1,
        name: "Sample Service",
        description: "This is a fallback service",
        image: "",
        link: "/",
        sortOrder: 1
      }
    ]);
  } finally {
    setLoading(false);
  }
};


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (loading) {
    return (
      <section id="services" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="animate-pulse">Loading services...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="services" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center text-red-500">
          Error loading services: {error}
        </div>
      </section>
    )
  }

  if (services.length === 0) {
    return (
      <section id="services" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          No services found
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-blue-500 text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl text-center">
          Layanan
        </h2>
        <p
          className="max-w-[700px] mx-auto text-black font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 text-center"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Layanan menakjubkan kami untuk Anda coba
        </p>

        <motion.div
          ref={ref}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-16 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ opacity: 1 }} // Force opacity to be visible
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="relative flex flex-col items-center group transition-all duration-300 hover:-translate-y-2 max-w-[12rem] w-full"
              variants={itemVariants}
              style={{ opacity: 1, transform: 'translateY(0)' }} // Force visibility
            >
              <Link href={service.link} className="block w-full h-full">
                <div className="w-full h-full bg-gray-200 rounded-xl relative overflow-hidden aspect-[3/4] shadow-md border">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-xl transition-all duration-300 group-hover:opacity-50"
                      onLoad={() => {
                        console.log("Image loaded successfully:", service.image)
                      }}
                      onError={(e) => {
                        console.log("Image failed to load:", service.image)
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-medium">
                        No Image
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl">
                    <h3
                      className="text-white text-lg font-bold text-center"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {service.name}
                    </h3>
                  </div>

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      style={{ fontFamily: "Inter, sans-serif" }}
                      className="text-white text-xl font-bold"
                    >
                      Visit now
                    </span>
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
