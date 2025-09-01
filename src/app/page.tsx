"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import "./globals.css"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { PartnersSection } from "@/components/sections/partners-section"
import { MersifNumbersSection } from "@/components/sections/mersif-numbers-section"
import { AboutUsSection } from "@/components/sections/about-us-section"
import { ProductsSection } from "@/components/sections/products-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { NewsBlogSection } from "@/components/sections/news-blog-section"
import { ContactCtaSection } from "@/components/sections/contact-cta-section"
import Image from "next/image"

export default function HomePage() {
  const [isEnglish, setIsEnglish] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [loading, setLoading] = useState(true)

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish)
    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 2000)
  }

  // Simulasi loading 2 detik
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        {/* Logo */}
        <div className="opacity-0 transition-opacity duration-700 ease-out" style={{ opacity: 1 }}>
  <Image
    src="/img/logomersiflab.png"
    alt="Logo Mersif Lab"
    width={150}
    height={150}
  />
</div>

        {/* Loader */}
        <div className="mt-6 w-12 h-12 border-4 border-gray-300 border-t-[#007bff] rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <HeroSection />
      <PartnersSection />
      <MersifNumbersSection />
      <AboutUsSection />
      <ProductsSection />
      <TestimonialsSection />
      <NewsBlogSection />
      <ContactCtaSection />
      <Footer />
    </>
  )
}
